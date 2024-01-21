// Import the OpenAI module
const { OpenAI } = require("openai");
const { v4: uuidv4 } = require('uuid');

// Define the main function for handling requests
exports.handler = async function (context, event, callback) {
    // console.log("context is ", context);
    // console.log("event is ", event);
    // console.log("callback is ", callback);
    const digit = event.Digits; // Extract the digit from the request

    // Create a new TwiML response based on the input
    const twiml = new Twilio.twiml.VoiceResponse();
    let id = uuidv4();
    let languageChosen;
    if (!event.request.cookies.convo) {
        if (digit === '1') {
            twiml.say({
                voice: 'Polly.Joanna-Neural',
            },
            "You selected English. How can I assist you?"
            );
            languageChosen = "en-US";
        } else if (digit === '2') {
            twiml.say({
                voice: 'Polly.Zhiyu-Neural',
            },
            "您选择了中文。我怎样帮助您？"
            );
            languageChosen = "Cmn-Hans-CN";
        } else if (digit === '3') {
            twiml.say({
                voice: 'Polly.Joanna-Neural',
            },
            "Anda telah memilih Bahasa Melayu, Bagaimana saya boleh membantu anda?"
            );
            languageChosen = "ms-MY";
        } else if (digit === '4') {
            twiml.say({
                voice: 'Polly.Aditi',
            },
            "आपने हिंदी चुनी है। मैं आपकी कैसे सहायता कर सकता हूँ?"
            );
            languageChosen = "ta-IN";
        } else {
            twiml.say("Invalid input. Please try again.");
            // Redirect to the Function where the <Gather> is capturing the caller's speech
            twiml.redirect({
                method: "POST",
            },
                `/transcribe`
            );
        }
    }



     // Listen to the user's speech and pass the input to the /respond Function
     twiml.gather({
        speechTimeout: 'auto', // Automatically determine the end of user speech
        speechModel: 'experimental_conversations', // Use the conversation-based speech recognition model
        input: 'speech', // Specify speech as the input type
        language: languageChosen, // Specify expected languages
        action: `/respond?language=${languageChosen}&id=${id}`, // Send the collected input to /respond 
    });

    // Create a Twilio Response object
    const response = new Twilio.Response();

    // Set the response content type to XML (TwiML)
    response.appendHeader('Content-Type', 'application/xml');

    // Set the response body to the generated TwiML
    response.setBody(twiml.toString());

    // If no conversation cookie is present, set an empty conversation cookie
    if (!event.request.cookies.convo) {
        response.setCookie('convo', '', ['Path=/']);
    }

    if (!event.request.cookies.id) {
        response.setCookie('id',id, ['Path=/']);
    }

    if (!event.request.cookies.languageChosen) {
        response.setCookie('languageChosen',languageChosen, ['Path=/']);
    }






    // Return the response to Twilio
    return callback(null, response);
}
