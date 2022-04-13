from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    forms = db.relationship("Form", back_populates="owner")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'forms': [f.to_dict() for f in self.forms]
        }


class Form(db.Model):
    __tablename__ = 'forms'

    id = db.Column(db.Integer, primary_key=True)
    form_url = db.Column(db.String(255))
    title = db.Column(db.String(255))
    field_type = db.Column(JSONB, nullable=False)
    field_labels = db.Column(JSONB)
    input_labels = db.Column(JSONB)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    all_entries = db.Column(db.Integer)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.utc_timestamp())

    owner = db.relationship("User", back_populates="forms")
    entries = db.relationship("Entry", back_populates="form")

    def to_dict(self):
        return {
            'id': self.id,
            'form_url': self.form_url,
            'title': self.title,
            'field_type': self.field_type,
            'field_labels': self.field_labels,
            'input_labels': self.input_labels,
            'user_id': self.user_id,
            'all_entries': self.all_entries,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'owner': self.owner,
            'entries': [e.to_dict() for e in self.entries]
        }

class Entry(db.Model):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(JSONB)
    email = db.Column(JSONB)
    number = db.Column(JSONB)
    telephone = db.Column(JSONB)
    text = db.Column(JSONB)
    textarea = db.Column(JSONB)
    url = db.Column(JSONB)
    form_id = db.Column(db.Integer, db.ForeignKey('forms.id'), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.utc_timestamp())

    form = db.relationship("Form", back_populates="entries")

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date,
            'email': self.email,
            'number': self.number,
            'telephone': self.telephone,
            'text': self.text,
            'textarea': self.textarea,
            'url': self.url,
            'form_id': self.form_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'form': self.form
        }
