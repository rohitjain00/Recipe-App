# app/__init__.py

from flask_restplus import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.recipe_controller import api as recipe_ns

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='Recipe-App',
          version='1.0',
          description='backend for Recipe App'
          )

api.add_namespace(user_ns, path='/user')
api.add_namespace(recipe_ns, path='/recipe')
