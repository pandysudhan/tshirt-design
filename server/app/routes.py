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
from .Users import User
from .db import db


@app.route("/")
@jwt_required()
def home():
    email = get_jwt_identity()
    return jsonify({"email":email}), 200


@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    

    if email is None:
        return jsonify({"message": "Please provide a valid name"}), 400
    if password is None:
        return jsonify({"message": "Please provide a valid name"}), 400

    temp_user = User(email= email,password= password)
    return temp_user.login()



@app.route("/signup", methods=["POST"])
def signup():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if name is None:
        return jsonify({"message": "Please provide a valid name"})
    if email is None:
        return jsonify({"message": "Please provide a valid name"})
    if password is None:
        return jsonify({"message": "Please provide a valid name"})

    tempUser = User(name, email, password)
    return tempUser.signup()



@app.route("/save_design", methods=["POST"])
@jwt_required()
def save_design():
    try:
        email = get_jwt_identity()
        design_data = request.json  # This will contain the JSON data sent from the frontend

        if design_data is None:
            return jsonify({"message": "Please provide a valid design"}), 400

        design_id = design_data.get('id')

        print(design_id)
        if design_id:
            # Check if an identical document already exists based on the design ID
            existing_design = db.custom_designs.find_one({"id": design_id})

            if existing_design:
                # Update the existing document with the new design data
                update_res = db.custom_designs.update_one(
                    {"id": design_id},
                    {"$set": design_data}
                )

                print("Design updated successfully")
                return jsonify({"message": "Design updated successfully"}), 200

        # If no identical document found or no design ID provided, insert the design data into MongoDB
        design_data['user_id'] = email
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
        user_designs = db.custom_designs.find({"user_id": current_user})

        # Convert MongoDB cursor to list of dictionaries
        designs_list = []
        for design in user_designs:
            # Convert ObjectId to string for serialization
            design.pop('_id', None)
            designs_list.append(design)
        
        print("User designs:", designs_list)

        return jsonify({"designs": designs_list}), 200
    except Exception as e:
        print("Error fetching designs:", e)
        return jsonify({"message": "Error fetching designs"}), 500


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