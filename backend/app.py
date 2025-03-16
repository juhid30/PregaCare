from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from config import Config

# Initialize Flask extensions
mongo = PyMongo()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
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
