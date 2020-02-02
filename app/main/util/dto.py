from flask_restplus import Namespace, fields


class UserDto:
    api = Namespace('user', description='user\'s login/logout register related operations')
    user = api.model('user', {
        'password': fields.String(required=True, description='user\'s password'),
        'name': fields.String(required=False, description='user\'s name'),
        'username': fields.String(required=True, description='user\'s username')
    })


class RecipeDto:
    api = Namespace('recipe', description='Recipe related operations')
    ingredient = api.model('ingredient', {
        'name': fields.String(required=True, description='ingredient\'s name'),
        'quantity': fields.String(required=True, description='ingredient\'s quantity')
    })
    recipe = api.model('recipe', {
        '_id': fields.String(required=False, description='unique Id of the recipe'),
        'title': fields.String(required=True, description='recipe\'s title'),
        'description': fields.String(required=True, description='recipe\'s description'),
        'ingredients': fields.List(fields.Nested(ingredient), required=True, description='recipe\'s ingredients'),
        'instructions': fields.List(fields.String, required=True, description='recipe\'s instructions'),
        'userId': fields.String(required=False, description='user id of recipe owner')
    })
