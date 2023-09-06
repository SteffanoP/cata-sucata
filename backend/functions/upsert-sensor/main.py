import logging
import json

import azure.functions as func

from shared_code.sensor import Sensor

def main(req: func.HttpRequest) -> func.HttpResponse:
    body = req.get_json()
    Sensor.upsert(body)
    return func.HttpResponse(
        body=json.dumps(body),
        mimetype='application/json',
        status_code=200
    )