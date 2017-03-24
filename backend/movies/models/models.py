from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Movie(db.Model):
  __tablename__ = 'movie'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(64))
  description = db.Column(db.String(120))
  poster = db.column(db.String(120))
  review = db.relationship('Review', backref='movie', lazy='dynamic')

  def __init__(self, id, nm, des, pos):
    self.id = id
    self.name = nm
    self.description = des
    self.poster = pos

class Review(db.Model):
  __tablename__ = 'review'
  id = db.Column(db.Integer, primary_key=True)
  movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
  title = db.Column(db.String(64))
  description = db.Column(db.String(120))
  rating = db.column(db.String(120))
  user = db.column(db.String(120))
  deviceId = db.column(db.String(120))

  def __init__(self, id, mid, t, d, r, u, DI):
    self.id = id
    self.movie_id = mid
    self.title = t
    self.description = d
    self.rating = r
    self.user = u
    self.deviceId = DI