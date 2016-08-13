var assert = require('assert'),
    uncensor = require('../src/alexa_ssml.js'),
    phonemeMap = {
        "bullshit"      : ["ˈbʊlˌʃɪt", "bullsheet"],
        "fuck"          : ["ˈfʌk", "fork"],
        "fucked"        : ["ˈfʌkd", "forked"],
        "fucker"        : ["ˈfʌkər", "forka"],
        "fucking"       : ["ˈfʌkɪŋ", "forking"],
        "shit"          : ["ˈʃɪt", "sheet"],
        "shitbag"       : ["ˈʃɪtˌbæg", "sheetbag"],
        "cock"          : ["ˈkɒk", "cawk"]
    };

describe('alexa_cuss', () => {
    describe('uncensor', () => {
        it('should ignore non-swear words', () => {
            assert.equal(
                uncensor('oh hello', {}),
                'oh hello'
            )
        })
        it('should map words found in the phoneme map to SSML', () => {
            assert.equal(
                uncensor('shit', phonemeMap),
                "<phoneme alphabet='ipa' ph='ˈʃɪt'>sheet</phoneme>"
            )
        })
        it('should mix and match mapped words and non mapped words', () => {
            assert.equal(
                uncensor('unrelenting shitbag', phonemeMap),
                "unrelenting <phoneme alphabet='ipa' ph='ˈʃɪtˌbæg'>sheetbag</phoneme>"
            )
        })
        it('should map words against non-word boundaries', () => {
            assert.equal(
                uncensor('get fucked!', phonemeMap),
                "get <phoneme alphabet='ipa' ph='ˈfʌkd'>forked</phoneme>!"
            )
            assert.equal(
                uncensor('this work is fucking bullshit, they\'re all assholes', phonemeMap),
                "this work is <phoneme alphabet='ipa' ph='ˈfʌkɪŋ'>forking</phoneme> <phoneme alphabet='ipa' ph='ˈbʊlˌʃɪt'>bullsheet</phoneme>, they're all assholes"
            )
        })
    })
})