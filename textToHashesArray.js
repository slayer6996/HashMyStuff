//translating the text into an array of words
//each word is an element of the array

module.exports.textToHashes= function(textFromUser){
    const hashesArray=textFromUser.split(" ")
    return hashesArray
}