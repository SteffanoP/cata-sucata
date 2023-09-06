import json

import azure.functions as func

from shared_code.properties import Properties

def main(req: func.HttpRequest) -> func.HttpResponse:

    id = req.params.get('id')
    prop = req.params.get('prop')

    items = Properties.get_item(id, prop)

    return func.HttpResponse(
        body=json.dumps(items),
        mimetype='application/json',
        status_code=200
    )