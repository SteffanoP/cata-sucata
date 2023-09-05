import json
import azure.functions as func

from shared_code.get_data import get_gateways
from shared_code.area_coleta import AreaColeta
from shared_code.sensor import Sensor

# TODO: Testar verificação de gateway
def verify_gateway(gateway: str | None) -> bool:
    if gateway is None:
        return False

    items = json.loads(get_gateways())
    if gateway not in items:
        return False
    
    return True

# TODO: Testar verificação de área de coleta
def verify_areacoleta(name_areacoleta: str | None) -> bool:
    if name_areacoleta is None:
        return False

    items = AreaColeta.list_all()
    if name_areacoleta not in items:
        return False

    return True

def main(req: func.HttpRequest) -> func.HttpResponse:
    body = req.get_json()
    gateway = body.get('gateway') or None
    name_areacoleta = body.get('areacoleta') or None

    # if not verify_gateway(gateway):
    #     return func.HttpResponse(
    #         "Gateway not found",
    #         status_code=400
    #     )
    
    # if not verify_areacoleta(name_areacoleta):
    #     return func.HttpResponse(
    #         "AreaColeta not found",
    #         status_code=400
    #     )
    
    sensors = Sensor.list_with_partition(gateway)
    area = AreaColeta.get_nome(name_areacoleta)
    area_sensors = area[0].get('sensors') or []

    for sensor in sensors:
        sensor['areacoleta'] = name_areacoleta
        Sensor.upsert(sensor)

        if gateway not in area_sensors:
            area_sensors.append(gateway)
            
    area[0]['sensors'] = area_sensors
    AreaColeta.upsert(area[0])
    # TODO: Add the item into container
    # TODO: Return successfull
    
    return func.HttpResponse(
        body=json.dumps(sensors),
        mimetype='application/json',
        status_code=200
    )