import json
import os
from azure.cosmos import CosmosClient


from datetime import datetime, timedelta

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

def list_all():
    QUERY = "SELECT c.id, c.sensorid, c.Body, c._ts FROM c ORDER BY c._ts DESC"
    results = container.query_items(QUERY, enable_cross_partition_query=True)
    return [item for item in results]

def list_between_days(start, end=None):
    if end is None:
        end = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    QUERY = f"SELECT c.id, c.sensorid, c.Body, c._ts FROM c WHERE TimestampToDateTime(c._ts*1000) > '{start}' and TimestampToDateTime(c._ts*1000) < '{end}'"
    results = container.query_items(QUERY, enable_cross_partition_query=True)
    return [item for item in results]

def list_from_gateways(gateway):
    gateway_list = '(' + ', '.join(f'"{t}"' for t in gateway) + ')'
    QUERY = f"SELECT c.id, c.sensorid, c.Body, c._ts FROM c WHERE c.sensorid IN {gateway_list}"
    results = container.query_items(QUERY, enable_cross_partition_query=True)
    return [item for item in results]