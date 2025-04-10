from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity, get_jwt, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
)
from models.user import User
from middleware.middlewares import auto_refresh_jwt

auth_bp = Blueprint('auth', __name__)

# 🔹 Register Route
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json

    required_fields = [
        "email", "password", "firstName", "lastName", "dueDate",
        "lastPeriodDate", "pregnancyWeek", "firstPregnancy",
        "previousPregnancies", "healthConditions", "otherCondition",
        "obGynName", "obGynContact", "hospitalName",
        "emergencyContact", "emergencyPhone"
    ]

    # if not all(field in data for field in required_fields):
    #     return jsonify({"message": "Missing fields"}), 400

    full_name = f"{data['firstName']} {data['lastName']}"
    user = User.create_user(
        email=data["email"],
        password=data["password"],
        name=full_name,
        due_date=data["dueDate"],
        last_period_date=data["lastPeriodDate"],
        pregnancy_week=data["pregnancyWeek"],
        first_pregnancy=data["firstPregnancy"],
        previous_pregnancies=data["previousPregnancies"],
        health_conditions=data["healthConditions"],
        other_condition=data["otherCondition"],
        obgyn_name=data["obGynName"],
        obgyn_contact=data["obGynContact"],
        hospital_name=data["hospitalName"],
        emergency_contact=data["emergencyContact"],
        emergency_phone=data["emergencyPhone"],
    )

    if not user:
        return jsonify({"message": "User already exists"}), 400

    return jsonify({"message": "User registered successfully"}), 201

# 🔹 Login Route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.find_by_email(data['email'])

    if user and User.verify_password(user['password'], data['password']):
        access_token = create_access_token(identity=user['email'])
        refresh_token = create_refresh_token(identity=user['email'])

        response = jsonify({"message": "Login successful", "access_token":access_token, "refresh_token":refresh_token})
        response.set_cookie(
            "access_token", access_token, 
            max_age=1200, httponly=True, samesite="None", secure=False  # Secure=True in prod
        )
        response.set_cookie(
            "refresh_token", refresh_token, 
            max_age=604800, httponly=True, samesite="None", secure=False
        )
        return response, 200

    return jsonify({"message": "Invalid credentials"}), 401


# 🔹 Profile Route (Auto Refresh Token)
@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
@auto_refresh_jwt  # 🔹 Now, access token will auto-refresh if expired!
def profile():
    email = get_jwt_identity()
    user = User.find_by_email(email)

    if user:
        user.pop("password", None)  
        return jsonify(user), 200
    
    return jsonify({"message": "User not found"}), 404

# 🔹 Refresh Token Route
@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)  # Requires a valid refresh token
def refresh():
    identity = get_jwt_identity()
    new_access_token = create_access_token(identity=identity)

    response = jsonify({"message": "Access token refreshed"})
    set_access_cookies(response, new_access_token)
    return response, 200

# 🔹 Logout Route (Clears Tokens)
@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Logged out successfully"})
    unset_jwt_cookies(response)  # Clears both access and refresh tokens
    return response, 200
