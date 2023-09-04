import json

import azure.functions as func

from shared_code.get_data import list_between_days
from shared_code.properties import Properties

def main(req: func.HttpRequest) -> func.HttpResponse:
    body = req.get_json()
    gerente_coleta = Properties.get_item('gerente_de_coleta', 'gerente')
    items={}
    if gerente_coleta['is_public']:
        items = list_between_days(start=body['start'], end=body.get('end') or None)
    return func.HttpResponse(
        body=json.dumps(items),
        mimetype='application/json',
        status_code=200
    )