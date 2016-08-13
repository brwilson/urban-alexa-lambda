
module.exports = (title, output, repromptText, shouldEnd) => {
    var response = {},
        makeOutputSpeech = (input) => {
            if (output.match(/\<phoneme/) != null) {
                return {
                    type: 'SSML',
                    ssml: output
                }
            } else {
                return {
                    type: 'PlainText',
                    text: output
                }
            }
        }

    response.card = {
        type: 'Simple',
        title: 'SessionSpeechlet - ' + title,
        content: 'SessionSpeechlet - ' + output
    }

    response.outputSpeech = makeOutputSpeech(output)
    response.reprompt = makeOutputSpeech(repromptText)

    response.shouldEndSession = shouldEnd

    return {
        version: '1.0',
        sessionAttributes: {},
        response: response
    }
}
