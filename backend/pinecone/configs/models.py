import openai

EMBEDDING_MODEL = "text-embedding-ada-002"
GPT_4 = "gpt-3.5-turbo"
FINE_TUNE_BASE_MODEL = "davinci"

EMBEDDING_TOKEN_LIMIT = 8192
GPT_4_CONTEXT_LIMIT = 30000
GPT_4_OUTPUT_LIMIT = 15000
FINE_TUNE_CONTEXT_LIMIT = 1150
FINE_TUNE_OUTPUT_LIMIT = 800


def complete_gpt_4(prompt):
    res = openai.Completion.create(
        engine=GPT_4,
        prompt=prompt,
        temperature=0,
        max_tokens=GPT_4_OUTPUT_LIMIT,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None,
        n=1,
        best_of=3,
    )
    return res["choices"][0]["text"].strip()


def complete_fine_tune(prompt):
    res = openai.Completion.create(
        engine=FINE_TUNE_MODEL,
        prompt=prompt,
        temperature=0,
        max_tokens=FINE_TUNE_OUTPUT_LIMIT,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None,
        n=1,
        best_of=3,
    )
    return res["choices"][0]["text"].strip()
