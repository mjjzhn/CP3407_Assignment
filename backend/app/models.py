from dataclasses import dataclass
from zoneinfo import available_timezones
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask import url_for
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<Admin {}>'.format(self.username)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<Customer {}>'.format(self.username)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# class APIMixin(object):
#     @staticmethod
#     def to_collection_dict(query, endpoint, **kwargs):
#         data ={
#             'items': [item.to_dict() for item in query],
#             '_meta': {
#                 'total_items': len(query)
#             },
#             '_links': {
#                 'self': url_for(endpoint,**kwargs)
#             }
#         }
#         return data

# class Item(APIMixin, db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     item_name = db.Column(db.String(64), index=True, unique=True)
#     item_category =db.Column(db.String(32)) #for example, pizza, drink
#     item_image_link = db.Column(db.String(140))
#     item_description= db.Column(db.String(140))
#     item_base_price = db.Column(db.Float(16))
#     size_plus_price = db.Column(db.Float(16))
#     num_of_item = db.Column(db.Integer)
#     size_list = db.Column(db.String(64)) #add based on the size_list
#     is_hot = db.Column(db.Boolean, default=False)
#     available = db.Column(db.Boolean, default=True)

#     # #the list of size for this item in ascending order. Format:"small large big"
#     # size_list_dict ={}

#     category = ["beef", "chicken", "vegan", "beverage"]
#     available_size_lists={
#         "S/M/L" : ["Small","Medium", "Large"]
#     }

#     @staticmethod
#     def validate_size_list(size_list):
#         if size_list not in Item.available_size_lists:
#             return False
#         return True

#     @staticmethod
#     def validate_category(category):
#         #check whether the category and type is valid or not
#         if category not in Item.category:
#             return False
#         return True

#     def add_item_to_order(self):
#         self.num_of_item -= 1

#     def __repr__(self):
#         return '<Item {}>'.format(self.item_name)

#     def to_dict(self):
#         data= {
#             "id": self.id,
#             "item_name": self.item_name,
#             "item_category":self.item_category,
#             "item_image_link":self.item_image_link,
#             "item_description": self.item_description,
#             "num_of_item":self.num_of_item,
#             "size_list":self.size_list,
#             "available":self.available,
#             "item_base_price": self.item_base_price,
#             "size_plus_price":self.size_plus_price,
#             "is_hot": self.is_hot,
#             '_links':{
#                 'self': url_for('menu.get_item', id=self.id)
#             }
#         }
#         price_dict ={}
#         current_size_list =Item.available_size_lists[self.size_list]
#         for i in range(len(current_size_list)):
#             price_dict[current_size_list[i]] = self.item_base_price + i*self.size_plus_price

#         data["item_prices"]=  price_dict
#         return data
    
#     def from_dict(self,data):
#         for field in ['item_name',"item_image_link", "item_description","item_base_price", "size_plus_price","num_of_item"]:
#             if field in data:
#                 setattr(self, field, data[field])
#         for field in ['item_category',"size_list"]:
#             #need extra validation
#             if field in data:
#                 setattr(self, field, data[field]) 
#         if "available" in data:
#             if isinstance(data["available"], bool):
#                 setattr(self, "available", data["available"])
#         if "is_hot" in data:
#             if isinstance(data["is_hot"], bool):
#                 setattr(self, "is_hot", data["is_hot"])