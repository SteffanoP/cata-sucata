import os
from azure.cosmos import CosmosClient

COSMOS_DB_CONNECTION_STR = os.environ['COSMOS_DB_CONNECTION_STR']
client = CosmosClient.from_connection_string(COSMOS_DB_CONNECTION_STR)
COSMOS_DB_DATABASE_ID = 'SensorData'
database = client.get_database_client(COSMOS_DB_DATABASE_ID)
COSMOS_DB_CONTAINER_ID = 'areacoleta'
container = database.get_container_client(COSMOS_DB_CONTAINER_ID)

class AreaColeta(object):
    """
    Objeto que representa uma área de coleta de lixo.
    """
    def __init__(self, nome: str, coords: tuple, tamanho: str) -> None:
        self.nome = nome
        self.latitude = coords[0]
        self.longitude = coords[1]
        self.tamanho = tamanho
