import json

import azure.functions as func

from shared_code.area_coleta import AreaColeta

def main(req: func.HttpRequest) -> func.HttpResponse:
    body = req.get_json()
    AreaColeta.remove(body['id'], body['name'])
    return func.HttpResponse(
        body=json.dumps(body),
        mimetype='application/json',
        status_code=200
    )