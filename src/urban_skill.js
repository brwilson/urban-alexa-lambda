var urban = require('urban'),
    uncensor = require('./alexa_ssml.js'),
    AlexaSkill = require('./alexa_skill.js'),
    buildResponse = require('./alexa_response.js'),
    phonemeMap = require('../words.js')

function UrbanDictionarySkill() { }

UrbanDictionarySkill.prototype = new AlexaSkill()
UrbanDictionarySkill.prototype.constructor = UrbanDictionarySkill

/*
 * json.definition, json.word, json.example
 */
UrbanDictionarySkill.prototype.onIntent = (request, session, context) => {
    if (request.intent.name == 'GetRandomTerm') {
        urban.random().first((json) => {
            console.log(`Random: ${json.word}`)

            response = buildResponse(
                `Random Urban Dictionary Word: ${json.word}`,
                `Your random word is "${json.word}": ${uncensor(json.definition, phonemeMap)}. Example: ${uncensor(json.example, phonemeMap)}`,
                null,
                true
            )

            console.log(response)
            context.succeed(response)
        })
    } else if (request.intent.name == 'DefineTerm') {
        var term = request.intent.slots.Term.value
        urban(term).first((json) => {
            if (json == undefined) {
                console.log(`Define: FAILED ${term}`)

                context.succeed(buildResponse(
                    `Urban Dictionary: ${term}`,
                    `I couldn't find the definition of "${term}"`,
                    null,
                    true
                ))
            } else {
                console.log(`Define: FOUND ${term}`)

                response = buildResponse(
                    `Urban Dictionary: ${json.word}`,
                    `Urban Dictionary defines "${json.word}" as: ${uncensor(json.definition, phonemeMap)}. Example: ${uncensor(json.example, phonemeMap)}`,
                    null,
                    true
                )

                console.log(response)
                context.succeed(response)
            }
        })
    }
}

module.exports = UrbanDictionarySkill