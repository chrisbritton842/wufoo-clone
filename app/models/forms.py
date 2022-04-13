from .db import db
from sqlalchemy import DateTime
from sqlalchemy.sql import func

class Form(db.Model):
    __tablename__ = 'forms'

    id = db.Column(db.Integer, primary_key=True)
    form_url = db.Column(db.String(255))
    title = db.Column(db.String(255))
    field_type = db.Column(db.JSONB, nullable=False)
    field_labels = db.Column(db.JSONB)
    input_labels = db.Column(db.JSONB)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    all_entries = db.Column(db.Integer)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.utc_timestamp())

    owner = db.relationship("User", back_populates="forms")
