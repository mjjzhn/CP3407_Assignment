from app.auth import bp
from flask import jsonify, request

from app.models import Customer
from flask_jwt_extended import create_access_token

@bp.route('customer/token', methods=['POST'])
def create_customer_token():
    
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # #comment the dict and the valid when development
    # if username != "test" or password !="test":
    #     return {"msg": "Wrong username or password"}, 401

    customer = Customer.query.filter_by(username= username).first()
    if customer is None or not customer.check_password(password):
        return {"msg": "Wrong username or password"}, 401

    access_token = create_access_token(identity=username, additional_claims={"is_administrator": False})
    response = {"access_token":access_token}
    return response