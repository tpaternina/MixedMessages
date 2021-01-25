/**
 * First Portfolio project
 * Mixed Messages: 
 * Returns a randomized inspirational quote everytime it runs.
 * The quote components were inspired by the inspirational quotes in: 
 * http://www.positivityblog.com/quotes-on-education/
 */

// Use fs to read files as input
const fs = require('fs');
// Use lodash to manipulate string
const _ = require('lodash');

// Create an object to store the text from each component of the message
const rawText = {
    start: '',
    verbs: '',
    nouns: ''
}

// Read the raw text from each component
rawText.start = fs.readFileSync(__dirname + '/SENTENCE_START.txt', 'utf8');
rawText.verbs = fs.readFileSync(__dirname + '/VERBS.txt', 'utf8');
rawText.nouns = fs.readFileSync(__dirname + '/NOUNS.txt', 'utf8');


// Create an object to store the arrays of each component
const arrays = {
    start: [],
    verbs: [],
    nouns: []
}

for (let key in rawText) {
    arrays[key] = rawText[key].split('\n').filter(s => s !== '');
}

// Turn all elements of each array to lower case
for (let key in arrays) {
    arrays[key] = arrays[key].map(_.toLower);
}

// Capitalize the first letter of the "start" phrase
arrays.start = arrays.start.map(_.capitalize);


// Select random indexes for each component

// the beginning of the sentence
let startIndex = Math.floor(Math.random() * arrays.start.length);

// the first verb
let verb1Index = Math.floor(Math.random() * arrays.verbs.length);
// the second verb, make sure it's not the same as first verb
let verb2Index;
do {
    verb2Index = Math.floor(Math.random() * arrays.verbs.length);
} while (verb2Index === verb1Index);

// the frist noun
let noun1Index = Math.floor(Math.random() * arrays.nouns.length);
// the second noun, make sure it's not the same as first noun
let noun2Index;
do {
    noun2Index = Math.floor(Math.random() * arrays.nouns.length);
} while (noun1Index === noun2Index)

// Pick each element
const theStart = arrays.start[startIndex];
const theVerb1 = arrays.verbs[verb1Index];
const theVerb2 = arrays.verbs[verb2Index];
const theNoun1 = arrays.nouns[noun1Index];
const theNoun2 = arrays.nouns[noun2Index];

// If any of the verbs is `let` add a third verb

function addVerb(otherVerb) {
    let verb = '';
    do {
        let verb3Index = Math.floor(Math.random() * arrays.verbs.length);
        verb = arrays.verbs[verb3Index];
    } while (verb === otherVerb);
    return verb
}

if (theVerb1 === 'let'){
    let theVerb3 = addVerb(theVerb1);
    // modify the noun1
    theNoun1 *= ` ${theVerb3}`
} else if (theVerb2 === 'let') {
    let theVerb3 = addVerb(theVerb2);
    // modify the noun1
    theNoun2 *= ` ${theVerb3}`
}
    

// Assemble the message
const theMessage = `${theStart} ${theVerb1} ${theNoun1}, you ${theVerb2} ${theNoun2}.`

console.log(theMessage);
