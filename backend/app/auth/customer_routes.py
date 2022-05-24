from app.auth import bp
from flask import jsonify, request
from functools import wraps

from app.models import Customer
from flask_jwt_extended import create_access_token, verify_jwt_in_request,get_jwt
from app import db, models
from app.errors import bad_request

def customer_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if not claims["is_administrator"]:
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="Customer only!"), 403
            
        return decorator
    return wrapper


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
    response = {"access_token":access_token,"customer":customer.to_dict()}
    return response

@bp.route('customer/register', methods=['POST'])
def register_customer():
    data = request.get_json() or {}
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    confirm_password =request.json.get("cfPass", None)

    if Customer.query.filter_by(username= username).first():
        return {"msg": "choose another username"}, 401
    customer = Customer(username= username)
    if confirm_password != password:
        return bad_request("please confirm your password")
    customer.set_password(password)
    if "customer_name" in data:
        customer.customer_name = data["customer_name"]
    else:
        customer.customer_name = "New customer"
    if "avatar" in data:
        customer.avatar = data["avatar"]
    else:
        customer.avatar = "https://www.nicepng.com/png/detail/115-1150176_employee-avatar-png-transparent-image-avatar-male.png"
    db.session.add(customer)
    db.session.commit()
    return {"msg": "Register successfully. Please log in!"}, 200
