
module.exports = (title, output, repromptText, shouldEnd) => {
    var response = {},
        makeOutputSpeech = (input) => {
            if (input.match(/\<phoneme/) != null) {
                return {
                    type: 'SSML',
                    ssml: `<speak>${input}</speak>`
                }
            } else {
                return {
                    type: 'PlainText',
                    text: input
                }
            }
        }

    response.card = {
        type: 'Simple',
        title: title,
        content: output
    }

    response.outputSpeech = makeOutputSpeech(output)

    if (repromptText != null) {
        response.reprompt = makeOutputSpeech(repromptText)
    } else {
        response.reprompt = null
    }

    response.shouldEndSession = shouldEnd

    return {
        version: '1.0',
        sessionAttributes: {},
        response: response
    }
}
