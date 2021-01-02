"""
https://realpython.com/flask-connexion-rest-api/#handler-for-people-endpoint

This is the people module and supports all the ReST actions for the
PEOPLE collection
"""
# Modules
from datetime import datetime
from flask import make_response, abort
from models import Person, PersonSchema
from config import db

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def read_all():
    """
    This function responds to a request for /api/people
    with the complete lists of people

    :return:        json string of list of people

    https://realpython.com/flask-connexion-rest-api-part-2/#update-the-rest-api-handlers
    """
    # Create the list of people from our data
    people = Person.query.order_by(Person.lname).all()

    # Serialize the data for the response
    person_schema = PersonSchema(many=True)
    return person_schema.dump(people)

def read_one(person_id):
    """
    This function responds to a request for /api/people/{person_id}
    with one matching person from people

    :param person_id:   ID of person to find
    :return:            person matching ID
    """
    # Get the person requested
    person = Person.query.filter(Person.person_id == person_id).one_or_none()

    # Did we find a person?
    if person is not None:

        # Serialize the data for the response
        person_schema = PersonSchema()
        return person_schema.dump(person)

    # Otherwise, nope, didn't find that person
    else:
        abort(404, 'Person not found for Id: {person_id}'.format(person_id=person_id))