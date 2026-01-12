import React from 'react';
import { BookOpen, FileText, MessageSquare } from 'lucide-react';

/**
 * BRUTE LEGAL AI PLATFORM
 * Converted from Tailwind CSS to pure Inline CSS.
 */

const Launch = () => {
  // Common style objects
  const colors = {
    primary: '#004d40',
    background: '#f1f3e4',
    card: '#f9fbe7',
    white: '#ffffff',
    accent: '#e4e9c7'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    paddingLeft: '2rem',
    paddingRight: '2rem'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: colors.primary,
      overflowX: 'hidden'
    }}>
      {/* Animation Keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .animate-bounce-custom { animation: bounce 1s infinite; }
        .animate-pulse-custom { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>

      {/* Navbar */}
      <nav style={{
        ...containerStyle,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.025em' }}>Brute</div>
        <button style={{
          backgroundColor: colors.primary,
          color: colors.white,
          padding: '0.625rem 1.75rem',
          borderRadius: '9999px',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}>
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main style={{
        ...containerStyle,
        display: 'flex',
        flexDirection: 'row', // Note: On small screens this usually stacks, but following exact design conversion
        alignItems: 'center',
        gap: '4rem',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        marginTop: '3rem'
      }}>
        
        {/* LEFT SIDE: Heading and Quote Section */}
        <div style={{ flex: '1 1 0%', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* The large decorative quote mark */}
            <span style={{
              fontSize: '6rem',
              color: 'rgba(0, 77, 64, 0.1)',
              fontFamily: 'serif',
              position: 'absolute',
              top: '-3.5rem',
              left: '-1.5rem',
              pointerEvents: 'none',
              userSelect: 'none'
            }}>"</span>
            
            <h1 style={{
              fontSize: '4.5rem',
              fontWeight: 'bold',
              lineHeight: '1.05',
              letterSpacing: '-0.025em',
              position: 'relative',
              zIndex: 10,
              maxWidth: '42rem',
              margin: 0
            }}>
              You don't need a Law degree to protect what matters
            </h1>
            
            {/* "You just need the right partner" section */}
            <div style={{
              borderLeft: `3.5px solid ${colors.primary}`,
              paddingLeft: '1.75rem',
              marginTop: '2rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem'
            }}>
              <p style={{
                fontSize: '1.875rem',
                color: 'rgba(0, 77, 64, 0.9)',
                fontWeight: '300',
                fontStyle: 'italic',
                margin: 0
              }}>
                you just need the right partner
              </p>
            </div>
          </div>
          
          <button style={{
            backgroundColor: colors.primary,
            color: colors.white,
            padding: '1rem 2.5rem',
            borderRadius: '9999px',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            width: 'fit-content',
            transition: 'box-shadow 0.3s'
          }}>
            Get Started Free
          </button>
        </div>

        {/* RIGHT SIDE: Brute AI Assistant */}
        <div style={{ flex: '1 1 0%', width: '100%', maxWidth: '28rem', marginLeft: 'auto' }}>
          <div style={{
            backgroundColor: colors.card,
            borderRadius: '3.5rem',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '500px'
          }}>
            {/* Chat Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                backgroundColor: colors.primary,
                padding: '0.75rem',
                borderRadius: '1rem',
                color: colors.white,
                boxShadow: '0 10px 15px -3px rgba(0, 77, 64, 0.1)'
              }}>
                <MessageSquare size={20} />
              </div>
              <div>
                <p style={{
                  fontWeight: '800',
                  fontSize: '0.875rem',
                  letterSpacing: '-0.025em',
                  color: colors.primary,
                  margin: 0
                }}>Brute AI Assistant</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.125rem' }}>
                  <div className="animate-pulse-custom" style={{
                    width: '0.375rem',
                    height: '0.375rem',
                    backgroundColor: '#22c55e',
                    borderRadius: '9999px'
                  }}></div>
                  <p style={{
                    fontSize: '10px',
                    color: '#9ca3af',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    margin: 0
                  }}>Online</p>
                </div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              flex: '1 1 0%',
              overflowY: 'auto',
              paddingRight: '0.25rem'
            }}>
              {/* AI Message */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  backgroundColor: colors.primary,
                  padding: '0.375rem',
                  height: '2rem',
                  width: '2rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.white,
                  flexShrink: 0
                }}>
                  <MessageSquare size={16} />
                </div>
                <div style={{
                  backgroundColor: colors.white,
                  padding: '1.25rem',
                  borderRadius: '1.5rem',
                  borderTopLeftRadius: '0',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  lineHeight: '1.625'
                }}>
                  Welcome to Brute! How can I help you today?
                </div>
              </div>

              {/* User Message */}
              <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '0.75rem' }}>
                <div style={{
                  backgroundColor: colors.primary,
                  padding: '1.25rem',
                  borderRadius: '1.5rem',
                  borderTopRightRadius: '0',
                  color: colors.white,
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  maxWidth: '85%',
                  lineHeight: '1.625'
                }}>
                  I need help understanding my rental agreement
                </div>
              </div>

              {/* AI Typing Indicator */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  backgroundColor: colors.primary,
                  padding: '0.375rem',
                  height: '2rem',
                  width: '2rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.white,
                  flexShrink: 0
                }}>
                  <MessageSquare size={16} />
                </div>
                <div style={{
                  backgroundColor: colors.white,
                  padding: '0.75rem 1.25rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}>
                  <div className="animate-bounce-custom" style={{ width: '0.375rem', height: '0.375rem', backgroundColor: '#d1d5db', borderRadius: '9999px' }}></div>
                  <div className="animate-bounce-custom" style={{ width: '0.375rem', height: '0.375rem', backgroundColor: '#d1d5db', borderRadius: '9999px', animationDelay: '200ms' }}></div>
                  <div className="animate-bounce-custom" style={{ width: '0.375rem', height: '0.375rem', backgroundColor: '#d1d5db', borderRadius: '9999px', animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section style={{
        ...containerStyle,
        paddingTop: '5rem',
        paddingBottom: '5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <FeatureCard 
          icon={<BookOpen size={28} />}
          title="Learning Platform"
          description="Access a comprehensive library of courses, interactive lessons, and personalized learning paths."
          colors={colors}
        />
        <FeatureCard 
          icon={<FileText size={28} />}
          title="Doc Analyzer"
          description="Upload and analyze documents with AI-powered insights. Extract key information and summarize texts."
          colors={colors}
        />
        <FeatureCard 
          icon={<MessageSquare size={28} />}
          title="Chat & Collaborate"
          description="Connect with peers, mentors, and AI tutors in real-time. Get instant answers and collaborate seamlessly."
          colors={colors}
        />
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, colors }) => (
  <div style={{
    backgroundColor: colors.card,
    padding: '2.5rem',
    borderRadius: '3rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    transition: 'all 0.3s'
  }}>
    <div style={{
      backgroundColor: colors.primary,
      color: colors.white,
      padding: '1rem',
      width: 'fit-content',
      borderRadius: '9999px',
      boxShadow: '0 10px 15px -3px rgba(0, 77, 64, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {icon}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        letterSpacing: '-0.025em',
        margin: 0
      }}>{title}</h3>
      <p style={{
        color: 'rgba(0, 77, 64, 0.8)',
        lineHeight: '1.625',
        fontWeight: '500',
        margin: 0
      }}>
        {description}
      </p>
    </div>
  </div>
);

export default Launch;