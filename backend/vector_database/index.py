import os

from pinecone import Pinecone
from dotenv import load_dotenv
from configs.tables import INDEXES

load_dotenv()


def get_default_index(index_name="test-api"):
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    index = pc.Index(index_name)

    return index

def get_all_indexes():
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    indexes = [pc.Index(x) for x in INDEXES]

    return indexes
