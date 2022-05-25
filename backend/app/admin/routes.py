from app.admin import bp
from flask_jwt_extended import jwt_required, current_user
import json
from app.auth.admin_routes import admin_required
from flask import jsonify,request, current_app
from app import db
from app.models import Admin, Contact_form
from app.errors import bad_request
from app import cloudinary


@bp.route('')
@admin_required()
def my_profile():
    return jsonify(
        id=current_user.id,
        username=current_user.username,
        msg="Hello admin"
    )


@bp.route('/update', methods=["PUT"])
@admin_required()
def update_profile():
    if request.method == 'PUT':
        # data = request.get_json() or {}
        data = request.form.to_dict() or {}
        if 'username' in data and data['username'] != current_user.username and \
            Admin.query.filter_by(username=data['username']).first():
            return bad_request('please use a different username')
        if "password" in data:
            if 'currentPassword' not in data:
                return bad_request("Please provide your current password")
        if 'currentPassword' in data and not current_user.check_password(data["currentPassword"]):
            return bad_request("Current password incorrect")
         
        #change avatar
        current_app.logger.info('in admin/update route')
        upload_result = None
        if "avatar" in request.files:
            file_to_upload = request.files['avatar']
            current_app.logger.info('%s file_to_upload', file_to_upload)
            if file_to_upload:
                upload_result = cloudinary.uploader.upload(file_to_upload)
                current_app.logger.info(upload_result)
                data['avatar']=upload_result["secure_url"]
        
        current_user.from_dict(data)
        db.session.commit()
        response = current_user.to_dict()
        if "password" in data:
            response["is_password_updated"] = True
        return jsonify(response)


@bp.route('/contactforms', methods=["GET"])
@admin_required()
def get_all_message():
    data = Contact_form.to_collection_dict(Contact_form.query.all(), 'order.get_orders')
    return jsonify(data),200 

@bp.route('/contactforms/<id>', methods=["GET"])
@admin_required()
def get_contact(id):
    return jsonify(Contact_form.query.filter_by(id=id).first().to_dict()),200 

@bp.route('/contactforms/<id>', methods=["DELETE"])
@admin_required()
def delete_contact(id):
    form= Contact_form.query.filter_by(id=id).first()
    deleted_form_infor=form.to_dict()
    db.session.delete(form)
    db.session.commit()
    response = dict()
    response['isItemDeleted']=True
    response['deletedItemInfo']= deleted_form_infor
    return jsonify(response),200

@bp.route('/contactforms/<id>/response', methods=["POST"])
@admin_required()
def response_to_contact(id):
    contact_form =Contact_form.query.filter_by(id=id).first()
    data = request.get_json() or {}
    if "response" not in data:
        return bad_request("Please provide response!")
    contact_form.response = data["response"]
    db.session.commit()
    return contact_form.to_dict(),200