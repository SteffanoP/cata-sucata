import json
import os
from azure.cosmos import CosmosClient


COSMOS_DB_CONNECTION_STR = os.environ['COSMOS_DB_CONNECTION_STR']
client = CosmosClient.from_connection_string(COSMOS_DB_CONNECTION_STR)
COSMOS_DB_DATABASE_ID = 'SensorData'
database = client.get_database_client(COSMOS_DB_DATABASE_ID)
COSMOS_DB_CONTAINER_ID = 'properties'
container = database.get_container_client(COSMOS_DB_CONTAINER_ID)

class Properties:
    def __init__(self) -> None:
        pass
    
    @staticmethod
    def get_item(id: str, name: str):
        return container.read_item(item=id, partition_key=name)
    
    @staticmethod
    def upsert_item(id: str, properties):
        print({"id":id, **properties})
        container.upsert_item(body={"id":id, **properties}, pre_trigger_include=None, post_trigger_include=None)
