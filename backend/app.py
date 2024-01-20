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

logging.basicConfig(level=logging.DEBUG)
load_dotenv()

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Microservice!"}

# @app.get("/")

# @app.exception_handler(PromptTooLong)
# async def prompt_too_long_handler(request: Request, exc: PromptTooLong):
#     return JSONResponse(
#         status_code=400,
#         content={"message": exc.value},
#     )


# @app.post("/get_prompt")
# async def get_prompt(input: Input):
#     prompt_token_length = count_tokens(text=input.prompt, model_name=EMBEDDING_MODEL)[
#         "n_tokens"
#     ]
#     if prompt_token_length > EMBEDDING_TOKEN_LIMIT:
#         raise PromptTooLong(
#             token_limit=EMBEDDING_TOKEN_LIMIT, prompt_token_length=prompt_token_length
#         )

#     try:
#         return await get_completion(input=input)

#     except Exception as e:
#         raise e


# @app.post("/get_completion")
# async def get_completion(input: Input):
#     try:
#         prompt_with_contexts = get_context(
#             prompt=input.prompt, is_sql="SQL" in input.prompt, model_name=GPT_3_dot_5
#         )
#         output = get_model_output(
#             prompt_with_contexts, is_sql="SQL" in input.prompt, model_name=GPT_3_dot_5
#         )
#         return output

#     except Exception as e:
#         raise e


# @app.post("/refresh_vector_db")  # refresh Pinecone by upserting new vectors
# def update_db():
#     upsert_vectors(topics=topic_list)
