from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB

class Form(db.Model):
    __tablename__ = 'forms'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    form_url = db.Column(db.String(255))
    title = db.Column(db.String(255))
    field_type = db.Column(JSONB, nullable=False)
    field_labels = db.Column(JSONB)
    input_labels = db.Column(JSONB)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    all_entries = db.Column(db.Integer)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    owner = db.relationship("User", back_populates="forms")
    entries = db.relationship("Entry", back_populates="form", cascade="all, delete-orphan")

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
            'entries': [e.to_dict() for e in self.entries]
        }
