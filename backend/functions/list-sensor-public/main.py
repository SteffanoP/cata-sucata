import json

import azure.functions as func

from shared_code.sensor import Sensor
from shared_code.properties import Properties

def main(req: func.HttpRequest) -> func.HttpResponse:
    gerente_coleta = Properties.get_item('gerente_de_coleta', 'gerente')
    items={}
    if gerente_coleta['is_public']:
        items = Sensor.list_all()
    return func.HttpResponse(
        body=json.dumps(items),
        mimetype='application/json',
        status_code=200
    )