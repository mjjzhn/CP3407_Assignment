from flask import Flask
from flask_app_config import Config
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler
import cloudinary
import cloudinary.uploader
import cloudinary.api

from flask_jwt_extended import jwt_required

# from dotenv import load_dotenv
import os
basedir = os.path.abspath(os.path.dirname(__file__))
# load_dotenv(os.path.join(basedir, '.env'))

jwt = JWTManager()
db = SQLAlchemy()
migrate = Migrate()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    jwt.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app, support_credentials=True)
    
    #config cloudinary
    cloudinary.config(cloud_name = config_class.CLOUD_NAME, api_key=config_class.API_KEY, api_secret=config_class.API_SECRET)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from app.admin import bp as admin_bp
    app.register_blueprint(admin_bp, url_prefix='/admin')
    
    from app.customer import bp as customer_bp
    app.register_blueprint(customer_bp, url_prefix='/customer')

    from app.menu import bp as menu_bp
    app.register_blueprint(menu_bp, url_prefix='/menu')
    
    from app.order import bp as order_bp
    app.register_blueprint(order_bp, url_prefix='/order')

    if not app.debug and not app.testing:
        
        if app.config['LOG_TO_STDOUT']:
            stream_handler = logging.StreamHandler()
            stream_handler.setLevel(logging.INFO)
            app.logger.addHandler(stream_handler)
        else:
            if not os.path.exists('logs'):
                os.mkdir('logs')
            file_handler = RotatingFileHandler('logs/shopka.log',
                                               maxBytes=10240, backupCount=10)
            file_handler.setFormatter(logging.Formatter(
                '%(asctime)s %(levelname)s: %(message)s '
                '[in %(pathname)s:%(lineno)d]'))
            file_handler.setLevel(logging.INFO)
            app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('flask-shopka startup')

    return app

from app import models,errors
    