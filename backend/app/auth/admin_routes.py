from functools import wraps
from app.auth import bp
from app import db, jwt
from flask_jwt_extended import verify_jwt_in_request,get_jwt, create_access_token
from flask import jsonify, request
from app.models import Admin

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims["is_administrator"]:
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="Admins only!"), 403
            
        return decorator
    return wrapper

@bp.route('admin/token', methods=['POST'])
def create_admin_token():
    
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # #comment the dict and the valid when development
    # if username != "test" or password !="test":
    #     return {"msg": "Wrong username or password"}, 401

    admin = Admin.query.filter_by(username= username).first()
    if admin is None or not admin.check_password(password):
        return {"msg": "Wrong username or password"}, 401
    access_token = create_access_token(identity=username, additional_claims={"is_administrator": True})
    response = {"access_token":access_token, "admin":admin.to_dict()}
    return jsonify(response)

@bp.route('/register', methods=['POST'])
#backdoor for convinience
def register():
    
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if Admin.query.filter_by(username= username).first():
        return {"msg": "choose another username"}, 401

    admin = Admin(username= username)
    admin.set_password(password)
    db.session.add(admin)
    db.session.commit()
    return {"msg": "register successfully"}, 200