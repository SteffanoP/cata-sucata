import json

import azure.functions as func

from shared_code.sensor import Sensor

def main(req: func.HttpRequest) -> func.HttpResponse:

    areacoleta = req.params.get('areacoleta')

    items = Sensor.get_from_areacoleta(areacoleta)

    return func.HttpResponse(
        body=json.dumps(items),
        mimetype='application/json',
        status_code=200
    )