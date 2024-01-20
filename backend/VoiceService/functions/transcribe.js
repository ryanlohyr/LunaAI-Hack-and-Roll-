const { v4: uuidv4 } = require('uuid');

exports.handler = function (context, event, callback) {
    // Create a TwiML Voice Response object to build the response
    const twiml = new Twilio.twiml.VoiceResponse();

    // If no previous conversation is present, or if the conversation is empty, start the conversation
    if (!event.request.cookies.convo) {
        // Greet the user with a message using AWS Polly Neural voice
        twiml.play('https://ryanloh.vercel.app/nova.mp3');

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
