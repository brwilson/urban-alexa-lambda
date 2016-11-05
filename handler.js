'use strict';

var UrbanDictionarySkill = require('./src/urban_skill.js')

module.exports.urbanAlexa = createHandler(new UrbanDictionarySkill())

function createHandler(skill) {
    return (event, context, callback) => {
        try {
            console.log(`applicationId=${event.session.application.applicationId}`)

            if (event.session.new) {
                skill.startSession(event.request, event.session)
            }

            if (event.request.type === 'LaunchRequest') {
                skill.onLaunch(event.request, event.session, context)
            } else if (event.request.type === 'IntentRequest') {
                skill.onIntent(event.request, event.session, context)
            } else if (event.request.type === 'SessionEndedRequest') {
                skill.endSession(event.request, event.session)
                context.succeed()
            }
        } catch(error) {
            context.fail(`Error: ${error}`)
        }
    }
}
