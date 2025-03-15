from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from config import Config
from routes import auth_bp

# Initialize extensions
mongo = PyMongo()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    mongo.init_app(app)
    jwt.init_app(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
