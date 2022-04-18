from .db import db
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB

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
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

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
            'updated_at': self.updated_at
        }
