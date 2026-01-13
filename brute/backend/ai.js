/**
 * Asks the Legal AI a question and streams the response to a callback.
 * @param {string} prompt - The user question.
 * @param {function} onChunk - Callback function called for every new word/token.
 */
async function askLegalAI(prompt, onChunk) {
    // UPDATED: Point to your local FastAPI endpoint
    const url = "http://127.0.0.1:5000/api/ask"; 
    
    

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // NOTE: 'Bypass-Tunnel-Reminder' is removed. 
                // Your Python backend handles the upstream connection headers now.
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.body) {
            throw new Error("ReadableStream not supported in this browser.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        // Read the stream chunk by chunk
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Decode the Uint8Array chunk to a string
            const chunk = decoder.decode(value, { stream: true });
            
            // Pass the new text to your UI callback
            onChunk(chunk);
        }
    } catch (error) {
        console.error("Streaming error:", error);
    }
}

export default askLegalAI;