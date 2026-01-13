import React, { useState, useEffect, useRef } from 'react';
import { GEMINI_API_KEY } from '../secrets';

/**
 * UTILITY: Converts PCM Base64 from Gemini TTS to a playable WAV URL.
 */
const pcmToWav = (pcmBase64, sampleRate = 24000) => {
    try {
        const binaryString = window.atob(pcmBase64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const wavHeader = new ArrayBuffer(44);
        const view = new DataView(wavHeader);
        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };
        writeString(0, 'RIFF');
        view.setUint32(4, 32 + len, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, len, true);
        const combined = new Uint8Array(wavHeader.byteLength + bytes.byteLength);
        combined.set(new Uint8Array(wavHeader), 0);
        combined.set(bytes, wavHeader.byteLength);
        return URL.createObjectURL(new Blob([combined], { type: 'audio/wav' }));
    } catch (err) {
        console.error("WAV Conversion Error:", err);
        return null;
    }
};

const SpeechBubble = ({ text, role, emotion }) => {
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [text]);

    if (!text) return null;
    return (
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-72 z-[100] animate-in zoom-in-50 fade-in duration-300">
            <div className="bg-white border-2 border-[#005B4B] p-4 rounded-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3)] relative h-32 flex flex-col">
                <div className="absolute -top-2 left-4 bg-[#005B4B] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex gap-2 z-10">
                    <span>{role === 'Judge' ? 'Judge' : role === 'Prosecutor' ? 'Adversary' : 'Your Defense'}</span>
                    <span className="opacity-40">|</span>
                    <span className="text-[#F2F3CC]">{emotion}</span>
                </div>
                <div ref={scrollRef} className="overflow-y-auto pr-1 flex-1 scroll-smooth custom-bubble-scrollbar">
                    <p className="text-sm font-serif italic text-[#005B4B] leading-snug">"{text}"</p>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-[#005B4B] rotate-45" />
            </div>
            <style>{`.custom-bubble-scrollbar::-webkit-scrollbar { width: 3px; } .custom-bubble-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-bubble-scrollbar::-webkit-scrollbar-thumb { background: #005B4B33; border-radius: 10px; }`}</style>
        </div>
    );
};

const AnimatedCharacter = ({ role, isSpeaking, text, emotion = 'neutral', color = '#005B4B' }) => {
    const [blink, setBlink] = useState(false);
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setBlink(true);
            setTimeout(() => setBlink(false), 150);
        }, 4000);
        return () => clearInterval(blinkInterval);
    }, []);

    const getEyebrowPath = (isRight) => {
        const baseLeft = "M 36 35 Q 42 33 48 35";
        const baseRight = "M 52 35 Q 58 33 64 35";
        if (emotion === 'skeptical') return isRight ? "M 52 32 Q 58 30 64 32" : baseLeft;
        if (['impatient', 'intense', 'objection'].includes(emotion)) {
            return isRight ? "M 52 34 Q 58 32 64 35" : "M 36 35 Q 42 32 48 34";
        }
        return isRight ? baseRight : baseLeft;
    };

    const getMouthPath = () => {
        if (!isSpeaking) return "M 46 60 Q 50 61 54 60";
        return emotion === 'objection' ? "M 42 58 Q 50 68 58 58" : "M 42 60 Q 50 65 58 60";
    };

    return (
        <div className={`relative transition-all duration-700 flex flex-col items-center ${isSpeaking ? 'scale-110 z-50' : 'scale-90 opacity-80 z-10'}`}>
            {isSpeaking && <SpeechBubble text={text} role={role} emotion={emotion} />}
            <svg width="130" height="170" viewBox="0 0 100 120" className="drop-shadow-2xl mx-auto overflow-visible">
                <path d="M 12 120 Q 12 75 50 75 Q 88 75 88 120 Z" fill={color} />
                <path d="M 40 75 L 50 100 L 60 75 Z" fill="#F2F2E8" />
                {role === 'Judge' ? (
                    <path d="M 45 75 L 50 92 L 55 75 Z" fill="#FFF" opacity="0.9" />
                ) : (
                    <path d="M 48 75 L 50 96 L 52 75 Z" fill={role === 'Prosecutor' ? '#800' : '#005B4B'} />
                )}
                <g>
                    <circle cx="31" cy="45" r="3.5" fill="#FFC991" />
                    <circle cx="69" cy="45" r="3.5" fill="#FFC991" />
                    <path d="M 28 40 Q 28 15 50 15 Q 72 15 72 40 L 72 45 L 28 45 Z" fill="#222" />
                    <path d="M 32 30 Q 32 68 50 68 Q 68 68 68 30 Z" fill="#FFDBAC" />
                    <g>
                        {!blink ? (
                            <>
                                <circle cx="42" cy="46" r="2.5" fill="#111" />
                                <circle cx="58" cy="46" r="2.5" fill="#111" />
                                <circle cx="43" cy="45" r="0.8" fill="white" />
                                <circle cx="59" cy="45" r="0.8" fill="white" />
                            </>
                        ) : (
                            <>
                                <path d="M 39 46 Q 42 45 45 46" stroke="#111" strokeWidth="2" fill="none" />
                                <path d="M 55 46 Q 58 45 61 46" stroke="#111" strokeWidth="2" fill="none" />
                            </>
                        )}
                    </g>
                    <path d={getEyebrowPath(false)} stroke="#111" fill="none" strokeWidth="2" strokeLinecap="round" />
                    <path d={getEyebrowPath(true)} stroke="#111" fill="none" strokeWidth="2" strokeLinecap="round" />
                    <path d={getMouthPath()} stroke="#600" strokeWidth="2" fill={isSpeaking ? "#300" : "none"} className={isSpeaking ? "animate-pulse" : ""} />
                </g>
            </svg>
            <div className={`mt-3 px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] text-center border-2 shadow-md transition-all duration-300 ${isSpeaking ? 'bg-[#005B4B] text-[#F2F3CC] border-[#005B4B] -translate-y-1' : 'bg-white text-[#BABAB0] border-[#F2F2E8]'}`}>
                {role === 'Defense' ? 'Your Defense' : role === 'Prosecutor' ? 'Adversary' : 'Judge'}
            </div>
        </div>
    );
};

