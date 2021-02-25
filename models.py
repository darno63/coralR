from datetime import datetime
from config import db, ma

# original main branch
db.Model.metadata.reflect(db.engine)

class Vessel(db.Model):
    __table__ = db.Model.metadata.tables['vessels']

class VesselSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Vessel
        sqla_session = db.session
        load_instance = True

