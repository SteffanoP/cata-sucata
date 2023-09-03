import logging
import json

import azure.functions as func

from shared_code.properties import Properties

def main(req: func.HttpRequest) -> func.HttpResponse:
    body = req.get_json()
    properties = Properties()
    properties.upsert_item(
        id=body['id'],
        properties={
            "is_public": body['is_public']
        }
    )
    return func.HttpResponse(
        body=json.dumps(body),
        mimetype='application/json',
        status_code=200
    )