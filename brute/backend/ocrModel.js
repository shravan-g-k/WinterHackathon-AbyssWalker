import { OpenAI } from "openai";


const client = new OpenAI({
  apiKey: import.meta.env.VITE_HF_TOKEN,
  baseURL: "https://router.huggingface.co/v1",
  dangerouslyAllowBrowser: true,
});

export async function sendImageAsBase64(imageFile) {
  if (!imageFile.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }

  // 1️⃣ Convert to Base64
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // e.target.result is like "data:image/jpeg;base64,/9j/4AAQ..."
      // We need only the part after "base64,"
      resolve(e.target.result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });

  // 2️⃣ Fixed prompt for text extraction
  const prompt = "Extract all readable text from this image and return as plain text.";

  // 3️⃣ Send to model
  const response = await client.chat.completions.create({
    model: "Qwen/Qwen3-VL-8B-Instruct:novita",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: `data:${imageFile.type};base64,${base64}` } },
        ],
      },
    ],
  });
  console.log(response.choices[0].message.content)
  // 4️⃣ Return the model output
  return response.choices[0].message.content;
}

export async function askLegalAI(prompt, onChunk) {
    const url = "https://your-localtunnel-url.loca.lt/ask"; // Replace with your URL

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // CRITICAL: Tells localtunnel to stop buffering and send data immediately
                "Bypass-Tunnel-Reminder": "true",
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