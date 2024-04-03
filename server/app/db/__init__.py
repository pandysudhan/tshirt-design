from app import app
from flask_pymongo import PyMongo

mongo = PyMongo(app)
db = mongo.db


