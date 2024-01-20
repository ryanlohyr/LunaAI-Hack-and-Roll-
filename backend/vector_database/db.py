import os
from time import sleep

import openai
from dotenv import load_dotenv
from tqdm.auto import tqdm

from configs.models import EMBEDDING_MODEL

from .index import get_index

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
embedding_model = EMBEDDING_MODEL


def get_embeddings(data):
    batch_size = 100  # create 100 embeddings at once

    for i in tqdm(range(0, len(data), 100)):  # iterate through all the tables
        i_end = min(len(data), i + batch_size)  # find end of batch
        meta_batch = data[i:i_end]

        ids_batch = [x["id"] for x in meta_batch]

        content_batch = [x["content"] for x in meta_batch]

        metadata_batch = [x["metadata"] for x in meta_batch]

        try:  # create embeddings (try-except added to avoid RateLimitError)
            res = openai.Embedding.create(input=content_batch, engine=embedding_model)
        except Exception:
            done = False
            while not done:
                sleep(5)
                try:
                    res = openai.Embedding.create(
                        input=content_batch, engine=embedding_model
                    )
                    done = True
                except Exception:
                    pass

        embeds = [record["embedding"] for record in res["data"]]

        return list(zip(ids_batch, embeds, metadata_batch))


def upsert_vectors(topics):
    to_upsert = get_embeddings(topics)
    if not to_upsert:
        return

    index = get_index()
    index.upsert(vectors=to_upsert)

    return to_upsert


# if __name__ == "__main__":
#     upsert_vectors(topics=topic_list)