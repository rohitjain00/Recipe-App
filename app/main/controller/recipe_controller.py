from flask import request
from flask_restplus import Resource

from ..util.dto import RecipeDto
from ..service.recipe_service import get_recipe, get_recipe_user, update_recipe, add_recipe

api = RecipeDto.api
_recipe = RecipeDto.recipe


@api.route('/')
class Recipe(Resource):
    @api.doc("Returns a list of recipe")
    @api.marshal_list_with(_recipe, envelope="recipes")
    def get(self):
        """List recipes"""
        args = request.args
        return get_recipe(args=args)

    @api.doc("Adds a new Recipe to the database")
    @api.expect(_recipe, validate=True)
    def post(self):
        """Add a new recipe to the database"""
        data = request.json
        args = request.args
        return add_recipe(data=data, args=args)


@api.route('/user')
class UserLogin(Resource):
    @api.doc("List all recipes of the current user")
    def get(self):
        """Returns all recipe of the user"""
        args = request.args
        return get_recipe_user(args=args)


@api.route('/u')
class UserLogout(Resource):
    @api.doc("Update Recipe")
    def post(self):
        """Update Recipe"""
        data = request.json
        args = request.args
        return update_recipe(data=data, args=args)
