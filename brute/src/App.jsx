import React, { useState, useRef } from 'react';
import { Upload, FileText, X, File, Languages } from 'lucide-react';

export default function App() {
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [language, setLanguage] = useState('eng');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
    }
  };

  const clearFile = () => {
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxSizing: 'border-box'
    },
    card: {
      width: '100%',
      maxWidth: '450px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      border: '1px solid #e2e8f0'
    },
    header: {
      backgroundColor: '#2563eb',
      padding: '24px',
      color: '#ffffff'
    },
    title: {
      margin: 0,
      fontSize: '20px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    subtitle: {
      margin: '4px 0 0 0',
      fontSize: '14px',
      color: '#dbeafe'
    },
    body: {
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#334155',
      marginBottom: '8px'
    },
    dropzone: {
      border: `2px dashed ${fileName ? '#93c5fd' : (isHovered ? '#60a5fa' : '#cbd5e1')}`,
      backgroundColor: fileName ? '#eff6ff' : (isHovered ? '#f8fafc' : 'transparent'),
      borderRadius: '12px',
      padding: '24px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      fontSize: '14px',
      outline: 'none',
      cursor: 'pointer',
      backgroundColor: '#fff'
    },
    textarea: {
      width: '100%',
      minHeight: '150px',
      padding: '12px',
      borderRadius: '12px',
      border: `1px solid ${isFocused ? '#2563eb' : '#cbd5e1'}`,
      boxShadow: isFocused ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none',
      fontSize: '14px',
      color: '#475569',
      outline: 'none',
      boxSizing: 'border-box',
      resize: 'none',
      fontFamily: 'inherit',
      transition: 'all 0.2s ease'
    },
    button: {
      width: '100%',
      padding: '12px',
      borderRadius: '12px',
      border: 'none',
      backgroundColor: fileName ? '#2563eb' : '#94a3b8',
      color: '#ffffff',
      fontWeight: '600',
      fontSize: '14px',
      cursor: fileName ? 'pointer' : 'not-allowed',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        body { margin: 0; padding: 0; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            <Languages size={24} />
            Multilingual OCR
          </h1>
          <p style={styles.subtitle}>Upload an image and press Enter to scan.</p>
        </div>

        <div style={styles.body}>
          {/* Language Selection */}
          <div>
            <label style={styles.label}>Select Language</label>
            <select 
              style={styles.select} 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="eng">English</option>
              <option value="fra">French</option>
              <option value="spa">Spanish</option>
              <option value="deu">German</option>
              <option value="chi_sim">Chinese (Simplified)</option>
              <option value="jpn">Japanese</option>
              <option value="hin">Hindi</option>
              <option value="ara">Arabic</option>
            </select>
          </div>

          {/* File Input Section */}
          <div>
            <label style={styles.label}>Upload Image</label>
            <div 
              style={styles.dropzone}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                accept="image/*"
                style={{ display: 'none' }} 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              
              {!fileName ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ backgroundColor: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                    <Upload size={20} color="#64748b" />
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#475569', fontWeight: '500' }}>Click to upload image</p>
                </div>
              ) : (
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                      <File size={18} color="#2563eb" />
                      <span style={{ fontSize: '13px', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                        {fileName}
                      </span>
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); clearFile(); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <X size={16} color="#94a3b8" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button 
            type="button"
            style={styles.button} 
            disabled={!fileName}
          >
            Scan Text (Press Enter)
          </button>

          {/* Result Textarea */}
          <div>
            <label style={styles.label}>
              <FileText size={16} />
              Extracted Text
            </label>
            <textarea
              style={styles.textarea}
              placeholder="Extracted text will appear here..."
              value={description}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}