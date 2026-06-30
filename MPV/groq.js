async function validateWithGroq(currentWord, enteredWord) {
    const prompt = `
You are a validator for a word game.

Rules:
1. The two-word combination must be a commonly used English collocation, compound expression, or phrase that a fluent English speaker would naturally recognize.
2. The entered word must be a common English dictionary word.
3. The entered word must not be a proper noun.

Return ONLY a JSON object.

Do NOT use markdown.
Do NOT use markdown code blocks.
Do NOT include any explanation before or after the JSON.
The response must start with { and end with }.

For valid input return:

{
    "valid": true,
    "reason": ""
}

For invalid input return ONE of these reasons exactly:

NOT_NATURAL_PHRASE
NOT_COMMON_WORD
PROPER_NOUN

Example:

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
return JSON.parse(text);
}

