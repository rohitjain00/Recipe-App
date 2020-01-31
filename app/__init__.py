# app/__init__.py

from flask_restplus import Api
from flask import Blueprint


blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='Recipe-App',
          version='1.0',
          description='backend for Recipe App'
          )
