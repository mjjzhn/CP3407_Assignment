import os
from datetime import timedelta
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    SQLALCHEMY_TRACK_MODIFICATION = False  
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', '').replace(
        'postgres://', 'postgresql://') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_COOKIE_SECURE= os.environ.get('JWT_COOKIE_SECURE')
    JWT_TOKEN_LOCATION=["headers","cookies"]
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or "hello-hacker-come-here-babe"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    LOG_TO_STDOUT = os.environ.get('LOG_TO_STDOUT')
    
    #cloudinary configuration
    CLOUD_NAME = os.environ.get('CLOUD_NAME')
    API_KEY =os.environ.get('API_KEY')
    API_SECRET =os.environ.get('API_SECRET')
    CLOUDINARY_URL =os.environ.get('CLOUDINARY_URL')
    
    #STRIPE API KEY
    STRIPE_API_KEY =os.environ.get('STRIPE_API_KEY')
    ENDPOINT_SECRET=os.environ.get('ENDPOINT_SECRET')
