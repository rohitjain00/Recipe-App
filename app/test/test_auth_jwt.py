import datetime
import unittest

import jwt

from app.main.config import key
from app.main.util.jwt_utils import decode_auth_token, encode_auth_token


class TestAuthJwt(unittest.TestCase):
    def test_round_trip(self):
        token = encode_auth_token(42)
        self.assertIsInstance(token, str)
        payload = decode_auth_token(token)
        self.assertEqual(payload['sub'], 42)
        self.assertIn('exp', payload)
        self.assertIn('iat', payload)

    def test_encode_sets_expiry_claim(self):
        payload = decode_auth_token(encode_auth_token(1))
        exp = datetime.datetime.fromtimestamp(payload['exp'], datetime.timezone.utc)
        remaining = exp - datetime.datetime.now(datetime.timezone.utc)
        self.assertGreater(remaining, datetime.timedelta(hours=23))

    def test_expired_token_rejected(self):
        now = datetime.datetime.now(datetime.timezone.utc)
        expired_payload = {
            'exp': now - datetime.timedelta(hours=1),
            'iat': now - datetime.timedelta(hours=2),
            'sub': 42
        }
        token = jwt.encode(expired_payload, key, algorithm='HS256')
        with self.assertRaises(jwt.ExpiredSignatureError):
            decode_auth_token(token)

    def test_tampered_signature_rejected(self):
        token = encode_auth_token(42)
        header, body, signature = token.split('.')
        tampered = '.'.join([header, body, ('a' if signature[0] != 'a' else 'b') + signature[1:]])
        with self.assertRaises(jwt.InvalidTokenError):
            decode_auth_token(tampered)

    def test_wrong_key_rejected(self):
        now = datetime.datetime.now(datetime.timezone.utc)
        payload = {
            'exp': now + datetime.timedelta(days=1),
            'iat': now,
            'sub': 42
        }
        token = jwt.encode(payload, 'some-other-secret-key', algorithm='HS256')
        with self.assertRaises(jwt.InvalidSignatureError):
            decode_auth_token(token)


if __name__ == '__main__':
    unittest.main()
