from flask import Blueprint

bp = Blueprint('customer', __name__)

from app.admin import routes