import json

import azure.functions as func

from shared_code.area_coleta import AreaColeta

def main(req: func.HttpRequest) -> func.HttpResponse:
    items = AreaColeta.list_all()
    return func.HttpResponse(
        body=json.dumps(items),
        mimetype='application/json',
        status_code=200
    )