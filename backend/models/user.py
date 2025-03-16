from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app

class User:
    
    @staticmethod
    def create_user(email, password, name, age):
        
        if User.find_by_email(email):
            return None
        
        hashed_password = generate_password_hash(password)
        user = {
            "email": email,
            "password": hashed_password,
            "name": name,
            "age": age
        }
        with current_app.app_context():  # ✅ Use app context to get db
            db = current_app.db
            db.users.insert_one(user)  # ✅ No more circular import
        return user

    @staticmethod
    def find_by_email(email):
        """Finds a user by email."""
        with current_app.app_context():
            db = current_app.db
            return db.users.find_one({"email": email})

    @staticmethod
    def verify_password(stored_password, provided_password):
        """Verifies a provided password against the stored hashed password."""
        return check_password_hash(stored_password, provided_password)
