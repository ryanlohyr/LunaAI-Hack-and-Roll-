from pydantic import BaseModel
from typing import List


class CreateIndex(BaseModel):
    index_name: str


class Upsert(BaseModel):
    data_arr: List = [
        {"id": str, "content": str, "metadata": {"header": str, "content": str}}
    ]


class Conversation(BaseModel):
    role: str
    content: str


class Query(BaseModel):
    question: str
    id: str
    conversation: List[Conversation]


class UpdateModel(BaseModel):
    index_name: str
    id: str
    data: str
    header: str


class UpsertImptInfo(BaseModel):
    data: List = [{"id": str, "metadata": {"header": str, "content": str}}]

class PresetPrompt(BaseModel):
    prompt: str