from app.main.dto.recipe_dto import get_recipes, get_recipes_user, update_recipe_user, add_recipe_user, get_recipe_id
from app.main.util.auth import decode_authentication_token, is_blacklist_token


def get_recipe(args):
    """
    Get all the recipes with given args
    :param args: q : queryText, limit, start
    :return:list of recipes
    """
    query_text = args.get('q')
    limit = int(args.get('limit'))
    start = int(args.get('start'))
    if query_text is None:
        query_text = str('')
    return get_recipes(query_text, limit, start)


def get_recipe_user(token):
    """
    Gets the Auth token of the user and sends all the recipe by that user
    :return:
    """
    authentication_token = token
    if not authentication_token or is_blacklist_token(authentication_token):
        return {'status': 'failure', 'message': 'Auth token not provided'}, 409
    user_id = decode_authentication_token(authentication_token)
    return get_recipes_user(user_id)


def update_recipe(data, token):
    """
    Get the updated data and auth token from the user and update recipe accordingly
    :param token:
    :param data:
    :return:
    """
    authentication_token = token
    if not authentication_token or is_blacklist_token(authentication_token):
        return {'status': 'failure', 'message': 'Auth token not provided'}, 409
    user_id = decode_authentication_token(authentication_token)
    recipe_id = data['_id']
    if data['user_id'] == user_id:
        update_recipe_user(data, recipe_id)
        response_object = {
            'status': 'success',
            'message': 'Updated successfully'
        }
        return response_object, 200
    response_object = {
        'status': 'failure',
        'message': 'User does not match'
    }
    return response_object, 409


def add_recipe(data, token):
    """
    Add Recipe associated with a user
    :param data:
    :param args:
    :return:
    """
    authentication_token = token
    if not authentication_token or is_blacklist_token(authentication_token):
        return {'status': 'failure', 'message': 'Auth token not provided'}, 409
    user_id = decode_authentication_token(authentication_token)
    data['userId'] = user_id
    return add_recipe_user(data)


def get_recipe_with_id(recipe_id):
    """
    Get recipe with given Id
    :param recipe_id:
    :return:
    """
    return get_recipe_id(recipe_id)
