async function validateWithGemini(currentWord, enteredWord) {
    try {
        const prompt = `
You are a validator for a word game.

Rules:
1. The phrase formed by combining the current word and the entered word must be a natural English phrase.
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
    "reason": "NOT_NATURAL_PHRASE"
}

Current word: "${currentWord}"
Entered word: "${enteredWord}"
`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        let text = data.candidates[0].content.parts[0].text;

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(text);

    } catch (error) {
        console.error(error);

        return {
            valid: false,
            reason: "Unable to validate. Please try again."
        };
    }
}
