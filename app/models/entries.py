from .db import db
from sqlalchemy import DateTime
from sqlalchemy.sql import func

class Entry(db.Model):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.JSONB)
    email = db.Column(db.JSONB)
    number = db.Column(db.JSONB)
    telephone = db.Column(db.JSONB)
    text = db.Column(db.JSONB)
    textarea = db.Column(db.JSONB)
    url = db.Column(db.JSONB)
    from_id = db.Column(db.Integer)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.utc_timestamp())
