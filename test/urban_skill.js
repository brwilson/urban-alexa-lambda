var assert = require('assert'),
    sinon = require('sinon'),
    buildResponse = require('../src/alexa_response.js')

describe('alexa_response', () => {
    describe('build response', () => {
        it('should return a text response given a text-only answer', () => {
            var response = buildResponse(
                'Testing',
                'The quick brown fox.',
                null,
                true
            )

            assert.equal(
                response.response.outputSpeech.type,
                'PlainText'
            )

            assert.equal(
                response.response.outputSpeech.text,
                'The quick brown fox.'
            )
        })

        it('should return a SSML response given a SSML answer', () => {
            var response = buildResponse(
                'Testing',
                'Aww <phoneme alphabet=\'ipa\' ph=\'ˈʃɪt\'>sheet</phoneme>!',
                null,
                true
            )

            assert.equal(
                response.response.outputSpeech.type,
                'SSML'
            )

            assert.equal(
                response.response.outputSpeech.ssml,
                '<speak>Aww <phoneme alphabet=\'ipa\' ph=\'ˈʃɪt\'>sheet</phoneme>!</speak>'
            )
        })
    })
})
