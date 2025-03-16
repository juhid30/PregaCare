from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity, create_access_token, set_access_cookies

def auto_refresh_jwt(fn):
    """Middleware to automatically refresh expired access tokens using refresh token."""
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()  # Check access token
        except:
            refresh_token = request.cookies.get("refresh_token")
            if refresh_token:
                new_access_token = create_access_token(identity=get_jwt_identity())
                response = jsonify({"message": "Token refreshed", "access_token": new_access_token})
                set_access_cookies(response, new_access_token)  # Set new access token
                return response

            return jsonify({"message": "Session expired. Please log in again."}), 401
        
        return fn(*args, **kwargs)

    return wrapper
