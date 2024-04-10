from flask import request, jsonify
from app import app
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity,
)
from dotenv import load_dotenv
import time
from .Users import User, Customer, Manufacturer
from .mongodb import db
from .mysqldb import db as mysql_db
from flask import send_file
import json

@app.route("/")
@jwt_required()
def home():
    email = get_jwt_identity()
    return jsonify({"email": email}), 200


@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_type = request.json.get("user_type", None)

    if email is None or password is None or user_type is None:
        return (
            jsonify({"message": "Please provide email, password, and user_type"}),
            400,
        )

    if user_type not in ["customer", "manufacturer"]:
        return jsonify({"message": "Invalid user_type"}), 400

    if user_type == "customer":
        user = Customer(email=email, password=password)
    else:
        user = Manufacturer(email=email, password=password)

    return user.login()


@app.route("/signup", methods=["POST"])
def signup():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_type = request.json.get("user_type", None)

    if name is None or email is None or password is None or user_type is None:
        return (
            jsonify({"message": "Please provide name, email, password, and user_type"}),
            400,
        )

    if user_type not in ["customer", "manufacturer"]:
        return jsonify({"message": "Invalid user_type"}), 400

    if user_type == "customer":
        user = Customer(name=name, email=email, password=password)
    else:
        user = Manufacturer(name=name, email=email, password=password)

    return user.signup()


@app.route("/get_presets", methods=["GET"])
@jwt_required()
def get_presets():
    try:
        current_user = get_jwt_identity()
        print("Current user:", current_user)

        # Fetch designs associated with the current user
        user_designs = db.manufacturer_designs.find({})

        # Convert MongoDB cursor to list of dictionaries
        designs_list = []
        for design in user_designs:
            # Convert ObjectId to string for serialization
            design.pop("_id", None)
            designs_list.append(design)

        print("User designs:", designs_list)

        return jsonify({"designs": designs_list}), 200

    except Exception as e:
        print("Error fetching designs:", e)
        return jsonify({"message": "Error fetching designs"}), 500


@app.route("/save_design", methods=["POST"])
@jwt_required()
def save_design():
    try:
        email = get_jwt_identity()
        design_data = (
            request.json
        )  # This will contain the JSON data sent from the frontend

        if design_data is None:
            return jsonify({"message": "Please provide a valid design"}), 400

        design_id = design_data.get("id")

        print(design_id)
        if design_id:
            # Check if an identical document already exists based on the design ID
            existing_design = db.custom_designs.find_one({"id": design_id})

            if existing_design:
                # Update the existing document with the new design data
                update_res = db.custom_designs.update_one(
                    {"id": design_id}, {"$set": design_data}
                )

                print("Design updated successfully")
                return jsonify({"message": "Design updated successfully"}), 200

        # If no identical document found or no design ID provided, insert the design data into MongoDB
        design_data["user_email"] = email
        res = db.custom_designs.insert_one(design_data)

        print("Design saved successfully")
        return jsonify({"message": "Design saved successfully"}), 200

    except Exception as e:
        print("Error saving design:", e)
        return jsonify({"message": "Error saving design"}), 500


@app.route("/my_designs", methods=["GET"])
@jwt_required()  # Requires authentication
def my_designs():
    try:
        current_user = get_jwt_identity()
        print("Current user:", current_user)

        # Fetch designs associated with the current user
        user_designs = db.custom_designs.find({"user_email": current_user})

        # Convert MongoDB cursor to list of dictionaries
        designs_list = []
        for design in user_designs:
            # Convert ObjectId to string for serialization
            design.pop("_id", None)
            designs_list.append(design)

        print("User designs:", designs_list)

        return jsonify({"designs": designs_list}), 200
    except Exception as e:
        print("Error fetching designs:", e)
        return jsonify({"message": "Error fetching designs"}), 500


@app.route("/manufacturer_designs", methods=["GET"])
@jwt_required()  # Requires authentication
def manufacturer_desings():
    try:
        current_user = get_jwt_identity()
        print("Current user:", current_user)

        # Fetch designs associated with the current user
        user_designs = db.manufacturer_designs.find(
            {"manufacturer_email": current_user}
        )

        # Convert MongoDB cursor to list of dictionaries
        designs_list = []
        for design in user_designs:
            # Convert ObjectId to string for serialization
            design.pop("_id", None)
            designs_list.append(design)

        print("User designs:", designs_list)

        return jsonify({"designs": designs_list}), 200
    except Exception as e:
        print("Error fetching designs:", e)
        return jsonify({"message": "Error fetching designs"}), 500


