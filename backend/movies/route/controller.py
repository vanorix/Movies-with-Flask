from flask import Blueprint
from flask import Flask, request, jsonify
from flask_cors import cross_origin
from random import randint
from movies.models.models import db, Movie, Review
import urllib.request
import os

main = Blueprint('main', __name__)

@main.route('/')
@main.route('/movies', methods=['GET', 'POST'])
@cross_origin()
def index():
  if request.method == 'POST':
    data = request.get_json()
    print(data)
    q = Movie.query.filter_by(name=data["title"]).first() 
    if q == None:
      if 'poster_path' in data:
        posterUrl = "http://image.tmdb.org/t/p/w150" + data["poster_path"]
        localUrl = os.path.abspath(os.path.join(os.getcwd(), os.pardir)) + "/frontend/static/images/" + data["id"] + ".jpg"
        urllib.request.urlretrieve(posterUrl, localUrl)
        movie = Movie(data["id"], data["title"], data["overview"], data["poster_path"])
      else:
        movie = Movie(data["id"], data["title"], data["overview"], None)
      db.session.add(movie)
      db.session.commit()
      return "SAVED!"
    else:
      id = q.name
      return id

@main.route('/review', methods=['GET', 'POST'])
def review():
    if request.method == 'POST':
      data = request.form.to_dict()
      print(data)
      q = Movie.query.filter_by(name=data["movie_name"]).first()
      
      reviewID = randint(1, 100)

      review = Review(reviewID, q.id, data["movie_name"], data["description"], data["rating"], data["user"], "deviceID")
      
      db.session.add(review)
      db.session.commit()
      return "SAVED!"
    else:
      return "EXISTS!"

@main.route('/find', methods=['GET'])
def findMovie():
    moviename = request.args.get('name')
    results = Movie.query.filter(Movie.name.startswith(moviename)).count()
    if results>0:
        movie = Movie.query.filter(Movie.name.startswith(moviename)).first()
        response = jsonify(movie.serialize())
        return response
    else:
        return 404