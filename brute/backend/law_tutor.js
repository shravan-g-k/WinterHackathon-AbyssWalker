import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../src/secrets";

const API_KEY =  GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-pro";

/**
 * getJudgeRuling
 * * @param {string} caseContext - The static facts/judgment text of the case.
 * @param {Array} transcriptHistory - Array of message objects: 
 * [
 * { speaker: "AI_LAWYER", text: "Objection, hearsay!" }, 
 * { speaker: "DEFENDANT_USER", text: "I did not say that." },
 * { speaker: "JUDGE", text: "Overruled." }
 * ]
 */
export async function getJudgeRuling(caseContext, transcriptHistory) {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);

        // 1. Convert the Array History into a Script Format
        // This allows the Judge to see exactly WHO said WHAT in the correct order.
        const formattedTranscript = transcriptHistory.map(msg => {
            return `[${msg.speaker}]: ${msg.text}`;
        }).join("\n");

        // 2. Define the JSON Output Schema (Strict Typing)
        const schema = {
            description: "Judicial ruling based on the courtroom transcript",
            type: SchemaType.OBJECT,
            properties: {
                ruling: {
                    type: SchemaType.STRING,
                    description: "The verdict on the latest argument (Sustained, Overruled, Warning, or Info)",
                    enum: ["Sustained", "Overruled", "Warning", "Proceed", "Final Verdict"]
                },
                judge_comment: {
                    type: SchemaType.STRING,
                    description: "What the judge speaks to the court (Voice output). Max 2 sentences.",
                },
                legal_basis: {
                    type: SchemaType.STRING,
                    description: "Reference to the Case Facts or IPC Section used for reasoning.",
                },
                current_winner: {
                    type: SchemaType.STRING,
                    description: "Who is currently winning the argument based on this turn?",
                    enum: ["Prosecution", "Defense", "Neutral"]
                }
            },
            required: ["ruling", "judge_comment", "legal_basis", "current_winner"]
        };

        // 3. Construct the Prompt
        // We treat the Judge as an observer reading the script
        const prompt = `
    ROLE: You are the Presiding Judge of the Supreme Court of India.
    
    === CASE CONTEXT (GROUND TRUTH) ===
    ${caseContext}
    ===================================

    === COURTROOM TRANSCRIPT (LIVE) ===
    ${formattedTranscript}
    ===================================

    INSTRUCTIONS:
    1. Analyze the *last message* in the transcript.
    2. If the AI_LAWYER or DEFENDANT_USER has made a valid legal point based on the Case Context, acknowledge it.
    3. If they are making up facts not in the context, issue a "Warning".
    4. If the argument is getting repetitive, order them to "Proceed".
    5. Output strictly in JSON format.
    `;

        // 4. Call the Model (Stateless Mode)
        // We use generateContent instead of startChat because we are managing history manually.
        const model = genAI.getGenerativeModel({
            model: MODEL_NAME,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.2, // Keep Judge consistent
            }
        });

        const result = await model.generateContent(prompt);

        // 5. Parse and Return
        const responseText = result.response.text();
        return JSON.parse(responseText);

    } catch (error) {
        console.error("AI Judge Service Error:", error);
        return {
            ruling: "Error",
            judge_comment: "The court requests a short recess to review the records (System Error).",
            legal_basis: "N/A",
            current_winner: "Neutral"
        };
    }
}

/**
 * getLawyerArgument
 * @param {string} caseContext - The static facts of the case.
 * @param {Array} transcriptHistory - The full chat history of Judge, User, and AI Lawyer.
 * @param {string} lawyerSide - (Optional) "Prosecution" or "Defense". Default is "Prosecution".
 */
