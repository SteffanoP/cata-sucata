import json

import azure.functions as func

from shared_code.get_data import list_from_gateways
from shared_code.properties import Properties
from shared_code.area_coleta import AreaColeta

def main(req: func.HttpRequest) -> func.HttpResponse:
    body = req.get_json()
    nome_area = body.get("areacoleta") or None
    if nome_area is None:
        return func.HttpResponse(
            "Areacoleta não informada.",
            status_code=400
        )
    gerente_coleta = Properties.get_item('gerente_de_coleta', 'gerente')
    items={}
    if gerente_coleta['is_public']:
        area = AreaColeta.get_nome(nome_area)
        if len(area) == 0:
            return func.HttpResponse(
            "Areacoleta não encontrada.",
            status_code=400
            )
        
        sensors_list = area[0]["sensors"]
        if len(sensors_list) == 0:
            return func.HttpResponse(
            "Areacoleta vazia.",
            status_code=400
            )

        items = list_from_gateways(sensors_list)


    return func.HttpResponse(
        body=json.dumps(items),
        mimetype='application/json',
        status_code=200
    )