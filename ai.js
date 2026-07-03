async function validateWithAI(currentWord, enteredWord) {

    switch (AI_PROVIDER) {

        case "gemini":
            return await validateWithGemini(currentWord, enteredWord);

        case "groq":
            return await validateWithGroq(currentWord, enteredWord);

        default:
            throw new Error("Unknown AI provider");
    }
}

async function validateStartingWord(word) {

    if (AI_PROVIDER === "gemini") {
        return await validateStartingWordGemini(word);
    }

    if (AI_PROVIDER === "groq") {
        return await validateStartingWordGroq(word);
    }

    throw new Error("Unknown AI provider");
}

