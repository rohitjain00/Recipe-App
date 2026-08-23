import jwt

from app.main import db
from .jwt_utils import decode_auth_token, encode_auth_token

blacklist_db = db.Blacklist


def is_blacklist_token(authentication_token):
    """
    Check if the token provided is blacklisted
    :param authentication_token: auth token of the user
    :return: True if blackListed False otherwise
    """
    result = blacklist_db.find_one({'authenticationToken': authentication_token})
    return result is not None


def blacklist_token(authentication_token):
    """
    Mark the token as blacklisted
    :param authentication_token: auth token of the user
    :return: Void
    """
    blacklist_db.insert_one({'authenticationToken': authentication_token})


def get_authentication_token(user_id):
    """
    Generates the Auth Token
    :param user_id: user_id of the user
    :return: authToken on success, raises jwt.PyJWTError on failure
    """
    return encode_auth_token(user_id)


def decode_authentication_token(authentication_token):
    """
    Decodes the auth token
    :param authentication_token:
    :return: user id on success, error message otherwise
    """
    try:
        payload = decode_auth_token(authentication_token)
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'
    if is_blacklist_token(authentication_token):
        return 'Token blacklisted. Please log in again.'
    return payload['sub']
