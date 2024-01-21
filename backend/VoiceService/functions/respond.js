// Import the OpenAI module
const { OpenAI } = require("openai");
const axios = require('axios');

// Define the main function for handling requests
exports.handler = async function (context, event, callback) {
    // Set up the OpenAI API with the API key from your environment variables
    const openai = new OpenAI({
        apiKey: context.OPENAI_API_KEY,
    });

    // const language = event.language;
    const language = event.request.cookies.languageChosen;
    let voice;

    if (language === "en-US") {
        voice = "Polly.Joanna-Neural"
    } else if (language === "Cmn-Hans-CN") {
        voice = "Polly.Zhiyu-Neural"
    } else if (language === "ta-IN") {
        voice = "Polly.Aditi"
    } else {
        voice = "Polly.Joanna-Neural"
    }

    // Set up the Twilio VoiceResponse object to generate the TwiML
    const twiml = new Twilio.twiml.VoiceResponse();

    // Initiate the Twilio Response object to handle updating the cookie with the chat history
    const response = new Twilio.Response();

    // Parse the cookie value if it exists
    const cookieValue = event.request.cookies.convo;
    const cookieData = cookieValue ? JSON.parse(decodeURIComponent(cookieValue)) : null;

    // Get the user's voice input from the event
    let voiceInput = event.SpeechResult;

    // Create a conversation object to store the dialog and the user's input to the conversation history
    const conversation = cookieData?.conversation || [];
    // conversation.push({ role: 'user', content: voiceInput });

    // Get the AI's response based on the conversation history
    const aiResponse = await createChatCompletion(conversation, voiceInput, event.request.cookies.id);

    // Add the AI's response to the conversation history
    conversation.push({ role: 'system', content: aiResponse });



    // Generate some <Say> TwiML using the cleaned up AI response
    twiml.say({
        voice: voice,
    },
        aiResponse
    );

    // Redirect to the Function where the <Gather> is capturing the caller's speech
    twiml.redirect({
        method: "POST",
    },
        `/processInput`
    );

    // Since we're using the response object to handle cookies we can't 
    // just pass the TwiML straight back to the callback, we need to set the 
    // appropriate header and return the TwiML in the body of the response
    response.appendHeader("Content-Type", "application/xml");
    response.setBody(twiml.toString());

    // Update the conversation history cookie with the response from the OpenAI API
    const newCookieValue = encodeURIComponent(JSON.stringify({
        conversation
    }));
    response.setCookie('convo', newCookieValue, ['Path=/']);

    // Return the response to the handler
    return callback(null, response);


    // Function to create a chat completion using the OpenAI API
    async function createChatCompletion(conversation, voiceInput, id) {
        try {

            // combine the content of the conversation messages into a string
            let pineconeResponse

            // // call pinecone to find the most relevant documents 

            axios.post('https://d4f9-137-132-26-227.ngrok-free.app/query-data', { question: voiceInput, id: id, conversation: conversation })
                .then((response) => {
                    pineconeResponse = response;
                    console.log(pineconeResponse);
                })
                .catch((error) => {
                    pineconeResponse = "Sorry, I don't understand. Please try again.";
                    console.error(error);
                });

            const prompt = `
                Keep the answer and below 40 words. Answer the question and mention the important information in ${language} based on the given context only."
                Do not mention about referring to the website or referring to customer service as this chatbot is suppose to replace them.
                ### Context 
                    ${pineconeResponse}
                ###

                ${voiceInput}
            `

            let conversationCopy = [...conversation]; // Using spread operator

            conversation.push({ role: 'user', content: voiceInput });

            conversationCopy.push({ role: 'user', content: prompt });

            // Define system messages to model the AI
            const systemMessages = [{
                role: "system",
                content: `You are a customer service chatbot that will respond in ${language} for only and only the  Singapore's Central Provisional Fund (CPF), Answer the question based on the context`
            },
            {
                role: "user",
                content: 'We are having a casual conversation over the telephone so please provide engaging but concise responses.'
            },
            ];

            // caveat that we need to account for token limit when feeding into the gpt model (edge case of too long chat history)
            inputMessages = systemMessages.concat(conversationCopy);

            const chatCompletion = await openai.chat.completions.create({
                messages: inputMessages,
                model: 'gpt-3.5-turbo',
                temperature: 0.8, // Controls the randomness of the generated responses. Higher values (e.g., 1.0) make the output more random and creative, while lower values (e.g., 0.2) make it more focused and deterministic. You can adjust the temperature based on your desired level of creativity and exploration.
                max_tokens: 100, // You can adjust this number to control the length of the generated responses. Keep in mind that setting max_tokens too low might result in responses that are cut off and don't make sense.
                top_p: 0.9, // Set the top_p value to around 0.9 to keep the generated responses focused on the most probable tokens without completely eliminating creativity. Adjust the value based on the desired level of exploration.
                n: 1, // Specifies the number of completions you want the model to generate. Generating multiple completions will increase the time it takes to receive the responses.
            });

            aiAnswer = chatCompletion.choices[0].message.content

            // axios.post('https://d4f9-137-132-26-227.ngrok-free.app/post-call-logs', { id: event.id, content: [...conversation, { role: 'system', content: aiAnswer }] })
            //     .then((response) => {
            //         console.log(pineconeResponse);
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });

            return aiAnswer;

        } catch (error) {
            console.error("Error during OpenAI API request:", error);
            throw error;
        }
    }
}
