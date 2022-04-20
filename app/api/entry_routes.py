from flask import Blueprint, request
from app.models import db, Entry

entry_routes = Blueprint('entries', __name__)

@entry_routes.route('/', methods=['GET', 'POST'])
def add_entry():

    if request.method == 'POST':

        data = request.get_json(force=True)

        entry = Entry(date=data["date"], email=data["email"], number=data["number"], telephone=data["telephone"], text=data["text"], textarea=data["textArea"], url=data["url"], form_id=data["formId"])
        db.session.add(entry)
        db.session.flush()
        db.session.commit()

        entries = Entry.query.all()

        return { "entries": sorted([e.to_dict() for e in entries], key=lambda e: e["created_at"]) }

    entries = Entry.query.all()

    return { "entries": sorted([e.to_dict() for e in entries], key=lambda e: e["created_at"]) }
