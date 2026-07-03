async function validateWithGroq(currentWord, enteredWord) {
    const prompt = `
You are validating a two-word English word game.

Your task is to determine whether the two words together form a recognizable English concept, object, place, person, action, event, title, product, organization, technical term, or other standalone entity that a fluent English speaker would naturally recognize.
Accept if the two-word combination is a commonly recognized:

- English collocation
- compound word
- compound noun
- compound adjective
- fixed expression
- idiom
- product name
- brand name
- place name
- organization name
- book, movie, TV show, or song title
- scientific, medical, business, computing, engineering, or sports term
- food name
- or any other expression that a fluent English speaker would naturally recognize.

The entered word must:
- Be a valid English dictionary word.
- Be commonly used in modern English.
- May be singular or plural.
- May be any verb tense.
- May be a widely recognized proper noun if it forms a valid expression with the current word.

Reject if:
- The entered word is not a valid English dictionary word.
- The two words form a random, forced, or unnatural combination.
- The two words form only a grammatical fragment rather than a standalone recognizable expression.
- The expression requires additional surrounding words to sound natural.
- The expression is extremely obscure or unlikely to be recognized by an average fluent English speaker.
- The entered word contains numbers, symbols, punctuation, or spaces.
- The entered word is only a function word (such as an article, conjunction, preposition, or pronoun) unless it is part of a widely recognized standalone expression.

When in doubt, prefer rejecting uncommon or ambiguous expressions over accepting them.

Return ONLY valid JSON.

If valid:

{
    "valid": true,
    "reason": ""
}

If the entered word is invalid:

{
    "valid": false,
    "reason": "NOT_COMMON_WORD"
}

If the phrase is invalid:

{
    "valid": false,
    "reason": "NOT_COMMON_PHRASE"
}

Current word: "${currentWord}"
Entered word: "${enteredWord}"
`;

const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
    model: "llama-3.3-70b-versatile",

    response_format: {
        type: "json_object"
    },

    messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    })
});

if (!response.ok) {
    throw new Error("Groq API request failed");
}
const data = await response.json();

let text = data.choices[0].message.content;

text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
if (!text.startsWith("{")) {
    console.error("Groq returned:", text);

    return {
        valid: false,
        reason: "AI_ERROR"
    };
}

return JSON.parse(text);
}


async function validateStartingWordGroq(word) {

    const prompt = `
You are validating the starting word of an English word game.

Your task is to determine whether the word is a good starting point for building chains of recognizable two-word English concepts.

Accept only if the word:
- Is a valid English dictionary word.
- Is commonly used in modern English.
- Represents a meaningful concept, object, place, person, action, quality, or entity.
- Can naturally combine with many other words to form recognizable two-word concepts or expressions.
- May be singular or plural.
- May be any verb tense if it commonly forms recognizable expressions.
- May be a widely recognized proper noun.

Reject if the word:
- Is only a grammatical or function word (such as an article, conjunction, preposition, pronoun, or auxiliary verb).
- Is not a valid English word.
- Is extremely obscure or unlikely to be recognized by an average fluent English speaker.
- Contains numbers, symbols, punctuation, or spaces.
- Is unlikely to be a useful starting word for building word chains.

When in doubt, prefer rejecting the word.

Return ONLY valid JSON.

If valid:

{
    "valid": true,
    "reason": ""
}

If invalid:

{
    "valid": false,
    "reason": "NOT_GOOD_STARTING_WORD"
}

Word: "${word}"
    `;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
    model: "llama-3.3-70b-versatile",

    response_format: {
        type: "json_object"
    },

    messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    })
});

    if (!response.ok) {
        throw new Error("Groq API request failed");
    }

    const data = await response.json();

    let text = data.choices[0].message.content;

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    if (!text.startsWith("{")) {
        return {
            valid: false,
            reason: "AI_ERROR"
        };
    }

    return JSON.parse(text);
}