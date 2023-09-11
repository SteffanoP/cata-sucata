import logging
import json

import azure.functions as func

from shared_code.get_data import get_last_data
from shared_code.sensor import Sensor

payload_response = []

PAYLOAD_EXAMPLE = [
    {
        'id': '0001',
        'latitude': '-8.2106378',
        'longitude': '-34.9203501',
        'gateway': 'nodemcu-steffano',
        'areacoleta': 'Dois Irmãos',
        'status': 'empty'
    },
    {
        'id': '0002',
        'latitude': '-9.0767778',
        'longitude': '-12.8703501',
        'gateway': 'nodemcu-steffano',
        'areacoleta': 'Cordeiros',
        'status': 'medium'
    }
]


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

    sensor_data = payload['sensor_data']
    all_sensors = Sensor.list_all()
    response = process_sensor_data(sensor_data, all_sensors)

    payload_response = response

    return func.HttpResponse(
        json.dumps(payload_response),
        mimetype="application/json",
        status_code=200
    )

def process_status(data) -> dict[str, int]:
   
    if (data % 357) == 0: # When its zero or 357
        return 'unknown'
    elif data < 5:
        return 'full'
    elif data < 20:
        return'medium'
    else:
        return'empty'


def process_sensor_data(sensor_data, all_sensors):

    result = []

    for reading in sensor_data:
        for sensor in all_sensors:
            if reading["uid"] == sensor["id"]:
                status = process_status(reading["data"])
                entry = {
                    "id": reading["uid"],
                    "latitude": sensor["latitude"],
                    "longitude": sensor["longitude"],
                    "gateway": sensor["gateway"],
                    "areacoleta": sensor["areacoleta"],
                    "status": status
                }
                result.append(entry)
    
    return result
