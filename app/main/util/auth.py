import datetime
import jwt
from ..config import key
from app.main import db

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
    :return: authToken on success Error otherwise
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=5),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        print(type(payload))
        print(payload)
        auth_token = jwt.encode(
            payload,
            key,
            algorithm='HS256'
        )
        print(auth_token)
        return auth_token.decode('utf-8')
    except Exception as e:
        return e


def decode_authentication_token(authentication_token):
    """
    Decodes the auth token
    :param authentication_token:
    :return:
    """
    try:
        payload = jwt.decode(authentication_token, key)
        is_blacklisted_token = is_blacklist_token(authentication_token)
        if is_blacklisted_token:
            return 'Token blacklisted. Please log in again.'
        else:
            return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'
