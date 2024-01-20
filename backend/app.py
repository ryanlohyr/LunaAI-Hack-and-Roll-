import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

# from configs import EMBEDDING_MODEL, EMBEDDING_TOKEN_LIMIT, GPT_3_dot_5
from vector_database.retrieve import get_context
from vector_database.get_output import get_model_output
from classes.exception_types import PromptTooLong
# from src.classes.param_types import Input
from utils.calculations import count_tokens
from vector_database.db import upsert_vectors
from pinecone import Pinecone, PodSpec
from classes.app_types import CreateIndex, Upsert

logging.basicConfig(level=logging.DEBUG)
load_dotenv()

app = FastAPI()
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))


@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Microservice!"}

@app.post("/create-index")
def create_index(index: CreateIndex):
    pc.create_index(
        name=index.index_name,
        dimension=1536,  # standard for OpenAI Ada embedding
        metric="cosine",
        spec=PodSpec(environment="us-west1-gcp", pod_type="p1.x1")
    )

@app.post("upsert-vectors")
def upsert(data: Upsert):
    pc.upsert_vectors(data)
