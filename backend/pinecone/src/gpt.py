import openai
from os import environ
from dotenv import load_dotenv
import json
from configs.models import GPT_4

load_dotenv()

openai.api_key = environ.get("OPENAI_API_KEY")


def generateSummary(context, response):
    prompt = f"""
      Here is a sample call logs by a customer service agent. 
      
      ###
      {context} 
      ###

      Please summarize the above call logs within 300 words.
    """

    call_logs_summary = openai.ChatCompletion.create(
        model=GPT_4,
        messages=[{"role": "user", "content": prompt}],
        temperature=1,
        max_tokens=2000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )
    text = call_logs_summary.choices[0].message.content
    print(text)

    try:
        return json.loads(text)
    except:
        return json.loads({"data": "error, please try again"})


def generateSummaryTwo(context, response):
    prompt = f"""
      Here is a sample call logs by a customer service agent. 
      
      ###
      {context} 
      ###

      Please summarize the above call logs within 50 words.
      Give the summary in English. Make sure that the summary is strictly only about CPF.
    """

    call_logs_summary = openai.ChatCompletion.create(
        model=GPT_4,
        messages=[{"role": "user", "content": prompt}],
        temperature=1,
        max_tokens=2000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )
    text = call_logs_summary.choices[0].message.content
    print(text)

    return text
