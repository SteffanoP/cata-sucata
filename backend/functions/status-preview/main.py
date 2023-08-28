import logging
import json

import azure.functions as func

from shared_code.get_data import get_last_data

payload_response = {
    "devices_info": {
        "number_devices": 0
    },
    "status_trash": {
        "full": 0,
        "medium": 0,
        "empty": 0,
        "unknown": 0
    }
}

PAYLOAD_EXAMPLE = {
    "devices_info": {
        "number_devices": 14
    },
    "status_trash": {
        "full": 2,
        "medium": 5,
        "empty": 2,
        "unknown": 5
    }
}

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('type')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('type')

    if name == 'raw':
        msg = get_last_data()
        return func.HttpResponse(
            msg,
            mimetype="application/json",
            status_code=200
        )

    if name == 'example':
        return func.HttpResponse(
            json.dumps(PAYLOAD_EXAMPLE),
            mimetype="application/json",
            status_code=200
        )

    msg = get_last_data()
    payload = json.loads(msg)

    payload_response.update({
        "devices_info": {
            "number_devices": payload['sensor_quantity']
        },
        "status_trash": filter_status(payload['sensor_data'])
    })

    return func.HttpResponse(
            json.dumps(payload_response),
            mimetype="application/json",
            status_code=200
    )

def filter_status(payload_data) -> dict[str, int]:
    status = {
        "full": 0,
        "medium": 0,
        "empty": 0,
        "unknown": 0
    }

    for data in payload_data:
        if data['type'] == 1:
            if (data['data'] % 357) == 0: # When its zero or 357
                status['unknown'] += 1
            elif data['data'] < 5:
                status['full'] += 1
            elif data['data'] < 20:
                status['medium'] += 1
            else:
                status['empty'] += 1

    return status