from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

import os

load_dotenv()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False
app.config[
    "MONGO_URI"
] = os.getenv('MONGO_URI')
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app)  # Enable CORS for all routes


from app import routes
