import json
import os
from azure.cosmos import CosmosClient


COSMOS_DB_CONNECTION_STR = os.environ['COSMOS_DB_CONNECTION_STR']
client = CosmosClient.from_connection_string(COSMOS_DB_CONNECTION_STR)
COSMOS_DB_DATABASE_ID = 'SensorData'
database = client.get_database_client(COSMOS_DB_DATABASE_ID)
COSMOS_DB_CONTAINER_ID = 'sensors'
container = database.get_container_client(COSMOS_DB_CONTAINER_ID)

class Sensor:
    def __init__(self) -> None:
        pass

    @staticmethod
    def get_item(id: str, name: str):
        return container.read_item(item=id, partition_key=name)
    
    @staticmethod
    def list_all():
        QUERY = "SELECT * FROM c"
        results = container.query_items(QUERY, enable_cross_partition_query=True)
        return [item for item in results]
    
    @staticmethod
    def upsert(body):
        container.upsert_item(body=body, pre_trigger_include=None, post_trigger_include=None)
    
    @staticmethod
    def list_with_partition(partition_key):
        QUERY = f"SELECT * FROM c WHERE c.gateway = '{partition_key}'"
        results = container.query_items(QUERY, enable_cross_partition_query=True)
        return [item for item in results]
    