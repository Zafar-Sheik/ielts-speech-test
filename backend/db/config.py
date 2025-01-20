from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

#initialise database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///ielts_speech_test.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] =False

#create instance of database
db = SQLAlchemy(app)

