from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_ACCESS_COOKIE_NAME = "access_token"
    JWT_REFRESH_COOKIE_NAME = "refresh_token"
    
    JWT_COOKIE_SECURE = False  # Change to True in production (HTTPS)
    JWT_COOKIE_SAMESITE = "None"  # Allow cross-origin cookies
    JWT_SESSION_COOKIE = False  # Prevent Flask from deleting cookies
    JWT_COOKIE_CSRF_PROTECT = False  # Disable CSRF protection if needed
    
    JWT_ACCESS_TOKEN_EXPIRES = 1200  # 15 minutes
    JWT_REFRESH_TOKEN_EXPIRES = 604800  # 7 days
