from flask import request
from flask_restplus import Resource

from ..util.dto import RecipeDto
from ..service.recipe_service import get_recipe, get_recipe_user, update_recipe, add_recipe, get_recipe_with_id

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
        token = request.headers.get('authenticationToken')
        return add_recipe(data=data, token=token)


@api.route('/user')
class RecipeUser(Resource):
    @api.doc("List all recipes of the current user")
    @api.marshal_list_with(_recipe, envelope='recipes')
    def get(self):
        """Returns all recipe of the user"""
        token = request.headers.get('authenticationToken')
        return get_recipe_user(token)


@api.route('/u')
class RecipeUpdate(Resource):
    @api.doc("Update Recipe")
    def post(self):
        """Update Recipe"""
        data = request.json
        token = request.headers.get('authenticationToken')
        return update_recipe(data=data, token=token)


@api.route('/id/<recipe_id>')
class RecipeId(Resource):
    @api.doc('get recipe information via id')
    def get(self, recipe_id):
        """Get recipe with Id"""
        return get_recipe_with_id(recipe_id)
