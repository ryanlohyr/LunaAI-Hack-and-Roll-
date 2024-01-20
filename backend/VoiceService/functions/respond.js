// Import the OpenAI module
const { OpenAI } = require("openai");

// Define the main function for handling requests
exports.handler = async function (context, event, callback) {
    // Set up the OpenAI API with the API key from your environment variables
    const openai = new OpenAI({
        apiKey: context.OPENAI_API_KEY,
    });

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
    conversation.push({ role: 'user', content: voiceInput });

    // Get the AI's response based on the conversation history
    const aiResponse = await createChatCompletion(conversation);
    // const aiResponse = "春天的花园里，五彩缤纷的花朵争相绽放，吸引了许多蜜蜂和蝴蝶来访，整个场景充满了生机和希望。"




    // Add the AI's response to the conversation history
    //   conversation.push(aiResponse);
    conversation.push({ role: 'system', content: aiResponse });

    // Limit the conversation history to the last 20 messages; you can increase this if you want but keeping things short for this demonstration improves performance
    while (conversation.length > 20) {
        conversation.shift();
    }

    // // Generate some <Say> TwiML using the cleaned up AI response
    // twiml.say({
    //     voice: "Polly.Joanna-Neural",
    // },
    //     aiResponse
    // );

    // Generate some <Say> TwiML using the cleaned up AI response
    twiml.say({
        voice: "Polly.Zhiyu-Neural",
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
    async function createChatCompletion(conversation) {
        try {
            const messages = conversation.map(
                x.content
            )

            // combine the content of the conversation messages into a string
            combined_messages = messages.join("\n")

            let pineconeResponse

            // call pinecone to find the most relevant documents 
            $.ajax({
                type: "POST",
                url: "/query_pinecone.py",
                data: { question: combined_messages },
                success: (response) => pineconeResponse = response
            });

            const prompt = `
                Answer the question based on the given context only. Append at the end of your answer the following message: "This is from Pinecone!"

                ###
                    ${pineconeResponse}
                ###

                ${messages[messages.length - 1]}
            `

            // Define system messages to model the AI
            const systemMessages = [{
                role: "system",
                content: 'You are a customer service chatbot for NUS, Answer the question based on the context'
            },
            {
                role: "user",
                content: 'We are having a casual conversation over the telephone so please provide engaging but concise responses.'
            },
            ];

            // update the last message to be the formatted prompt
            conversation[conversation.length-1].content = prompt

            // caveat that we need to account for token limit when feeding into the gpt model (edge case of too long chat history)
            inputMessages = systemMessages.concat(conversation);

            const chatCompletion = await openai.chat.completions.create({
                messages: inputMessages,
                model: 'gpt-3.5-turbo',
                temperature: 0.8, // Controls the randomness of the generated responses. Higher values (e.g., 1.0) make the output more random and creative, while lower values (e.g., 0.2) make it more focused and deterministic. You can adjust the temperature based on your desired level of creativity and exploration.
                max_tokens: 100, // You can adjust this number to control the length of the generated responses. Keep in mind that setting max_tokens too low might result in responses that are cut off and don't make sense.
                top_p: 0.9, // Set the top_p value to around 0.9 to keep the generated responses focused on the most probable tokens without completely eliminating creativity. Adjust the value based on the desired level of exploration.
                n: 1, // Specifies the number of completions you want the model to generate. Generating multiple completions will increase the time it takes to receive the responses.
            });
            return chatCompletion.choices[0].message.content;

        } catch (error) {
            console.error("Error during OpenAI API request:", error);
            throw error;
        }
    }
}
