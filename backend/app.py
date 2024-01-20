import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from vector_database.retrieve import get_context
# from vector_database.get_output import get_model_output
from classes.exception_types import PromptTooLong
# from utils.calculations import count_tokens
from vector_database.db import upsert_vectors
from pinecone import Pinecone, PodSpec
from classes.app_types import CreateIndex, Upsert, Query
import uvicorn
from vector_database.index import get_default_index
from vector_database.db import upsert_vectors
from configs.tables import INDEXES, INDEXES_TO_CREATE

logging.basicConfig(level=logging.DEBUG)
load_dotenv()

app = FastAPI()
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = get_default_index()

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Microservice!"}

# creating a new pinecone index (feed in index name as argument)
@app.post("/create-index")
def create_index(index: CreateIndex):
    index.create_index(
        name=index.index_name,
        dimension=1536,  # standard for OpenAI Ada embedding
        metric="cosine",
        spec=PodSpec(environment="us-west1-gcp", pod_type="p1.x1")
    )

# creating all the default indexes
@app.post("/create-all-indexes")
def create_index():
    index_list = [x["name"] for x in pc.list_indexes()]
    # print(index_list)
    for i in INDEXES_TO_CREATE:
        if i not in index_list:
            pc.create_index(
                name=i,
                dimension=1536,  # standard for OpenAI Ada embedding
                metric="cosine",
                spec=PodSpec(environment="us-west1-gcp", pod_type="p1.x1")
            )

# upserting data into pinecone
@app.post("/upsert-vectors")
def upsert(data: Upsert):
    return upsert_vectors(data)

import logging
import json

def read_json(file):
    try:
        print('Reading from input')
        with open(file, 'r') as f:
            return json.load(f)
    except Exception as e:
        raise e

@app.post("/upsert-sample-data")
def upsert_sample_data():
    file_paths = [
        "./data/Overview.json",
        "./data/CpfContributionEmployee.json",
        "./data/CpfContributionSelfEmployed.json"
    ]

    for i in range(len(file_paths)):
        dict = read_json(file_paths[i])
        upsert_vectors(dict, INDEXES[i])

@app.post("/query-data")
def query(query: Query):
    return get_context(query.question)

@app.get("/get-sample-call-logs")
def get_sample_call_logs():
    # 1 object represents 1 call
    return [
        {
            "metadata": [ # 1 object represents 1 message in the call
                {
                    "id": "1",
                    "role": "system",
                    "content": "xyz_1"
                },
                {
                    "id": "2",
                    "role": "user",
                    "content": "xyz_2"
                },
                {
                    "id": "3",
                    "role": "system",
                    "content": "xyz_3"
                },
                {
                    "id": "4",
                    "role": "user",
                    "content": "xyz_4"
                }
            ]
        },
        {
            "metadata": [ # 1 object represents 1 message in the call
                {
                    "id": "1",
                    "role": "system",
                    "content": "xyz_1"
                },
                {
                    "id": "2",
                    "role": "user",
                    "content": "xyz_2"
                },
                {
                    "id": "3",
                    "role": "system",
                    "content": "xyz_3"
                },
                {
                    "id": "4",
                    "role": "user",
                    "content": "xyz_4"
                }
            ]
        },
        {
            "metadata": [ # 1 object represents 1 message in the call
                {
                    "id": "1",
                    "role": "system",
                    "content": "xyz_1"
                },
                {
                    "id": "2",
                    "role": "user",
                    "content": "xyz_2"
                },
                {
                    "id": "3",
                    "role": "system",
                    "content": "xyz_3"
                },
                {
                    "id": "4",
                    "role": "user",
                    "content": "xyz_4"
                }
            ]
        }
    ]

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
