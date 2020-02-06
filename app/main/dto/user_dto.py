from app.main import db, flask_bcrypt

user_db = db.User


def hash_password(password):
    """
    Uses one way hashing to encrypt the password
    :param password: password of the user
    :return: hash of the password
    """
    return flask_bcrypt.generate_password_hash(password).decode('utf-8')


def has_username(username):
    """
    check if a user with username exists in the database
    :param username: username of the user
    :return: True if user exists False otherwise
    """
    result = user_db.find_one({'username': username})
    return result is not None


def add_user(username, password, name):
    """
    Adds a new user to the database
    :param username: username of the user
    :param password: password of the user
    :param name: name of the user
    :return: _id of document as String
    """
    insertion_object = {
        'username': username,
        'password': password,
        'name': name
    }
    user_id = user_db.insert_one(insertion_object).inserted_id
    return str(user_id)


def has_user(username, password):
    """
    check if a user exists
    :param username: username of the user
    :param password: password of the user
    :return: True if exists False otherwise
    """
    result = user_db.find_one({'username': username})
    if result is None:
        return False
    password_hash = result.get('password')
    return flask_bcrypt.check_password_hash(password_hash, password)


def get_user_id(username):
    """
    Get the _id of the user
    :param username: username of the user
    :return: user_id of the user
    """
    result = user_db.find_one({'username': username})
    return str(result.get('_id'))