export default function VirtualCourtroom() {
    const apiKey = GEMINI_API_KEY; // Handled by environment
    const [caseDescription, setCaseDescription] = useState('');
    const [currentStep, setCurrentStep] = useState('input');
    const [history, setHistory] = useState([]);
    const [activeDialogue, setActiveDialogue] = useState([]);
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(-1);
    const [verdictData, setVerdictData] = useState(null);
    const [displayedText, setDisplayedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [emotion, setEmotion] = useState('neutral');
    const [userInput, setUserInput] = useState('');
    const [isWaitingForUser, setIsWaitingForUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const audioRef = useRef(null);

    const fetchWithRetry = async (url, options, retries = 5) => {
        for (let i = 0; i < retries; i++) {
            try {
                const res = await fetch(url, options);
                if (res.ok) return await res.json();
                if (res.status >= 400 && res.status < 500) {
                    const errData = await res.json();
                    throw new Error(errData.error?.message || `Request failed with status ${res.status}`);
                }
            } catch (e) {
                if (i === retries - 1) throw e;
            }
            await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
        }
    };

    const getVoiceForRole = (role) => {
        switch (role) {
            case 'Judge': return { voiceName: 'Charon', style: 'authoritative, deep' };
            case 'Prosecutor': return { voiceName: 'Fenrir', style: 'aggressive, human' };
            case 'Defense': return { voiceName: 'Kore', style: 'clear, helpful' };
            default: return { voiceName: 'Aoede', style: 'neutral' };
        }
    };

    const prepareAudio = async (line) => {
        const { voiceName, style } = getVoiceForRole(line.role);
        try {
            const result = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "gemini-2.5-flash-preview-tts",
                    contents: [{ parts: [{ text: `Say in a ${style} tone: ${line.text}` }] }],
                    generationConfig: {
                        responseModalities: ["AUDIO"],
                        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } }
                    }
                })
            });
            const pcmData = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            return pcmData ? pcmToWav(pcmData) : null;
        } catch (e) { return null; }
    };

    const runSimulation = async () => {
        if (!caseDescription.trim()) return;
        setLoading(true);
        setErrorMessage('');
        const systemPrompt = `Start a courtroom trial based on the case description provided. The user is the Defense. Generate initial opening lines from the Judge and Prosecutor. Format JSON: { "session": [{"role": "Judge"|"Prosecutor", "text": "...", "emotion": "..."}] }`;
        try {
            const data = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `Case: ${caseDescription}` }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                    generationConfig: { responseMimeType: "application/json" }
                })
            });
            const result = JSON.parse(data.candidates[0].content.parts[0].text);
            const newLines = result.session;
            setHistory(newLines);
            setActiveDialogue(newLines);
            setCurrentStep('simulating');
            playLines(newLines);
        } catch (e) {
            setErrorMessage(`Failed to start trial: ${e.message}. Please check your API key.`);
            console.error(e);
        }
        setLoading(false);
    };

    const submitDefense = async () => {
        if (!userInput.trim()) return;
        setIsWaitingForUser(false);
        setLoading(true);
        const userLine = { role: "Defense", text: userInput, emotion: "intense" };
        setActiveDialogue([userLine]);
        await playLines([userLine]);
        const systemPrompt = `Continue the courtroom drama. The user just said: "${userInput}". Generate 2-3 responses from the Prosecutor or Judge. If the trial should conclude, provide a final "verdict". Format JSON: { "session": [{"role": "Judge"|"Prosecutor", "text": "...", "emotion": "..."}], "verdict": null | { "winner": "...", "summary": "...", "winProbability": 75 } }`;
        try {
            const data = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `Case: ${caseDescription}. History: ${JSON.stringify([...history, userLine])}` }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                    generationConfig: { responseMimeType: "application/json" }
                })
            });
            const result = JSON.parse(data.candidates[0].content.parts[0].text);
            setHistory(h => [...h, userLine, ...result.session]);
            setActiveDialogue(result.session);
            if (result.verdict) {
                await playLines(result.session);
                setVerdictData(result.verdict);
                setTimeout(() => setCurrentStep('results'), 1000);
            } else {
                await playLines(result.session);
            }
        } catch (e) { console.error(e); }
        setLoading(false);
        setUserInput('');
    };

    const playLines = async (lines) => {
        const audioUrls = await Promise.all(lines.map(line => prepareAudio(line)));
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const audioUrl = audioUrls[i];
            setEmotion(line.emotion || 'neutral');
            setCurrentDialogueIndex(i);
            if (audioUrl && audioRef.current) {
                audioRef.current.src = audioUrl;
                const audioP = new Promise(r => {
                    audioRef.current.onended = () => { URL.revokeObjectURL(audioUrl); r(); };
                    audioRef.current.onerror = r;
                    audioRef.current.play().catch(r);
                });
                const typeP = typeText(line.text);
                await Promise.all([audioP, typeP]);
            } else {
                await typeText(line.text);
            }
            await new Promise(r => setTimeout(r, 600));
        }
        const lastRole = lines[lines.length - 1].role;
        if (lastRole !== 'Defense' && !verdictData) setIsWaitingForUser(true);
        setCurrentDialogueIndex(-1);
    };

    const typeText = (text) => {
        return new Promise((resolve) => {
            let i = 0;
            setDisplayedText('');
            const interval = setInterval(() => {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
                if (i >= text.length) { clearInterval(interval); resolve(); }
            }, 30);
        });
    };

    const reset = () => {
        setCurrentStep('input');
        setCaseDescription('');
        setHistory([]);
        setActiveDialogue([]);
        setCurrentDialogueIndex(-1);
        setVerdictData(null);
        setDisplayedText('');
        setIsWaitingForUser(false);
        setErrorMessage('');
    };

    return (
        <div className="w-full h-full min-h-[800px] bg-[#F2F2E8] text-[#005B4B] font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <audio ref={audioRef} className="hidden" />
            <div className={`w-full max-w-6xl bg-white border border-[#BABAB0] rounded-[4rem] shadow-2xl flex flex-col min-h-[750px] relative transition-all ${currentStep === 'simulating' ? 'overflow-visible' : 'overflow-hidden'}`}>
                {currentStep === 'input' && (
                    <div className="flex-1 flex flex-col p-12 items-center justify-center bg-[#F2F3CC]/10 animate-in fade-in duration-700">
                        <div className="w-full max-w-xl text-center">
                            <h1 className="text-3xl font-black uppercase mb-2 tracking-tighter italic">BRUTE AI <span className="font-light opacity-50">COURTROOM</span></h1>
                            <p className="text-[10px] font-black uppercase text-[#BABAB0] tracking-widest mb-10">Simulation Engine v6.2</p>
                            {errorMessage && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 text-sm">
                                    {errorMessage}
                                </div>
                            )}
                            <textarea
                                className="w-full h-44 bg-white border-4 border-[#F2F2E8] rounded-[2.5rem] p-8 focus:border-[#005B4B] transition-all resize-none outline-none text-xl text-[#005B4B] shadow-inner font-serif italic mb-8"
                                placeholder="Describe your legal case..."
                                value={caseDescription}
                                onChange={(e) => setCaseDescription(e.target.value)}
                            />
                            <button
                                onClick={runSimulation}
                                disabled={loading || !caseDescription.trim()}
                                className="w-full bg-[#005B4B] text-[#F2F2E8] font-black py-5 rounded-[2rem] text-xl shadow-2xl hover:brightness-110 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? "DATA ANALYZING..." : "START TRIAL"}
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 'simulating' && (
                    <div className="flex-1 flex flex-col bg-[#F2F2E8] relative rounded-[4rem]">
                        <div className="flex-1 relative flex flex-col justify-between pt-52 pb-24">
                            <div className="flex justify-center">
                                <AnimatedCharacter role="Judge" isSpeaking={currentDialogueIndex !== -1 && activeDialogue[currentDialogueIndex]?.role === 'Judge'} text={currentDialogueIndex !== -1 && activeDialogue[currentDialogueIndex]?.role === 'Judge' ? displayedText : ''} emotion={emotion} color="#111" />
                            </div>
                            <div className="flex justify-around items-end px-12">
                                <AnimatedCharacter role="Prosecutor" isSpeaking={currentDialogueIndex !== -1 && activeDialogue[currentDialogueIndex]?.role === 'Prosecutor'} text={currentDialogueIndex !== -1 && activeDialogue[currentDialogueIndex]?.role === 'Prosecutor' ? displayedText : ''} emotion={emotion} color="#005B4B" />
                                <div className="relative">
                                    <AnimatedCharacter role="Defense" isSpeaking={currentDialogueIndex !== -1 && activeDialogue[currentDialogueIndex]?.role === 'Defense'} text={currentDialogueIndex !== -1 && activeDialogue[currentDialogueIndex]?.role === 'Defense' ? displayedText : ''} emotion={emotion} color="#BABAB0" />
                                    {isWaitingForUser && (
                                        <div className="absolute -top-48 -left-1/2 -right-1/2 flex flex-col items-center animate-in slide-in-from-bottom-6 duration-500 z-[110]">
                                            <div className="bg-white p-6 rounded-[2.5rem] border-4 border-[#005B4B] shadow-2xl w-96">
                                                <label className="text-[10px] font-black uppercase text-[#005B4B] mb-3 block tracking-widest">Awaiting Your Rebuttal</label>
                                                <textarea autoFocus className="w-full h-28 bg-[#F2F2E8]/50 border-2 border-transparent focus:border-[#005B4B] rounded-2xl p-4 text-sm outline-none resize-none font-serif italic text-[#005B4B]" placeholder="Type your defense..." value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitDefense(); } }} />
                                                <button onClick={submitDefense} disabled={loading || !userInput.trim()} className="mt-4 w-full bg-[#005B4B] text-white py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:brightness-125 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                                                    {loading ? "PROCESSING..." : "SUBMIT STATEMENT"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 'results' && verdictData && (
                    <div className="flex-1 p-16 flex flex-col items-center justify-center bg-[#F2F3CC]/20 animate-in fade-in zoom-in-95 duration-1000">
                        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
                            <div className="text-center md:text-left">
                                <h2 className="text-[10px] font-black uppercase text-[#BABAB0] mb-2 tracking-[0.5em]">The Court Ruling</h2>
                                <div className={`text-6xl font-black italic uppercase leading-none mb-6 ${verdictData.winner.includes('Defense') ? 'text-[#005B4B]' : 'text-red-900'}`}>
                                    {verdictData.winner} <br /> Wins
                                </div>
                                <div className="bg-white p-8 rounded-[2rem] border-2 border-[#BABAB0]/20 shadow-xl font-serif italic text-xl text-[#005B4B]">"{verdictData.summary}"</div>
                            </div>
                            <div className="flex flex-col items-center bg-white p-10 rounded-[3rem] border border-[#BABAB0]/20 shadow-2xl">
                                <div className="relative w-56 h-56 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="112" cy="112" r="95" fill="transparent" stroke="#F2F2E8" strokeWidth="18" />
                                        <circle cx="112" cy="112" r="95" fill="transparent" stroke="#005B4B" strokeWidth="18" strokeDasharray={597} strokeDashoffset={597 - (597 * verdictData.winProbability) / 100} strokeLinecap="round" className="transition-all duration-2000 ease-out" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black text-[#005B4B]">{verdictData.winProbability}%</span>
                                        <span className="text-[9px] font-black uppercase text-[#BABAB0] mt-1 tracking-widest">Winning Chance</span>
                                    </div>
                                </div>
                                <button onClick={reset} className="mt-10 bg-[#005B4B] text-[#F2F3CC] px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all">START NEW TRIAL</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}