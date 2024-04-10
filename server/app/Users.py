from flask import jsonify
from .mongodb import (
    db as mongodb,
)  # Assuming you have a database connection object named mysql
from flask_jwt_extended import create_access_token
from app import bcrypt, app
from .mysqldb import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)
    __mapper_args__ = {"polymorphic_on": user_type}

    def __init__(self, name=None, email=None, password=None, user_type=None):
        self.name = name
        self.email = email
        self.password = password
        self.user_type = user_type

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def get_token(self):
        return create_access_token(identity=self.email)


class Customer(User):
    __tablename__ = "customers"
    __mapper_args__ = {"polymorphic_identity": "customer"}

    id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)

    def signup(self):
        existing_user = User.query.filter_by(email=self.email).first()
        if existing_user:
            return jsonify({"message": "Email already registered!"}), 400

        hashed_password = bcrypt.generate_password_hash(self.password).decode("utf-8")
        new_user = Customer(
            name=self.name,
            email=self.email,
            password=hashed_password,
            user_type="customer",
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"access_token": self.get_token()}), 200

    def login(self):
        user = User.query.filter_by(email=self.email).first()

        if user and user.user_type == "customer":
            if bcrypt.check_password_hash(user.password, self.password):
                return jsonify({"user_type": user.user_type , "access_token": self.get_token()}), 200
            else:
                return jsonify({"message": "Invalid password"}), 401
        else:
            return (
                jsonify({"message": "Could not find user or user is not a customer"}),
                401,
            )


class Manufacturer(User):
    __tablename__ = "manufacturers"
    __mapper_args__ = {"polymorphic_identity": "manufacturer"}

    id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)

    def signup(self):
        existing_user = User.query.filter_by(email=self.email).first()
        if existing_user:
            return jsonify({"message": "Email already registered!"}), 400

        hashed_password = bcrypt.generate_password_hash(self.password).decode("utf-8")
        new_user = Manufacturer(
            name=self.name,
            email=self.email,
            password=hashed_password,
            user_type="manufacturer",
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"access_token": self.get_token()}), 200

    def login(self):
        user = User.query.filter_by(email=self.email).first()

        if user and user.user_type == "manufacturer":
            if bcrypt.check_password_hash(user.password, self.password):
                return jsonify({"user_type":user.user_type ,"access_token": self.get_token()}), 200
            else:
                return jsonify({"message": "Invalid password"}), 401
        else:
            return (
                jsonify(
                    {"message": "Could not find user or user is not a manufacturer"}
                ),
                401,
            )


def create_user_table():
    with app.app_context():
        db.create_all()


# Call create_user_table to create the table if it doesn't exist
create_user_table()
