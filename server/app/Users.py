from flask import request, jsonify
from .mongodb import db as mongodb  # Assuming you have a database connection object named mysql
from flask_jwt_extended import create_access_token
from app import bcrypt
from .mysqldb import db 



class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __init__(self, name=None, email=None, password=None):
        self.name = name
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def get_token(self):
        return create_access_token(identity=self.email)
    

class User:
    def __init__(self, name=None, email=None, password=None):
        self.name = name
        self.email = email
        self.password = password

    def get_token(self):
        return create_access_token(identity=self.email)

    def signup(self):
        # Check if user already exists
        existing_user = UserModel.query.filter_by(email=self.email).first()
        if existing_user:
            return jsonify({"message": "Email already registered!"}), 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(self.password).decode("utf-8")

        # Create a new user
        new_user = UserModel(name=self.name, email=self.email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"access_token": self.get_token()}), 200

    def login(self):
        # Find user by email
        user = UserModel.query.filter_by(email=self.email).first()

        if user:
            # Check password
            if bcrypt.check_password_hash(user.password, self.password):
                return jsonify({"access_token": self.get_token()}), 200
            else:
                return jsonify({"message": "Invalid password"}), 401
        else:
            return jsonify({"message": "Could not find user"}), 401