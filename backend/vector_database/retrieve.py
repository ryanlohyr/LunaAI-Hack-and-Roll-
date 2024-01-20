import openai

from configs.models import (
    EMBEDDING_MODEL,
    FINE_TUNE_BASE_MODEL,
    # generate_natural_lang_boilerplate_start,
    # generate_query_boilerplate_start,
)
from utils.calculations import TokenBuffer
from vector_database.index import get_index

def get_context(prompt: str, model_name=FINE_TUNE_BASE_MODEL):
    full_embedding = openai.Embedding.create(input=[prompt], engine=EMBEDDING_MODEL)

    vectorized_prompt = full_embedding["data"][0]["embedding"]

    index = get_index()

    db_output = index.query(
        vector=vectorized_prompt,
        top_k=3,
        include_metadata=True
    )

    return db_output["matches"]

    contexts = [
        f"""fields in table {x['metadata']['name']}: {x['metadata']['fields']}"""
        for x in db_output["matches"]
    ]

    prompt_start = db_output
    # prompt_start = (
    #     generate_query_boilerplate_start.format(f"({prompt})")
    #     if is_sql
    #     else generate_natural_lang_boilerplate_start.format(f"({prompt})")
    # )

    # append contexts until hitting limit
    token_buffer = TokenBuffer(model_name=model_name)
    token_buffer.update(text=prompt_start, debug=True)
    for context in contexts:
        token_buffer.update(text=context, debug=True)
    token_buffer.update("./n", debug=True)

    return token_buffer.get_buffer()
