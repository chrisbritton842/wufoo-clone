from .db import db

class Form(db.Model):
    __tablename__ = 'forms'

    id = db.Column(db.Integer, primary_key=True)
    form_url = db.Column(db.String(255))
    title = db.Column(db.String(255))
    field_type = db.Column(db.JSONB, nullable=False)
    field_labels = db.Column(db.JSONB)
    input_labels = db.Column(db.JSONB)
    user_id = db.Column(db.Integer)
    all_entries = db.Column(db.Integer)

