from flask_sqlalchemy import SQLAlchemy
from app import app
import logging

# Configure your database connection URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:12345678@localhost/tshirt_design'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
