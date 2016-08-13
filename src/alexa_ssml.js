
/**
 * Return SSML for words in a sentence that map to words in the dictionary.
 *
 * The dictionary looks like: { word: [ phoneme, pronounciation ] }
 */
module.exports = (words, phonemeMap) => {
    return words.split(/\s+/)
            .map((word) => { return word.toLowerCase() })
            .map((word) => {
                // Get the word without any special characters
                var wordKey = word.replace(/\W/g, '')

                if (phonemeMap.hasOwnProperty(wordKey)) {
                    // Use replace to preserve any special characters
                    return word.replace(wordKey, `<phoneme alphabet='ipa' ph='${phonemeMap[wordKey][0]}'>${phonemeMap[wordKey][1]}</phoneme>`)
                } else {
                    return word
                }
            })
            .join(' ')
}
