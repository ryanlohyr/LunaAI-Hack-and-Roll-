import os

from pinecone import Pinecone
from dotenv import load_dotenv

load_dotenv()


def get_index():
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    index = pc.Index("test-api")

    # if index_name not in pinecone.list_indexes():
    #     # if does not exist, create index
    #     pinecone.create_index(
    #         index_name,
    #         dimension=1536,  # standard for OpenAI Ada embedding
    #         metric="cosine",
    #         metadata_config={"indexed": ["channel_id", "published"]},
    #     )

    # connect to index
    return index
