# LunaAI

## LunaAI, a Multi-Lingual Voice Agent that engages in conversation, answering queries with ease and with accuracy and provide call specialists with a dashboard to consolidate info.

# Built With
- Frontend
  - Next.js
  - Tailwind CSS
- Backend
  - Twiml
  - Amazon Polly
  - FastAPI
  - Pinecone
  - OpenAI
 
## Inspiration
- We realised that a lot of our elderly folks including our grandparents either struggled with English or struggled with finding information on the internet due to not being tech savvy and would much prefer to chat rather than type. This issue is echoed by the Singapore government as seen in this [article](https://www.straitstimes.com/singapore/mps-size-up-communication-challenge-including-language-barrier-and-explaining-schemes)

- Furthermore, one of our teammates previously worked at a call center, and felt that a lot of the questions asked were slight variations of each other.

## What it does
- Hence we came up with LunaAI, a Multi-Lingual Voice Agent that engages in conversation, answering queries with ease and with accuracy. 

- Furthermore, we also aim to improve the experience of the customer support agent by providing them a simple-to-use dashboard to track the calls made by Luna as well as see the customers that require additional help.

## How we built it
- For the queries we employed performed a semantic search between the user queries and our vector knowledge base. Our knowledge was created by upserting vectorized data scrapped from CPF's website. Then we will use GPT4 as the generator to generate a meaningful answer based on the top 3 documents. This ensures that the information produced is accurate as we only generate answers based on the documents provided.

- we built a FastAPI backend that performs CRUD operations on our pinecone vector database deployed on AWS. The backend was deployed with a public URL which is called by our Twilio serverless functions that handles the logic to handle the phone calls. 

- Our frontend was built with Next.js and our data was scraped from CPF's website and upserted into our vector database

- For Speech-To-Text and Text-To-Speech functionalities, we integrated TwiML's conversational model. Additionally, for an engaging voice experience, we employed Amazon Polly's Neural Voices.

## Challenges we ran into
- Voice Agents was quite a new concept for us as we had to learn how to integrate and deploy server-less functions.
- Research also had to be done on the Retrieval Augmented Generation workflow to retrieve embeddings from our vector database based on user queries.
- Furthermore, as TwiML was quite a niche technology, a lot of research had to be done beforehand.
- Scraping and choosing the appropriate information to embed in the knowledge base was quite a technical challenge as there was a lot of information that would not be useful in the answer.

## Accomplishments that we're proud of
- A key highlight of our project is our voice agent support for the 4 main languages in Singapore, English, Chinese, Malay, and Tamil.

-  Our voice agent can accept user input in any of these 4 languages and return an output in the same language asked. This lets us achieve our goal of helping elderlies in Singapore who are usually more comfortable speaking in their mother tongues.

- A common problem when dealing with large language models is often hallucinations, where the model produces incorrect information, hence we combatted this by employing Retrieval Augmented Generation (RAG) where we only answer the queries based on the documents uploaded by the call center professional.

- Moreover, we were able to use Amazon's poly neural voices to generate outputs in the native tongue of each language, ensuring the understandability of our chatbot's responses for our audience

## What we learned
- We at first wanted to dive straight into the implementation of building a voice agent for NUS-related information at first, however, we realized that the voice agent may not be as applicable for NUS Students as pre-university students are usually tech-savvy and would rather use a chatbot version rather than a voice agent. 

- Hence we decided to think about problems that were more relatable and quickly realised that the elderly would better benefit from such a voice agent. Hence our main learning point was to think of the problem that you are trying to solve rather than just be solely excited about the technology.


# Acknowledgements
- [Ryan Loh](https://github.com/ryanlohyr)
- [Benjamin Toh](https://github.com/bentohset)
- [Ching Ming Yuan](https://github.com/mingyuanc)
- [Yong Khee Hou](https://github.com/yongkheehou)
