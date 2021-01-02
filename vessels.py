# Modules
from datetime import datetime
from flask import make_response, abort
from models import Vessel, VesselSchema
from config import db

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def read_all():
    """
    This function responds to a request for /api/vessels
    with the complete lists of vessels
    """
    # Create the list of vessels from our data
    vessels = Vessel.query.order_by(Vessel.vessel_id).all()

    # Serialize the data for the response
    vessel_schema = VesselSchema(many=True)
    return vessel_schema.dump(vessels)

def read_one(vessel_id):
    """
    This function responds to a request for /api/vessels/{vessel_id}
    with one matching vessel from vessels
    """
    # Get the vessel requested
    vessel = Vessel.query.filter(Vessel.vessel_id == vessel_id).one_or_none()

    # Did we find a vessel?
    if vessel is not None:

        # Serialize the data for the response
        vessel_schema = VesselSchema()
        return vessel_schema.dump(vessel)

    # Otherwise, nope, didn't find that vessel
    else:
        abort(404, 'Vessel not found for Id: {vessel_id}'.format(vessel_id=vessel_id))