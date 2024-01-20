import openai

EMBEDDING_MODEL = "text-embedding-ada-002"
GPT_3_dot_5 = "text-davinci-003"
FINE_TUNE_BASE_MODEL = "davinci"
FINE_TUNE_MODEL = "davinci:ft-foodpanda-2023-04-26-08-13-24"

EMBEDDING_TOKEN_LIMIT = 8192
GPT_3_dot_5_CONTEXT_LIMIT = 2500
GPT_3_dot_5_OUTPUT_LIMIT = 1500
FINE_TUNE_CONTEXT_LIMIT = 1150
FINE_TUNE_OUTPUT_LIMIT = 800


def complete_3_dot_5(prompt):
    res = openai.Completion.create(
        engine=GPT_3_dot_5,
        prompt=prompt,
        temperature=0,
        max_tokens=GPT_3_dot_5_OUTPUT_LIMIT,
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
