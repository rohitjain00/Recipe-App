from flask import Flask
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from flask_cors import CORS

from .config import config_by_name, Config

flask_bcrypt = Bcrypt()

database_name = 'Recipe-App'
db = MongoClient(Config.MONGODB_URL)[database_name]  # is Static at the time can be fetched via env variable


def create_app(config_name):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_by_name[config_name])
    flask_bcrypt.init_app(app)
    return app
