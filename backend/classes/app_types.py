from pydantic import BaseModel
from typing import List


class CreateIndex(BaseModel):
  index_name: str

class Upsert(BaseModel):
  data_arr: List = [
    {
      "id": int,
      "content": str,
      "metadata": {
        "header": str
      }

    }
  ]
