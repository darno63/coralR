from datetime import datetime
from config import db, ma

db.Model.metadata.reflect(db.engine)

class Person(db.Model):
    __table__ = db.Model.metadata.tables['person']

class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person
        sqla_session = db.session
        load_instance = True
        
