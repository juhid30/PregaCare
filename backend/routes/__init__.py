from flask import Blueprint

# ✅ Define blueprint first
auth_bp = Blueprint('auth', __name__)

# ✅ Import routes after defining blueprint (to prevent circular import)
from .auth import *
