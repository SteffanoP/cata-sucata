import json

import azure.functions as func

from shared_code.area_coleta import AreaColeta

def main(req: func.HttpRequest) -> func.HttpResponse:
    id = req.params.get('id')
    name = req.params.get('name')

    item = AreaColeta.get_item(id,name)
    return func.HttpResponse(
        body=json.dumps(item),
        mimetype='application/json',
        status_code=200
    )