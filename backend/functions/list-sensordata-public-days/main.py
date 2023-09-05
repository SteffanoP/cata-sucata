import json

import azure.functions as func

from shared_code.get_data import list_between_days
from shared_code.properties import Properties

def main(req: func.HttpRequest) -> func.HttpResponse:
    
    start = req.params.get('start')
    end = req.params.get('end') or None

    gerente_coleta = Properties.get_item('gerente_de_coleta', 'gerente')
    items={}
    if gerente_coleta['is_public']:
        items = list_between_days(start=start, end=end)
    return func.HttpResponse(
        body=json.dumps(items),
        mimetype='application/json',
        status_code=200
    )