import unittest
from app import create_app
from flask_app_config import Config

class TestConfig(Config):
    """set up the config context"""
    TESTING = True

if __name__ == '__main__':
    unittest.main(verbosity=2)