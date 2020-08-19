import json
import unittest

from app.test.base import BaseTestCase


def login_user(self):
  return self.client.post(
        "/user/login",
        data=json.dumps(dict(username="asdf", password="asdf")),
        content_type="application/json",
    )

def get_user_details(self):
  return self.client.get(
    "/user/detail?userId=5e3c49bf8e9dfef294538be9"
  )

def logout_user(self, auth_token):
  header = {'authenticationToken': auth_token}
  return self.client.post(
    "/user/logout", headers=header
  )

class TestUser(BaseTestCase):
  def test_login_user(self):
    with self.client:
      user_response = login_user(self)
      response_data = json.loads(user_response.data.decode())
      self.assertTrue(response_data["authenticationToken"])
      self.assertEqual(response_data["status"], 'success')
      self.assertEqual(user_response.status_code, 200)

  def test_user_details(self):
    with self.client:
      user_response = login_user(self)
      user = json.loads(user_response.data.decode())
      user_details_response = get_user_details(self)
      response_data = json.loads(user_details_response.data.decode())
      self.assertTrue(response_data['name'], 'asdf')
      self.assertTrue(response_data['username'], 'asdf')
      self.assertTrue(user_details_response.status_code, 200)

  def test_user_logout(self):
    with self.client:
      user_response = login_user(self)
      user = json.loads(user_response.data.decode())
      auth_token = user["authenticationToken"]
      response = logout_user(self, auth_token)
      logout = json.loads(response.data.decode())
      self.assertEqual(response.status_code, 200)
      self.assertEqual(logout['status'], 'success')
      self.assertEqual(logout['message'], 'Logout successfully')
