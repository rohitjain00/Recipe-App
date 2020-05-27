from app.main import db
from bson.objectid import ObjectId

recipe_db = db.Recipe


def get_recipes(query_text, limit, start):
    """
    Returns all the recipe in descending sorted date order with params
    :param query_text:
    :param limit:
    :param start:
    :return:
    """
    query_regex = '.*' + query_text + '.*'
    return [recipe for recipe in recipe_db.find({'title': {'$regex': query_regex}}).skip(start).limit(limit)]


def get_recipes_user(user_id):
    """
    Return all the recipes of the user
    :param user_id:
    :return:
    """
    return [recipe for recipe in recipe_db.find({'userId': user_id})]


def update_recipe_user(data, recipe_id):
    """
    Update recipe of a user
    :param recipe_id:
    :param data:
    :return:
    """
    recipe_db.find_one_and_update({'_id': ObjectId(recipe_id)}, {'$set': data})


def add_recipe_user(data):
    """
    Add recipe of a user
    :param data:
    :return:
    """

    return str(recipe_db.insert_one(data).inserted_id)


def get_recipe_id(recipe_id):
    """
    Get recipe data via Id
    :param recipe_id:
    :return:
    """
    result = recipe_db.find_one({'_id': ObjectId(recipe_id)})
    result['_id'] = str(result['_id'])
    return result
