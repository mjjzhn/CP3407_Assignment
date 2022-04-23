from datetime import datetime, timedelta, timezone
from app import db
from app.auth import bp
from app.models import Admin
import json
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token,unset_jwt_cookies, create_access_token,get_jwt,get_jwt_identity
from flask_cors import cross_origin



#this method resets the token for both admin and Customer
@bp.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            claims = get_jwt()
            if claims["is_administrator"]:#reset token for admin
                access_token = create_access_token(identity=get_jwt_identity(),additional_claims={"is_administrator": True})
            else:    
                access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

###
# From here is admin authentication        

@bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


# @bp.route('/register', methods=['POST'])
# #backdoor for convinience
# def register():
    
#     username = request.json.get("username", None)
#     password = request.json.get("password", None)

#     if Admin.query.filter_by(username= username).first():
#         return {"msg": "choose another username"}, 401

#     admin = Admin(username= username)
#     admin.set_password(password)
#     db.session.add(admin)
#     db.session.commit()
#     return {"msg": "register successfully"}, 200
        


