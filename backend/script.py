from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
)
import datetime

app = Flask(__name__)
from flask_cors import CORS

CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

app.config["JWT_SECRET_KEY"] = "abcdefg"  
app.config["JWT_COOKIE_SECURE"] = False  # False because localhost is not HTTPS
app.config["JWT_COOKIE_SAMESITE"] = "Lax"  # Allows cross-origin requests in development

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(minutes=15)  # Access Token Expiry
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = datetime.timedelta(days=30)  # Refresh Token Expiry
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]  # Store JWT in HTTP-only cookies

jwt = JWTManager(app)

# Dummy User Data (Replace with DB)
users = {"test@example.com": {"password": "password123"}}


# ✅ Login Route - Sets Access & Refresh Tokens in Cookies
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email, password = data.get("email"), data.get("password")

    if email not in users or users[email]["password"] != password:
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=email)
    refresh_token = create_refresh_token(identity=email)

    response = jsonify({"msg": "Login successful"})

    # ✅ Set JWT in HttpOnly cookies with correct attributes
    response.set_cookie(
        "access_token_cookie",
        access_token,
        httponly=True,
        secure=False,  # Set True if using HTTPS
        samesite="Lax",
        path="/"
    )
    response.set_cookie(
        "refresh_token_cookie",
        refresh_token,
        httponly=True,
        secure=False,
        samesite="Lax",
        path="/"
    )

    return response



# ✅ Protected Route - Requires Access Token in Cookie
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"msg": f"Hello, {current_user}!"})


# ✅ Refresh Token Route - Issues New Access Token
@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)

    response = jsonify({"msg": "Token refreshed"})
    set_access_cookies(response, new_access_token)  # Update Access Token in Cookie
    return response


# ✅ Logout - Clears Cookies
@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "Logged out"})
    unset_jwt_cookies(response)  # Clears JWT Cookies
    return response


if __name__ == "__main__":
    app.run(debug=True)
