from werkzeug.security import generate_password_hash, check_password_hash
from app import mongo

class User:
    @staticmethod
    def create_user(email, password, name, age):
        hashed_password = generate_password_hash(password)
        user = {
            "email": email,
            "password": hashed_password,
            "name": name,
            "age": age
        }
        mongo.db.users.insert_one(user)
        return user

    @staticmethod
    def find_by_email(email):
        """Finds a user by email."""
        return mongo.db.users.find_one({"email": email})

    @staticmethod
    def verify_password(stored_password, provided_password):
        """Verifies a provided password against the stored hashed password."""
        return check_password_hash(stored_password, provided_password)
