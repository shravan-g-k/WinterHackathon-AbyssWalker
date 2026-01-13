import React, { useState, useEffect } from 'react';
import { 
  CloudUpload, 
  FileText, 
  X, 
  Brain, 
  Lightbulb, 
  List, 
  RotateCcw,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const Docscan = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | results

  // Mock Data
  const insights = [
    { id: 1, title: "Accelerated Arctic Ice Melting", description: "Arctic sea ice has decreased by 13% per decade since 1979.", tag: "Environmental" },
    { id: 2, title: "Economic Impact on Agriculture", description: "Climate variability has resulted in 20% crop yield reduction.", tag: "Economic" },
    { id: 3, title: "Renewable Energy Growth", description: "Solar and wind energy capacity has increased by 45% globally.", tag: "Technology" },
  ];

  const mainPoints = [
    { id: 1, title: "Global Temperature Rise", desc: "Average global temperatures have increased by 1.2°C.", confidence: "95%" },
    { id: 2, title: "Renewable Energy Transition", desc: "Renewables account for 30% of global electricity.", confidence: "92%" },
  ];

  const startAnalysis = () => {
    setStatus('loading');
    setTimeout(() => setStatus('results'), 2000);
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section (Matching Law Library exactly) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-8 bg-green-600 rounded-full"></span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Doc Analyzer
            </h1>
          </div>
          <p className="text-lg text-slate-500 max-w-lg">
            Upload specialized legal documents to begin extraction of mastery. 
            Our AI models are designed for both beginners and practitioners.
          </p>
        </div>

        {status === 'results' && (
          <div className="hidden md:block">
            <button 
              onClick={reset}
              className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw size={16} className="text-blue-700" />
              <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">New Scan</span>
            </button>
          </div>
        )}
      </div>

      <main className="space-y-8">
        {/* Step 1: Upload Section */}
        {status !== 'results' && (
          <div className={`transition-all duration-500 ${status === 'loading' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
            {!file ? (
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setFile(e.dataTransfer.files[0]); setIsDragging(false); }}
                className={`group bg-white p-16 rounded-3xl border-2 border-dashed transition-all duration-300 text-center
                  ${isDragging ? 'border-blue-500 bg-blue-50 scale-[1.01]' : 'border-slate-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2'}`}
              >
                <div className="w-20 h-20 bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all">
                  <CloudUpload size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Drop document here</h3>
                <p className="text-slate-500 mb-8 text-lg font-medium">Support for PDF, DOCX, or legal reports</p>
                <label className="inline-block px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg cursor-pointer hover:bg-blue-700 transition-all active:scale-95">
                  Browse Files
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                </label>
              </div>
            ) : (
              <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                      <FileText size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{file.name}</h3>
                      <p className="text-blue-100 font-medium">Ready for analysis • {(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <button onClick={() => setFile(null)} className="p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl transition-colors">
                      <X size={24} />
                    </button>
                    <button 
                      onClick={startAnalysis} 
                      className="flex-grow px-10 py-4 bg-white text-blue-700 font-extrabold rounded-2xl shadow-lg hover:bg-blue-50 transition-all active:scale-95"
                    >
                      Start Analysis
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {status === 'loading' && (
          <div className="flex flex-col items-center py-20">
            <div className="relative h-24 w-24 mb-6">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-700" size={36} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Synthesizing Data...</h3>
          </div>
        )}

        {/* Results Grid (Dashboard Style) */}
        {status === 'results' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4">Key Insights</h2>
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div key={insight.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded mb-3 inline-block">{insight.tag}</span>
                    <h3 className="font-bold text-slate-800 mb-2">{insight.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{insight.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4">Summary Points</h2>
              <div className="grid gap-4">
                {mainPoints.map((point, index) => (
                  <div key={index} className="group flex items-center gap-6 bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center font-extrabold text-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-slate-800 text-lg">{point.title}</h3>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                           {point.confidence} Match
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm">{point.desc}</p>
                    </div>
                    <ChevronRight className="text-slate-200 group-hover:text-blue-300 transition-all" size={24} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Docscan;