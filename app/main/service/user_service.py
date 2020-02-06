from app.main.dto.user_dto import hash_password, has_username, \
    add_user, has_user, get_user_id, get_user_detail
from app.main.util.auth import get_authentication_token, is_blacklist_token, blacklist_token


def register(data):
    """
    Creates new user in the database
    :param data: {'username' : 'rohitjain00', 'password': 'asdf', 'name': 'Rohit'}
    :return: {'status' : 'success', 'authenticationToken': 'asdfasdfa'}
    """
    username = data['username']
    password = hash_password(data['password'])
    name = data['name']
    if has_username(username):
        response_object = {
            'status': 'failure',
            'authenticationToken': 'Username already exists. Please Login'
        }
        return response_object, 409
    user_id = add_user(username, password, name)
    response_object = {
        'status': 'success',
        'authenticationToken': get_authentication_token(user_id)
    }
    return response_object, 201


def login(data):
    """
    Verifies the user's details and send them authentication token
    :param data: {'username' : 'rohitjain00', 'password': 'asdf'}
    :return: {'status' : 'success', 'authenticationToken': 'asdfasdfa'}
    """
    username = data['username']
    password = data['password']

    if not has_user(username, password):
        response_object = {
            'status': 'failure',
            'authenticationToken': 'User does not exists'
        }
        return response_object, 404
    user_id = get_user_id(username)
    response_object = {
        'status': 'success',
        'authenticationToken': get_authentication_token(user_id)
    }
    return response_object, 200


def get_user_details(args):
    """
    Get user's details
    :param args:
    :return:
    """
    user_id = args.get('userId')
    user = get_user_detail(user_id)
    if user is None:
        return {
          'status': 'failure',
          'message': 'No user exists'
        }, 409
    return {
      'name': user.get('name'),
      'username': user.get('username')
    }, 200


def logout(args):
    """
    Adds the user's authentication token to the blacklist
    :param args: {'authenticationToken' : 'asdfasdf'}
    :return: {'status' : 'success'}
    """
    authentication_token = args.get('authenticationToken')
    if is_blacklist_token(authentication_token):
        response_object = {
            'status': 'failure',
            'message': 'Logout Failed'
        }
        return response_object, 200
    blacklist_token(authentication_token)
    response_object = {
        'status': 'success',
        'message': 'Logout successfully'
    }
    return response_object, 200


