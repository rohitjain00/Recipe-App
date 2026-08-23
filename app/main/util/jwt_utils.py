import datetime

import jwt

from ..config import key


def encode_auth_token(user_id):
    """
    Generates an HS256-signed JWT containing the user id
    :param user_id: user_id of the user
    :return: encoded auth token string
    """
    now = datetime.datetime.now(datetime.timezone.utc)
    payload = {
        'exp': now + datetime.timedelta(days=1),
        'iat': now,
        'sub': user_id
    }
    return jwt.encode(payload, key, algorithm='HS256')


def decode_auth_token(authentication_token):
    """
    Decodes an auth token into its payload
    :param authentication_token: auth token of the user
    :return: payload dict on success
    :raises jwt.ExpiredSignatureError: if the token has expired
    :raises jwt.InvalidTokenError: if the token is invalid or tampered
    """
    return jwt.decode(authentication_token, key, algorithms=['HS256'])
