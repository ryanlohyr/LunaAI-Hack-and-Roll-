import os
import numpy as np

from pinecone import Pinecone
from dotenv import load_dotenv
from configs.tables import INDEXES

load_dotenv()

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

def get_default_index(index_name="test-api"):
    index = pc.Index(index_name)

    return index

def get_specific_index(index_name):
    index = pc.Index(index_name)

    return index

def get_all_indexes():
    return pc.list_indexes()

def get_indexes_name():
    indexes = [x for x in INDEXES]
    print(indexes)
    return indexes

def get_ids_from_query(index_name):
    namespace = ""
    num_dimensions = 1536
    index = pc.Index(index_name)
    num_vectors = index.describe_index_stats()
    num_vectors = num_vectors.namespaces[namespace].vector_count
    input_vector = np.random.rand(num_dimensions).tolist()
    results = index.query(
        top_k=10000,
        include_values=False,
        include_metadata=True,
        vector=input_vector,
    )
    return results

# def get_all_ids_from_index(index_name):
#     namespace = ""
#     num_dimensions = 1536
#     index = pc.Index(index_name)
#     num_vectors = index.describe_index_stats()
#     num_vectors = num_vectors.namespaces[namespace].vector_count
#     all_ids = []
#     while len(all_ids) < num_vectors:
#         print("Length of ids list is shorter than the number of total vectors...")
#         input_vector = np.random.rand(num_dimensions).tolist()
#         print("creating random vector...")
#         ids = get_ids_from_query(index,input_vector)
#         print("getting ids from a vector query...")
#         all_ids.update(ids)
#         print("updating ids set...")
#         print(f"Collected {len(all_ids)} ids out of {num_vectors}.")
#     print(list(all_ids))
#     res = index.fetch(list(all_ids))
#     return res