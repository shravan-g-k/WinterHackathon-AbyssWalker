import React, { useState, useEffect } from 'react';
import { 
  CloudUpload, 
  FileText, 
  X, 
  Brain, 
  Lightbulb, 
  List, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

/**
 * Document Analysis Dashboard
 * A React-based dashboard for processing documents and extracting AI insights.
 * This version uses pure inline CSS objects for all styling.
 */

const Docscan = () => {
  // State Management
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | results
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle responsiveness manually for inline styles
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // --- Style Definitions ---
  const colors = {
    primary: '#064e3b',
    primaryHover: '#065f46',
    background: '#f0f2f0',
    white: '#ffffff',
    grayText: '#6b7280',
    border: '#e5e7eb',
    emerald: '#10b981',
    amber: '#f59e0b',
    blue: '#3b82f6',
    purple: '#a855f7',
    red: '#ef4444'
  };

  const styles = {
    appContainer: {
      minHeight: '100-screen',
      backgroundColor: colors.background,
      color: '#1a2e26',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      paddingBottom: '5rem',
    },
    header: {
      backgroundColor: colors.primary,
      color: colors.white,
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    headerContent: {
      maxWidth: '1152px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    main: {
      maxWidth: '1152px',
      margin: '2rem auto 0',
      padding: '0 1rem',
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
      marginBottom: '2rem',
      opacity: status === 'loading' ? 0.4 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: status === 'loading' ? 'none' : 'auto',
    },
    cardHeader: {
      backgroundColor: colors.primary,
      color: colors.white,
      padding: '0.75rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    dropZone: (active) => ({
      margin: '1.5rem',
      borderRadius: '0.75rem',
      padding: '3rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      cursor: 'pointer',
      border: `2px dashed ${active ? colors.emerald : '#064e3b4d'}`,
      backgroundColor: active ? '#ecfdf5' : colors.white,
      transition: 'all 0.3s ease',
      transform: active ? 'scale(1.01)' : 'scale(1)',
    }),
    btnPrimary: {
      backgroundColor: colors.primary,
      color: colors.white,
      padding: '0.75rem 2rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'background-color 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    filePreview: {
      backgroundColor: '#fffbeb',
      border: '1px solid #fef3c7',
      borderRadius: '0.5rem',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '1.5rem',
    },
    insightCard: (borderColor) => ({
      borderLeft: `4px solid ${borderColor}`,
      backgroundColor: '#f9fafb',
      padding: '1rem',
      borderRadius: '0 0.5rem 0.5rem 0',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: '1rem',
      marginBottom: '1rem',
    }),
    tag: (bg, text) => ({
      backgroundColor: bg,
      color: text,
      padding: '0.25rem 0.75rem',
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }),
    pointRow: {
      padding: '1.5rem',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }
  };

  // Mock Data
  const insights = [
    {
      id: 1,
      title: "Accelerated Arctic Ice Melting",
      description: "Arctic sea ice has decreased by 13% per decade since 1979, with projections indicating ice-free summers by 2030.",
      tag: "Environmental",
      tagColor: colors.emerald,
      tagBg: '#d1fae5',
      tagText: '#065f46'
    },
    {
      id: 2,
      title: "Economic Impact on Agriculture",
      description: "Climate variability has resulted in 20% crop yield reduction in vulnerable regions, affecting global food security.",
      tag: "Economic",
      tagColor: colors.amber,
      tagBg: '#fef3c7',
      tagText: '#92400e'
    },
    {
      id: 3,
      title: "Renewable Energy Growth",
      description: "Solar and wind energy capacity has increased by 45% globally, showing promising trends in decarbonization efforts.",
      tag: "Technology",
      tagColor: colors.blue,
      tagBg: '#dbeafe',
      tagText: '#1e40af'
    },
    {
      id: 4,
      title: "Migration Patterns",
      description: "Climate-induced displacement has affected over 25 million people worldwide, creating humanitarian challenges.",
      tag: "Social",
      tagColor: colors.purple,
      tagBg: '#f3e8ff',
      tagText: '#6b21a8'
    }
  ];

  const mainPoints = [
    { id: 1, title: "Global Temperature Rise", desc: "Average global temperatures have increased by 1.2°C since pre-industrial times.", confidence: "95%" },
    { id: 2, title: "Renewable Energy Transition", desc: "Renewable energy sources now account for 30% of global electricity generation.", confidence: "92%" },
    { id: 3, title: "Biodiversity Loss", desc: "An estimated 1 million species are at risk of extinction due to habitat destruction.", confidence: "88%" },
    { id: 4, title: "Carbon Emissions Trends", desc: "Global CO2 emissions reached 40 billion tons in 2023.", confidence: "94%" },
    { id: 5, title: "International Cooperation", desc: "150+ countries have committed to net-zero emissions by 2050.", confidence: "85%" }
  ];

  // Handlers
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const startAnalysis = () => {
    setStatus('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setStatus('results'), 2000);
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
  };

  return (
    <div style={styles.appContainer}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: '700', margin: 0 }}>Document Analysis Dashboard</h1>
            <p style={{ color: '#dcfce7', opacity: 0.8, fontSize: '0.875rem', marginTop: '0.25rem' }}>
              AI-powered document insights and summary
            </p>
          </div>
          {status === 'results' && (
            <button 
              onClick={reset}
              style={{ ...styles.btnPrimary, backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              <RotateCcw size={16} /> Upload New
            </button>
          )}
        </div>
      </header>

      <main style={styles.main}>
        {/* Step 1: Upload Section */}
        {status !== 'results' && (
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <CloudUpload size={20} />
              <span style={{ fontWeight: '600' }}>Upload Document</span>
            </div>
            
            {!file ? (
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                style={styles.dropZone(isDragging)}
              >
                <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                  <CloudUpload size={36} color={colors.emerald} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Drag and drop your document here</h3>
                <p style={{ color: colors.grayText, marginBottom: '1.5rem' }}>or click to browse from your computer</p>
                <label style={styles.btnPrimary}>
                  Select File
                  <input type="file" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                </label>
              </div>
            ) : (
              <div style={{ padding: '1.5rem' }}>
                <div style={styles.filePreview}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ backgroundColor: '#fff', padding: '0.75rem', borderRadius: '0.25rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                      <FileText size={24} color={colors.primary} />
                    </div>
                    <div>
                      <p style={{ fontWeight: '700', margin: 0 }}>{file.name}</p>
                      <p style={{ fontSize: '0.875rem', color: colors.grayText, margin: 0 }}>{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button onClick={() => setFile(null)} style={{ background: colors.red, color: 'white', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                    <X size={20} />
                  </button>
                </div>
                <button onClick={startAnalysis} style={{ ...styles.btnPrimary, width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                  Analyze Document
                </button>
              </div>
            )}
          </section>
        )}

        {/* Loading State */}
        {status === 'loading' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5rem 0' }}>
            <div style={{ position: 'relative', width: '4rem', height: '4rem' }}>
              <div style={{ width: '100%', height: '100%', border: '4px solid #d1fae5', borderTopColor: colors.emerald, borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              <Brain style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} color={colors.primary} size={24} />
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>Working on it...</p>
            <p style={{ color: colors.grayText, fontSize: '0.875rem' }}>Extracting key concepts and generating summary</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Results Section */}
        {status === 'results' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Key Insights */}
            <section style={{ ...styles.card, opacity: 1, pointerEvents: 'auto' }}>
              <div style={styles.cardHeader}>
                <Lightbulb size={20} />
                <span style={{ fontWeight: '600' }}>Key Insights</span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                {insights.map((insight) => (
                  <div key={insight.id} style={styles.insightCard(insight.tagColor)}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: '700', fontSize: '1.125rem', margin: '0 0 0.25rem 0' }}>{insight.title}</h3>
                      <p style={{ color: colors.grayText, fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>{insight.description}</p>
                    </div>
                    <span style={styles.tag(insight.tagBg, insight.tagText)}>{insight.tag}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Main Points */}
            <section style={{ ...styles.card, opacity: 1, pointerEvents: 'auto' }}>
              <div style={styles.cardHeader}>
                <List size={20} />
                <span style={{ fontWeight: '600' }}>Main Points</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {mainPoints.map((point) => (
                  <div key={point.id} style={styles.pointRow}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#d1fae5', color: '#064e3b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0 }}>
                        {point.id}
                      </div>
                      <div>
                        <h3 style={{ fontWeight: '700', margin: 0 }}>{point.title}</h3>
                        <p style={{ color: colors.grayText, fontSize: '0.875rem', marginTop: '0.25rem', margin: 0 }}>{point.desc}</p>
                      </div>
                    </div>
                    {!isMobile && (
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: colors.emerald, backgroundColor: '#f0fdf4', padding: '0.25rem 0.75rem', borderRadius: '1rem', border: '1px solid #d1fae5', display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
                        <CheckCircle2 size={12} /> {point.confidence} confidence
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Docscan;