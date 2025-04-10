from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app

class User:
    
    @staticmethod
    def create_user(email, password, name, due_date, last_period_date,
                    pregnancy_week, first_pregnancy, previous_pregnancies,
                    health_conditions, other_condition, obgyn_name, obgyn_contact,
                    hospital_name, emergency_contact, emergency_phone):

        if User.find_by_email(email):
            return None

        hashed_password = generate_password_hash(password)
        user = {
            "email": email,
            "password": hashed_password,
            "name": name,
            "due_date": due_date,
            "last_period_date": last_period_date,
            "pregnancy_week": pregnancy_week,
            "first_pregnancy": first_pregnancy,
            "previous_pregnancies": previous_pregnancies,
            "health_conditions": health_conditions,
            "other_condition": other_condition,
            "obgyn_name": obgyn_name,
            "obgyn_contact": obgyn_contact,
            "hospital_name": hospital_name,
            "emergency_contact": emergency_contact,
            "emergency_phone": emergency_phone
        }

        with current_app.app_context():
            db = current_app.db
            db.users.insert_one(user)
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
