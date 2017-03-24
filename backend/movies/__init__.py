from flask import Flask
from flask_cors import CORS, cross_origin
from movies.route.controller import main
from movies.config import configure
from movies.models.models import db

app = Flask(__name__)
configure(app)
db.init_app(app)
CORS(app)

with app.app_context():
  db.create_all()

app.register_blueprint(main, url_prefix='/reviews')