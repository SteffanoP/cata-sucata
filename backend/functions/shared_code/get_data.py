import json
import os
from azure.cosmos import CosmosClient

COSMOS_DB_CONNECTION_STR = os.environ['COSMOS_DB_CONNECTION_STR']
client = CosmosClient.from_connection_string(COSMOS_DB_CONNECTION_STR)
COSMOS_DB_DATABASE_ID = 'SensorData'
database = client.get_database_client(COSMOS_DB_DATABASE_ID)
COSMOS_DB_CONTAINER_ID = 'sensordata'
container = database.get_container_client(COSMOS_DB_CONTAINER_ID)

def get_last_data() -> str:
    """
    Get the last sent messages from gateways
    """
    QUERY = "SELECT top 1 c.Body FROM c ORDER BY c._ts DESC"
    results = container.query_items(QUERY, enable_cross_partition_query=True)
    items = [item for item in results]
    return json.dumps(items[0]['Body'])

def get_gateways() -> str:
    """
    Get all gateways on the Database

    Returns:
        str: JSON document with a list of all gateways.
    """
    QUERY = "SELECT DISTINCT c.sensorid FROM c"
    PARTITION_KEY_NAME = 'sensorid'
    results = container.query_items(QUERY, enable_cross_partition_query=True)
    items = [item[PARTITION_KEY_NAME] for item in results]
    return json.dumps(items)