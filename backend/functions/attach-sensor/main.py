import json
import azure.functions as func

from shared_code.get_data import get_gateways
from shared_code.area_coleta import AreaColeta

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
    gateway = body['gateway'] if body['gateway'] else None
    name_areacoleta = body['areacoleta'] if body['areacoleta'] else None

    if not verify_gateway(gateway):
        func.HttpResponse(
            "Gateway not found",
            status_code=400
        )
    
    if not verify_areacoleta(name_areacoleta):
        func.HttpResponse(
            "AreaColeta not found",
            status_code=400
        )

    # TODO: Add the item into container
    # TODO: Return successfull
    # return func.HttpResponse(
    #     body=json.dumps(items),
    #     mimetype='application/json',
    #     status_code=200
    # )