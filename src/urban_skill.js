var urban = require('urban'),
    uncensor = require('./alexa_ssml.js'),
    AlexaSkill = require('./alexa_skill.js'),
    buildResponse = require('./alexa_response.js'),
    remoteWordlist = require('./remote_wordlist.js'),
    URL_HERE = 'http://directive.io/that/collect/words/189f830d3448d8b95436b80e570329c6',
    phonemeMap = require('../words.js')

/*
 * Wrap a call to urban() in a promise and return .first just cuz
 */
function urbanPromise(call) {
    return new Promise((accept, reject) => {
        call.first((json) => {
            if (json == undefined) {
                reject('Error')
            } else {
                accept(json)
            }
        })
    })
}

function debug(call) {
    return (json) => {
        call(json)
        return json
    }
}

function UrbanDictionarySkill() { }

UrbanDictionarySkill.prototype = new AlexaSkill()
UrbanDictionarySkill.prototype.constructor = UrbanDictionarySkill

/*
 * json.definition, json.word, json.example
 */
UrbanDictionarySkill.prototype.onIntent = (request, session, context) => {
    if (request.intent.name == 'GetRandomTerm') {
        console.log('Random Term')

        remoteWordlist(URL_HERE)
            .then((phonemeMap) => {
                urbanPromise(urban.random())
                    .then(debug(console.log))
                    .then((json) => {
                        console.log(`Random: ${json.word}`)
                        return buildResponse(
                            `Random Urban Dictionary Word: ${json.word}`,
                            `Your random word is "${json.word}": ${uncensor(json.definition, phonemeMap)}. Example: ${uncensor(json.example, phonemeMap)}`,
                            `Your random word is "${json.word}": ${json.definition}. Example: ${json.example}`,
                            null,
                            true
                        )
                    })
                    .then(debug(context.succeed))
            })
    } else if (request.intent.name == 'DefineTerm') {
        var term = request.intent.slots.Term.value
        console.log(`Define: ${term}`)

        remoteWordlist(URL_HERE)
            .then((phonemeMap) => {
                urbanPromise(urban(term))
                    .then(debug(console.log))
                    .then((json) => {
                        return buildResponse(
                            `Urban Dictionary: ${json.word}`,
                            `Urban Dictionary defines "${json.word}" as: ${uncensor(json.definition, phonemeMap)}. Example: ${uncensor(json.example, phonemeMap)}`,
                            `Urban Dictionary defines "${json.word}" as: ${json.definition}. Example: ${json.example}`,
                            null,
                            true
                        )
                    })
                    .then(debug(console.log))
                    .then(debug(context.succeed))
                    .catch((error) => {
                        console.log(`Define: FAILED ${term}`)

                        var result = context.succeed(buildResponse(
                            `Urban Dictionary: ${term}`,
                            `I couldn't find the definition of "${term}"`,
                            null,
                            true
                        ))

                        context.succeed(result)
                    })
            })
    }
}

module.exports = UrbanDictionarySkill