export async function getLawyerArgument(caseContext, transcriptHistory, lawyerSide = "Prosecution") {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);

        // 1. Format the Transcript
        // The lawyer needs to read the room to know if they are winning or losing.
        const formattedTranscript = transcriptHistory.map(msg => {
            return `[${msg.speaker}]: ${msg.text}`;
        }).join("\n");

        // 2. Define the JSON Schema for the Lawyer
        // Unlike the Judge, the Lawyer has "Internal Thoughts" (Strategy) and "External Speech" (Dialogue).
        const schema = {
            description: "AI Lawyer's response to the courtroom events",
            type: SchemaType.OBJECT,
            properties: {
                dialogue: {
                    type: SchemaType.STRING,
                    description: "The actual words spoken to the Judge/User. Max 3 sentences.",
                },
                emotional_tone: {
                    type: SchemaType.STRING,
                    description: "The tone of voice used.",
                    enum: ["Aggressive", "Respectful", "Sarcastic", "Shocked", "Confident"]
                },
                strategic_goal: {
                    type: SchemaType.STRING,
                    description: "Internal logic: Why are you saying this? (e.g., 'To prove dishonest intention')",
                },
                is_objection: {
                    type: SchemaType.BOOLEAN,
                    description: "Set to true if you are objecting to the User's last statement.",
                }
            },
            required: ["dialogue", "emotional_tone", "strategic_goal", "is_objection"]
        };

        // 3. Construct the System Persona
        // This prompt forces the AI to pick apart the User's argument based on the case file.
        const prompt = `
    ROLE: You are the lead ${lawyerSide} Lawyer in the Supreme Court of India.
    OPPONENT: The User (Defense Counsel).
    JUDGE: A neutral AI Justice.

    === CASE FILE (EVIDENCE) ===
    ${caseContext}
    ============================

    === COURTROOM TRANSCRIPT ===
    ${formattedTranscript}
    ============================

    INSTRUCTIONS:
    1. Analyze the User's last argument. Does it contradict the Case File?
    2. If the User lies or misquotes the facts, OBJECTION immediately.
    3. If the User makes a good point, find a loophole or pivot to a different legal section (like Section 415 IPC).
    4. Never admit defeat. Keep the pressure on. 
    5. Be concise. Don't give long speeches.
    
    Output strictly in JSON.
    `;

        // 4. Call the Model
        const model = genAI.getGenerativeModel({
            model: MODEL_NAME,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.7, // Higher temp = more creative/argumentative
            }
        });

        const result = await model.generateContent(prompt);

        // 5. Parse and Return
        const responseText = result.response.text();
        return JSON.parse(responseText);

    } catch (error) {
        console.error("AI Lawyer Service Error:", error);
        return {
            dialogue: "My Lords, I need a moment to review my notes.",
            emotional_tone: "Confused",
            strategic_goal: "Recovering from error",
            is_objection: false
        };
    }
}

/**
 * PROCESSES RAW LEGAL TEXT FOR AI AGENTS
 * This function takes the messy, raw text from a PDF/Text upload
 * and wraps it into a structured "Cognitive Environment" for the AI.
 * * @param {string} rawCaseText - The full text content of the uploaded judgment.
 * @returns {string} A formatted system prompt string ready for Gemini 1.5 Pro.
 */
export function formatCaseDataForSystem(rawCaseText) {

    // 1. Basic Cleaning: Remove multiple spaces, page numbers, or common scanning artifacts
    // (This Regex removes lines that look like "Page 1 of 15" or purely numeric lines)
    const cleanedText = rawCaseText
        .replace(/Page \d+ of \d+/g, "") // Remove page numbers
        .replace(/(\r\n|\n|\r)/gm, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n");    // Remove excessive blank lines

    // 2. Heuristic Extraction: Try to grab the Title/Date (usually at the top)
    const lines = cleanedText.split('\n').slice(0, 10);
    const titleGuess = lines[0] || "Unknown Case";

    // 3. The "Ground Truth" Wrapper
    // We use XML-style tags <CASE_RECORD> because Gemini follows them better than markdown.
    return `
    <SYSTEM_INSTRUCTION_HEADER>
    You are an AI Legal Agent in a simulated Indian Courtroom.
    Below is the OFFICIAL RECORD of the case you are litigating.
    </SYSTEM_INSTRUCTION_HEADER>
  
    <CASE_RECORD>
    ${cleanedText}
    </CASE_RECORD>
  
    <CRITICAL_DIRECTIVES>
    1. **SOURCE OF TRUTH:** You must ONLY use facts explicitly stated in the <CASE_RECORD> above. Do not hallucinate outside details.
    2. **LEGAL PRECEDENCE:** If the judgment mentions specific Acts (like Section 53A Transfer of Property Act or Res Judicata), you must center your arguments/rulings around them.
    3. **CHRONOLOGY:** Pay attention to dates (e.g., Agreement in 1969, Suit in 2006). Time-barred arguments are valid grounds for objection.
    4. **ROLE ADHERENCE:**
       - If you are the **JUDGE**: Uphold the final verdict logic found in the text (e.g., Dismissal due to abuse of process).
       - If you are the **LAWYER**: Use the arguments of the winning side (Respondents) to crush the user, or the losing side (Appellants) to find loopholes, depending on your assignment.
    </CRITICAL_DIRECTIVES>
    `;
}

/**
 * Helper function to extract specific metadata if needed for UI display
 * (Uses simple heuristics, strictly for display, not for AI logic)
 */
export function extractCaseMetadata(rawText) {
    const petitionerMatch = rawText.match(/PETITIONER:\s*(.+)/i);
    const respondentMatch = rawText.match(/RESPONDENT:\s*(.+)/i);
    const dateMatch = rawText.match(/DATE OF JUDGMENT:\s*(.+)/i);

    return {
        petitioner: petitionerMatch ? petitionerMatch[1].trim() : "Unknown",
        respondent: respondentMatch ? respondentMatch[1].trim() : "Unknown",
        date: dateMatch ? dateMatch[1].trim() : "Unknown"
    };
  }

