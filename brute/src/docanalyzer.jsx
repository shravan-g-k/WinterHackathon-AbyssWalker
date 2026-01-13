import React, { useState } from 'react';
import { summarizeChat } from '../backend/ai.js';
import { sendImageAsBase64 } from '../backend/ocr.js';
import { 
  CloudUpload, FileText, X, Brain, RotateCcw, FileSearch
} from 'lucide-react';

const Docscan = () => {
  // --- State ---
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState('idle'); 
  const [loadingMessage, setLoadingMessage] = useState('Synthesizing Data...');
  
  // SIMPLE STATE: Just one string for the summary
  const [summary, setSummary] = useState(""); 

  // --- Logic ---
  const startAnalysis = async () => {
    if (!file) return;

    setStatus('loading');
    setLoadingMessage('Initializing OCR engine...');

    try {
      // 1. OCR
      const ocrText = await sendImageAsBase64(file);
      console.log("OCR Text:", ocrText);

      // 2. AI Summary
      setLoadingMessage('Generating summary...');
      const aiResponse = await summarizeChat(ocrText);
      
      console.log("AI Response:", aiResponse);

      // 3. Set the string directly (Simple!)
      if (typeof aiResponse === 'string') {
        setSummary(aiResponse);
      } else if (aiResponse && aiResponse.text) {
        // Fallback if your backend returns an object like { text: "..." }
        setSummary(aiResponse.text);
      } else {
        setSummary(JSON.stringify(aiResponse)); // Last resort fallback
      }
      
      setStatus('results');

    } catch (error) {
      console.error(error);
      setLoadingMessage("Analysis failed.");
      setStatus('error');
    }
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setSummary("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Doc Analyzer</h1>
          <p className="text-slate-500 mt-2">Simple text extraction and summarization.</p>
        </div>
        {status === 'results' && (
          <button onClick={reset} className="flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
            <RotateCcw size={18} /> New Scan
          </button>
        )}
      </div>

      <main>
        {/* Upload Area */}
        {status !== 'results' && status !== 'loading' && (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setFile(e.dataTransfer.files[0]); setIsDragging(false); }}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'}`}
          >
            {!file ? (
              <>
                <CloudUpload className="mx-auto text-slate-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-slate-700">Drop document here</h3>
                <label className="mt-4 inline-block bg-slate-900 text-white px-6 py-3 rounded-xl font-medium cursor-pointer hover:bg-slate-800">
                  Browse Files
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                </label>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <FileText className="text-blue-600" size={48} />
                <span className="font-bold text-lg">{file.name}</span>
                <div className="flex gap-3">
                  <button onClick={() => setFile(null)} className="p-2 text-slate-400 hover:text-red-500"><X /></button>
                  <button onClick={startAnalysis} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700">
                    Analyze Document
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {status === 'loading' && (
          <div className="text-center py-20">
            <Brain className="mx-auto text-blue-600 animate-pulse mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-700">{loadingMessage}</h3>
          </div>
        )}

        {/* Results - JUST THE STRING */}
        {status === 'results' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
                <FileSearch size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Document Summary</h2>
            </div>
            
            {/* THE PLACEHOLDER IS HERE: It simply renders the string */}
            <div className="prose prose-slate max-w-none">
              <p className="whitespace-pre-wrap text-slate-600 leading-relaxed text-lg">
                {summary || "No summary text returned."}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Docscan;