@app.route("/upload_manufacturer_designs", methods=["POST"])
@jwt_required()
def upload_manufacturer_designs():
    try:
        email = get_jwt_identity()
        design_data = (
            request.json
        )  # This will contain the JSON data sent from the frontend

        if design_data is None:
            return jsonify({"message": "Please provide a valid design"}), 400

        design_id = design_data.get("id")

        print(design_id)
        if design_id:
            # Check if an identical document already exists based on the design ID
            existing_design = db.manufacturer_designs.find_one({"id": design_id})

            if existing_design:
                # Update the existing document with the new design data
                update_res = db.manufacturer_designs.update_one(
                    {"id": design_id}, {"$set": design_data}
                )

                print("Design updated successfully")
                return jsonify({"message": "Design updated successfully"}), 200

        # If no identical document found or no design ID provided, insert the design data into MongoDB
        design_data["manufacturer_email"] = email

        res = db.manufacturer_designs.insert_one(design_data)

        print("Design saved successfully")
        return jsonify({"message": "Design saved successfully"}), 200

    except Exception as e:
        print("Error saving design:", e)
        return jsonify({"message": "Error saving design"}), 500


@app.route("/delete_manufacturer_design/<design_id>", methods=["DELETE"])
@jwt_required()
def delete_manufacturer_design(design_id):
    try:
        current_user = get_jwt_identity()

        # Check if design exists
        design = db.manufacturer_designs.find_one(
            {"id": design_id, "user_id": current_user}
        )
        if not design:
            return jsonify({"message": "Design not found"}), 404

        # Delete the design
        db.manufacturer_designs.delete_one({"id": design_id, "user_id": current_user})

        return jsonify({"message": "Design deleted successfully"}), 200

    except Exception as e:
        print("Error deleting design:", e)
        return jsonify({"message": "Error deleting design"}), 500


@app.route("/delete_design/<design_id>", methods=["DELETE"])
@jwt_required()
def delete_design(design_id):
    try:
        current_user = get_jwt_identity()

        # Check if design exists
        design = db.custom_designs.find_one({"id": design_id, "user_id": current_user})
        if not design:
            return jsonify({"message": "Design not found"}), 404

        # Delete the design
        db.custom_designs.delete_one({"id": design_id, "user_id": current_user})

        return jsonify({"message": "Design deleted successfully"}), 200

    except Exception as e:
        print("Error deleting design:", e)
        return jsonify({"message": "Error deleting design"}), 500


@app.route("/order_design", methods=["POST"])
@jwt_required()
def order_design():
    try:
        current_user = get_jwt_identity()
        order_data = request.json

        if order_data is None:
            return jsonify({"message": "Please provide a valid order"}), 400

        order_data["customer_email"] = current_user

        res = db.orders.insert_one(order_data)

        return jsonify({"message": "Order placed successfully"}), 200

    except Exception as e:
        print("Error placing order:", e)
        return jsonify({"message": "Error placing order"}), 500


@app.route("/get_orders", methods=["GET"])
@jwt_required()
def get_orders():
    try:
        current_user = get_jwt_identity()
        print("Current user:", current_user)

        # Fetch orders associated with the current user
        user_orders = db.orders.find(
            {
                "$or": [
                    {"customer_email": current_user},
                    {"manufacturer_email": current_user},
                ]
            }
        )
        # Convert MongoDB cursor to list of dictionaries
        orders_list = []
        for order in user_orders:
            # Convert ObjectId to string for serialization
            order.pop("_id", None)
            orders_list.append(order)

        print("User orders:", orders_list)

        return jsonify({"orders": orders_list}), 200
    except Exception as e:
        print("Error fetching orders:", e)
        return jsonify({"message": "Error fetching orders"}), 500


@app.route("/download_order/<order_id>", methods=["GET"])
def download_order(order_id):
    try:
        print("Order ID:", order_id)

        # Fetch the order associated with the provided order_id and current user
        order = db.custom_designs.find_one({"id": order_id}, {"_id": 0})

        if not order:
            return jsonify({"message": "Order not found"}), 404

        # Create a JSON file with the order data
        filename = f"order_{order_id}.json"
        filepath = f"/tmp/{filename}"  # You can adjust the file path as per your requirement

        with open(filepath, "w") as file:
            json.dump(order, file)

        # Send the file as a downloadable response
        return send_file(filepath, as_attachment=True)

    except Exception as e:
        print("Error downloading order:", e)
        return jsonify({"message": "Error downloading order"}), 500


@app.route("/mysql_initiate")
def create_tables():
    mysql_db.create_all()
    return "Tables created"
