import React, { useState, useEffect, useRef } from 'react';

// Helper function to create the initial welcome message
const createInitialBotMessage = () => ({
  id: Date.now(),
  text: "Hello! I'm Brute, your AI assistant. You can send me messages or upload files for analysis. How can I help you today?",
  isUser: false,
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
});

const Chat = () => {
  const [currentView, setCurrentView] = useState('chat');
  const [messages, setMessages] = useState([createInitialBotMessage()]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { id: 101, title: 'Legal Research - Case A', date: 'Today' },
    { id: 102, title: 'Contract Review - Corp X', date: 'Yesterday' },
    { id: 103, title: 'Document Summary', date: 'Jan 10' },
  ]);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (currentView === 'chat') {
      scrollToBottom();
    }
  }, [messages, isTyping, currentView]);

  const handleNewChat = () => {
    if (messages.length > 1) {
      const firstUserMsg = messages.find(m => m.isUser)?.text || "New Conversation";
      const title = firstUserMsg.length > 25 ? firstUserMsg.substring(0, 25) + '...' : firstUserMsg;
      
      const newHistoryItem = {
        id: Date.now(),
        title: title,
        date: 'Just now',
        fullChat: [...messages]
      };
      
      setChatHistory(prev => [newHistoryItem, ...prev]);
    }

    setMessages([createInitialBotMessage()]);
    setCurrentView('chat');
    setInputValue('');
  };

  const handleSend = (text, fileData = null) => {
    if (!text.trim() && !fileData) return;

    const userMessage = {
      id: Date.now(),
      text: text,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      file: fileData
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botMessage = {
        id: Date.now() + 1,
        text: fileData 
          ? `I've received your file: **${fileData.name}**. I'm currently analyzing the contents. Please let me know if you have specific questions about it!`
          : "I've received your request. How else can I assist you with your legal or document queries today?",
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = {
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          type: file.type,
          preview: event.target.result
        };
        handleSend(`Uploaded a file: ${file.name}`, fileData);
      };
      reader.readAsDataURL(file);
    } else {
      const fileData = {
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type,
        preview: null
      };
      handleSend(`Uploaded a file: ${file.name}`, fileData);
    }
    
    e.target.value = '';
  };

  // Inline Style Definitions
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: '#005b41',
      color: 'white',
      padding: '0.5rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 20,
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    logoWrapper: {
      width: '2.5rem',
      height: '2.5rem',
      backgroundColor: 'white',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid rgba(255,255,255,0.2)',
    },
    navGroup: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
    },
    navBtn: (active) => ({
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      backgroundColor: active ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
      color: 'white',
      border: 'none',
      transition: 'background-color 0.2s',
    }),
    mainWrapper: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden',
    },
    sidebar: {
      width: '260px',
      backgroundColor: '#f9fafb',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    },
    chatContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8fafc',
      overflow: 'hidden',
    },
    chatScroll: {
      flex: 1,
      overflowY: 'auto',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    sidebarItem: {
      padding: '0.75rem 1rem',
      fontSize: '0.875rem',
      color: '#374151',
      cursor: 'pointer',
      borderBottom: '1px solid #f3f4f6',
    },
    bubble: (isUser) => ({
      padding: '1rem',
      fontSize: '0.875rem',
      backgroundColor: isUser ? '#005b41' : 'white',
      color: isUser ? 'white' : '#1f2937',
      borderRadius: isUser ? '1.5rem 1.5rem 0.2rem 1.5rem' : '1.5rem 1.5rem 1.5rem 0.2rem',
      border: isUser ? 'none' : '1px solid #e5e7eb',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      wordBreak: 'break-word',
    }),
    footer: {
      padding: '1rem',
      backgroundColor: 'white',
      borderTop: '1px solid #e5e7eb',
    }
  };

  const views = [
    { id: 'chat', label: 'Chat' },
    { id: 'analyzer', label: 'Analyzer' },
    { id: 'learning', label: 'Learning' },
    { id: 'court', label: 'Court Room' }
  ];

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
        .dot-bounce { animation: bounce 1.4s infinite ease-in-out both; }
        .sidebar-item:hover { background-color: #f3f4f6; }
        .nav-hover:hover { background-color: rgba(255, 255, 255, 0.1) !important; }
      `}</style>

      {/* Unified Header with Nav */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoWrapper}>
            <img 
              src="Screenshot 2026-01-12 002133.png" 
              alt="Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              onError={(e) => { e.target.src = 'https://placehold.co/100?text=B'; }} 
            />
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Brute</h1>
        </div>

        {/* Navigation moved to Header */}
        <nav style={styles.navGroup}>
          {views.map((view) => (
            <button 
              key={view.id}
              className="nav-hover"
              style={styles.navBtn(currentView === view.id)} 
              onClick={() => setCurrentView(view.id)}
            >
              {view.label}
            </button>
          ))}
        </nav>

        <div style={{ fontSize: '0.75rem', opacity: 0.8, textAlign: 'right', display: 'none' }}>
          Premium Legal AI
        </div>
        <div style={{ width: '100px' }}></div> {/* Spacer for balance */}
      </header>

      <div style={styles.mainWrapper}>
        {/* Left Sidebar */}
        <aside style={styles.sidebar}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            <button 
              onClick={handleNewChat}
              style={{ width: '100%', padding: '0.75rem', backgroundColor: '#005b41', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              + New Chat
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ padding: '1rem 1rem 0.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase' }}>
              Chat Log
            </div>
            {chatHistory.map(item => (
              <div 
                key={item.id} 
                className="sidebar-item"
                style={styles.sidebarItem}
                onClick={() => {
                  if (item.fullChat) {
                    setMessages(item.fullChat);
                    setCurrentView('chat');
                  }
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '2px' }}>{item.title}</div>
                <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{item.date}</div>
              </div>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {currentView === 'chat' ? (
            <div style={styles.chatContent}>
              <div style={styles.chatScroll}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ display: 'flex', gap: '0.75rem', flexDirection: msg.isUser ? 'row-reverse' : 'row' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', overflow: 'hidden', border: '1px solid #e5e7eb', backgroundColor: 'white', flexShrink: 0 }}>
                      {!msg.isUser ? (
                        <img src="Screenshot 2026-01-12 002133.png" alt="Bot" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg style={{ width: '1rem', height: '1rem', color: '#6b7280' }} fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>
                        </div>
                      )}
                    </div>
                    <div style={{ maxWidth: '80%' }}>
                      <div style={styles.bubble(msg.isUser)}>
                        {msg.text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
                        {msg.file && (
                          <div style={{ marginTop: '0.75rem', padding: '0.5rem', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '0.5rem' }}>
                            {msg.file.preview ? <img src={msg.file.preview} style={{ maxWidth: '100%', borderRadius: '0.25rem' }} alt="file" /> : 
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path></svg>
                                {msg.file.name}
                              </div>
                            }
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: '10px', color: '#9ca3af', marginTop: '0.25rem', display: 'block', textAlign: msg.isUser ? 'right' : 'left' }}>{msg.time}</span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', overflow: 'hidden', border: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                      <img src="Screenshot 2026-01-12 002133.png" alt="Bot" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ padding: '0.75rem 1rem', backgroundColor: 'white', borderRadius: '1.5rem 1.5rem 1.5rem 0.2rem', border: '1px solid #e5e7eb', display: 'flex', gap: '3px' }}>
                      <div className="dot-bounce" style={{ width: '4px', height: '4px', backgroundColor: '#9ca3af', borderRadius: '50%', animationDelay: '-0.32s' }}></div>
                      <div className="dot-bounce" style={{ width: '4px', height: '4px', backgroundColor: '#9ca3af', borderRadius: '50%', animationDelay: '-0.16s' }}></div>
                      <div className="dot-bounce" style={{ width: '4px', height: '4px', backgroundColor: '#9ca3af', borderRadius: '50%' }}></div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <footer style={styles.footer}>
                <div style={{ maxWidth: '56rem', margin: '0 auto', display: 'flex', gap: '0.5rem', backgroundColor: '#f9fafb', borderRadius: '9999px', border: '1px solid #d1d5db', padding: '0.5rem 1rem', alignItems: 'center' }}>
                  <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileUpload} />
                  <button onClick={() => fileInputRef.current.click()} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}>
                    <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                  </button>
                  <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                    placeholder="Type your message..." 
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', color: '#374151' }} 
                  />
                  <button onClick={() => handleSend(inputValue)} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', border: 'none', backgroundColor: '#005b41', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <svg style={{ width: '1.25rem', height: '1.25rem', transform: 'rotate(-45deg) translateX(2px)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </button>
                </div>
              </footer>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#f0fdf4', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <svg style={{ width: '40px', height: '40px', color: '#005b41' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {currentView === 'analyzer' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                  {currentView === 'learning' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                  {currentView === 'court' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                </svg>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {views.find(v => v.id === currentView)?.label}
              </h2>
              <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Feature coming soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;