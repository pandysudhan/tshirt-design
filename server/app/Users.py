from flask import request, jsonify
from .db import db
from bson import json_util
from flask_jwt_extended import create_access_token
from app import bcrypt


class User:
    def __init__(self, name=None, email=None, password=None):
        self.user = {"name": name, "email": email, "password": password}

    def get_token(self):
        return create_access_token(self.user["email"])

    def signup(self):
        if db.users.find_one({"email": self.user["email"]}):
            return jsonify({"message": "Email already registered!"}), 400

        hashed_password = bcrypt.generate_password_hash(self.user["password"]).decode(
            "utf-8"
        )
        new_user = {
            "name": self.user["name"],
            "email": self.user["email"],
            "password": hashed_password,
        }

        res = db.users.insert_one(new_user).inserted_id

        if res:
            user = db.users.find_one({"_id": res})
            user_in_json = json_util.dumps(user)
            return jsonify({"access_token": self.get_token()}), 200

    def login(self):
        print(self.user["email"], self.user["password"])
        user = db.users.find_one({"email": self.user["email"]})
        print(user)
        if user is not None:
            if bcrypt.check_password_hash(user["password"], self.user["password"]):
                return jsonify({"access_token": self.get_token()}), 200
            else:
                return jsonify({"message": "invalid password"}), 401

        else:
            return jsonify({"message": "Could not find user"}), 401
