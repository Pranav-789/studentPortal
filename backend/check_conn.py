
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi

uri = "mongodb+srv://chaurasiakanishk666_db_user:LJa6SC9xjAJARmLi@internportal.wkf9jx4.mongodb.net/?appName=internPortal"

# Create a new client and connect to the server
# usage of certifi.where() fixes the SSL error on Mac
client = MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=certifi.where())

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)