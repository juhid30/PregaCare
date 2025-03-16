from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from config import Config
from flask_cors import CORS
# Initialize Flask extensions
mongo = PyMongo()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True) # ✅ Allow cookies from frontend

    app.config.from_object(Config)

    mongo.init_app(app)
    app.db = mongo.db  # ✅ Attach `db` to `app`

    jwt.init_app(app)

    from routes import auth_bp  
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app

app = create_app()  # ✅ Create app

if __name__ == "__main__":
    app.run(debug=True)
