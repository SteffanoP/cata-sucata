import json

import azure.functions as func

from shared_code.get_data import get_gateways

def main(req: func.HttpRequest) -> func.HttpResponse:
    items = get_gateways()
    return func.HttpResponse(
        body=json.dumps(items),
        mimetype='application/json',
        status_code=200
    )