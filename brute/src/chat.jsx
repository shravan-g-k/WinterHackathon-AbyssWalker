import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Plus, MessageSquare, User, RotateCcw } from 'lucide-react';
import { runChat } from '../backend/ai'; // Ensure this path is correct

const createInitialBotMessage = () => ({
  id: 'initial',
  text: "Hello! I'm Brute, your AI assistant. I'm here to help you with legal research, contract review, or document summaries. How can I assist you today?",
  isUser: false,
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
});

const Chat = () => {
  // --- States ---
  const [messages, setMessages] = useState([createInitialBotMessage()]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null); // Track the active Firestore Doc
  const [chatHistory, setChatHistory] = useState([
    { id: 101, title: 'Legal Research - Case A', date: 'Today' },
    { id: 102, title: 'Contract Review - Corp X', date: 'Yesterday' },
  ]);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // --- Helpers ---
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // --- Handlers ---
  const handleNewChat = () => {
    if (messages.length > 1) {
      const firstUserMsg = messages.find(m => m.isUser)?.text || "New Conversation";
      const title = firstUserMsg.length > 25 ? firstUserMsg.substring(0, 25) + '...' : firstUserMsg;
      setChatHistory(prev => [{ id: Date.now(), title, date: 'Just now', fullChat: [...messages] }, ...prev]);
    }
    setMessages([createInitialBotMessage()]);
    setInputValue('');
    setCurrentChatId(null); // Reset ID so ai.js knows to create a new document
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // 1. Add User Message to UI
    const userMessage = {
      id: Date.now(),
      text: text,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const botMessageId = Date.now() + 1;
    let accumulatedResponse = "";

    try {
      // 2. Call the AI Backend with Streaming
      // We pass a callback function to handle chunks as they arrive
      const result = await runChat(currentChatId, text, (chunk) => {
        setIsTyping(false); // Stop pulse as soon as first word arrives
        accumulatedResponse += chunk;

        setMessages(prev => {
          const existingMsgIndex = prev.findIndex(m => m.id === botMessageId);
          if (existingMsgIndex !== -1) {
            const updatedMessages = [...prev];
            updatedMessages[existingMsgIndex] = {
              ...updatedMessages[existingMsgIndex],
              text: accumulatedResponse
            };
            return updatedMessages;
          } else {
            return [...prev, {
              id: botMessageId,
              text: accumulatedResponse,
              isUser: false,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            }];
          }
        });
      });

      // 3. Update the Current Chat ID if it was a new session
      if (!currentChatId && result?.newId) {
        setCurrentChatId(result.newId);
      }

    } catch (error) {
      setIsTyping(false);
      console.error("AI Communication Error:", error);
      // Optional: Add an error message to the chat UI here
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-8 bg-emerald-600 rounded-full"></span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">AI Chatbot</h1>
          </div>
          <p className="text-lg text-slate-500 max-w-lg">
            Consult with Brute, your specialized legal AI, for instant analysis 
            on case law, statutes, and document drafting.
          </p>
        </div>

        <button 
          onClick={handleNewChat}
          className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 text-emerald-700 font-bold hover:bg-emerald-50 transition-all active:scale-95"
        >
          <Plus size={18} />
          <span>New Session</span>
        </button>
      </div>

      {/* Main Chat Layout */}
      <div className="flex h-[600px] bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-slate-100 overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-72 bg-slate-50 border-r border-slate-100 hidden lg:flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-white">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <RotateCcw size={14} /> Recent Consultations
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {chatHistory.map(item => (
              <button 
                key={item.id} 
                className="w-full text-left p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all group border border-transparent hover:border-emerald-100"
              >
                <div className="font-bold text-slate-700 group-hover:text-emerald-700 truncate text-sm">{item.title}</div>
                <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{item.date}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm 
                  ${msg.isUser ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-900 text-white'}`}>
                  {msg.isUser ? <User size={20} /> : <MessageSquare size={20} />}
                </div>
                <div className={`max-w-[80%] space-y-1 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${msg.isUser 
                      ? 'bg-emerald-700 text-white rounded-tr-none' 
                      : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'}`}>
                    
                    {/* Markdown-like bolding logic */}
                    {msg.text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="font-black">{part}</strong> : part)}
                    
                    {msg.file && (
                      <div className="mt-3 p-3 bg-black/10 rounded-xl flex items-center gap-3 border border-white/10">
                        <Paperclip size={16} />
                        <span className="text-xs font-bold truncate">{msg.file.name}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{msg.time}</span>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white italic font-serif text-xl">B</div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <footer className="p-6 bg-white border-t border-slate-100">
            <div className="max-w-4xl mx-auto relative group">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              >
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                placeholder="Ask Brute about legal matters..."
                className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-14 pr-16 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
              />
              <button 
                onClick={() => handleSend(inputValue)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-700 text-white p-2.5 rounded-xl hover:bg-emerald-800 shadow-md hover:shadow-emerald-900/20 transition-all active:scale-95"
              >
                <Send size={18} />
              </button>
              <input type="file" className="hidden" ref={fileInputRef} />
            </div>
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
              Brute AI may provide information that requires professional verification.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Chat;