from pydantic import BaseModel
from typing import List


class CreateIndex(BaseModel):
    index_name: str


class Upsert(BaseModel):
    data_arr: List = [
        {"id": str, "content": str, "metadata": {"header": str, "content": str}}
    ]


class Query(BaseModel):
    question: str


class UpdateModel(BaseModel):
    index_name: str
    id: str
    data: str
