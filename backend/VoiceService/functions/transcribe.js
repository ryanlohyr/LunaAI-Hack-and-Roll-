exports.handler = function (context, event, callback) {
    // Create a TwiML Voice Response object to build the response
    const twiml = new Twilio.twiml.VoiceResponse();

    // If no previous conversation is present, or if the conversation is empty, start the conversation
    if (!event.request.cookies.convo) {
        // Greet the user with a message using AWS Polly Neural voice
        twiml.say({
            voice: 'Polly.Joanna-Neural',
        },
            "Hey! I'm Luna, the official hack and roll chatbot. I can help you with any questions you have about the CPF. Press one for English, or two for Chinese."
        );
        // Greet the user with a message using AWS Polly Neural voice
        twiml.say({
            voice: 'Polly.Zhiyu-Neural',
        },
            "你好！我是Luna，官方的Hack and Roll聊天机器人。如果您对CPF有任何疑问，我可以帮助您。按1为英语，或按2为中文。"
        );

        twiml.gather({
            input: 'dtmf', // Specify dtmf as the input type
            numDigits: 1, // Gather 1 digit
            action: '/processInput', // Send the collected input to /processInput 
        });  
    }

    // Listen to the user's speech and pass the input to the /respond Function
    twiml.gather({
        speechTimeout: 'auto', // Automatically determine the end of user speech
        speechModel: 'experimental_conversations', // Use the conversation-based speech recognition model
        input: 'speech', // Specify speech as the input type
        action: '/respond', // Send the collected input to /respond 
    });

    // Create a Twilio Response object
    const response = new Twilio.Response();

    // Set the response content type to XML (TwiML)
    response.appendHeader('Content-Type', 'application/xml');

    // Set the response body to the generated TwiML
    response.setBody(twiml.toString());

    // // If no conversation cookie is present, set an empty conversation cookie
    // if (!event.request.cookies.convo) {
    //     response.setCookie('convo', '', ['Path=/']);
    // }

    // Return the response to Twilio
    return callback(null, response);
};
