from configs.models import (
    GPT_4,
    complete_gpt_4,
    complete_fine_tune,
)
# from utils.calculations import TokenBuffer
from vector_database.index import get_default_index


index = get_default_index()


# def get_query(prompt, model_name):
#     token_buffer = TokenBuffer(model_name=model_name)
#     token_buffer.update(text=prompt, debug=True)

#     complete = complete_gpt_4 
#     prelim_query = complete(token_buffer.get_buffer())
#     print("prelim query:\n", prelim_query if prelim_query else "nothing returned")

    # query = fix_query(first_check, prelim_query)
    # print("checked prelim query: \n", query)

    # output = query

    # exception, iterations = True, 0

    # while exception:
    #     print("intermediate output: \n", output)
    #     exception, output = test_query(query=output)
    #     iterations += 1

    #     if iterations > 4:
    #         output = mapper.map_string(string=output, input="alias")
    #         print("query mapped back to foodpanda project/ dataset ids")
    #         break

    # if exception:
    #     print(
    #         f"\nPlease manually debug the following error in the query: {exception}\n"
    #     )

    # return prelim_query


# def get_natural_lang(prompt, model_name):
#     token_buffer = TokenBuffer(model_name=model_name)
#     token_buffer.update(text=prompt, debug=True)

#     complete = complete_gpt_4 if model_name == GPT_4 else complete_fine_tune
#     answer = complete(token_buffer.get_buffer())
#     print("answer:\n", answer if answer else "nothing returned")

#     return answer


# def get_model_output(
#     prompt, is_sql, model_name=GPT_4
# ):  # use fine tune model as default
#     return (
#         get_query(prompt, model_name)
#         if is_sql
#         else get_natural_lang(prompt, model_name)
#     )  # noqa: E501
