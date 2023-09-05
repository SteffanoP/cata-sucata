import json
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
        self.id = None
        self.nome = nome
        self.latitude = coords[0]
        self.longitude = coords[1]
        self.tamanho = tamanho

    def insert(self):
        """Insere a área de coleta no banco de dados Azure.
        """
        item = {
            'nome': self.nome,
            'latitude': str(self.latitude),
            'longitude': str(self.longitude),
            'tamanho': self.tamanho
        }
        container.create_item(item, enable_automatic_id_generation=True)
    
    @staticmethod
    def list_all() -> list[str, str]:
        QUERY = "SELECT c.id, c.nome, c.latitude, c.longitude, c.tamanho FROM c"
        results = container.query_items(QUERY, enable_cross_partition_query=True)
        return [item for item in results]

    @staticmethod
    def get_item(id: str, name: str):
        return container.read_item(item=id, partition_key=name)


    @staticmethod
    def remove(id: str, name: str):
        container.delete_item(item=id, partition_key=name)

    @staticmethod
    def get_nome(nome):
        QUERY = F'SELECT TOP 1 * FROM c WHERE c.nome = "{nome}"'
        results = container.query_items(QUERY, enable_cross_partition_query=True)
        return [item for item in results]