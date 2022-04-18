from flask import Blueprint, request
from app.models import db, Form

form_routes = Blueprint('forms', __name__)

@form_routes.route('/<userId>', methods=['GET', 'POST'])
def create_form(userId):

    if request.method == 'POST':

        data = request.get_json(force=True)

        form = Form(title=data["title"], field_type=data["inputs"], field_labels=data["labels"], input_labels=data["description"], user_id=userId)
        db.session.add(form)
        db.session.flush()
        db.session.commit()

        forms = Form.query.filter(Form.user_id == userId).all()

        return { "forms": [f.to_dict() for f in forms] }

    forms = Form.query.filter(Form.user_id == userId).all()

    return { "forms": [f.to_dict() for f in forms] }


@form_routes.route('/<id>', methods=['PUT'])
def update_form(id):

    data = request.get_json(force=True)

    form = Form.query.get(id)

    if "url" in data.keys():
        form.form_url = data["url"]
    if "title" in data.keys():
        form.title = data["title"]
    if "inputs" in data.keys():
        form.field_type = data["inputs"]
    if "labels" in data.keys():
        form.field_labels = data["labels"]
    if "description" in data.keys():
        form.input_labels = data["description"]
    if "entries" in data.keys():
        form.all_entries = data["entries"]
    db.session.commit()

    forms = Form.query.filter(Form.user_id == data["userId"]).all()

    return { "forms": [f.to_dict() for f in forms] }


@form_routes.route('/<userId>/<id>', methods=['DELETE'])
def delete_form(userId, id):

    form = Form.query.get(id)
    db.session.delete(form)
    db.session.commit()

    forms = Form.query.filter(Form.user_id == userId).all()

    return { "forms": [f.to_dict() for f in forms] }
