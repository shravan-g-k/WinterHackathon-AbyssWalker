import React, { useState } from 'react';
import { Lock, Globe, ChevronDown } from 'lucide-react';

/**
 * TRANSLATIONS DATA
 */
const translations = {
  en: {
    welcome: "Welcome Back",
    subText: "Sign in to continue to your account",
    signIn: "Sign In",
    description: "Use your Google account to sign in",
    continue: "Continue with Google",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    agree: "By signing in, you agree to our",
    and: "and",
    secure: "Secure authentication powered by Google",
    selectLang: "Language"
  },
  kn: {
    welcome: "ಮರಳಿ ಸ್ವಾಗತ",
    subText: "ನಿಮ್ಮ ಖಾತೆಗೆ ಮುಂದುವರಿಯಲು ಸೈನ್ ಇನ್ ಮಾಡಿ",
    signIn: "ಸೈನ್ ಇನ್ ಮಾಡಿ",
    description: "ಸೈನ್ ಇನ್ ಮಾಡಲು ನಿಮ್ಮ Google ಖಾತೆಯನ್ನು ಬಳಸಿ",
    continue: "Google ಮೂಲಕ ಮುಂದುವರಿಸಿ",
    terms: "ಸೇವಾ ನಿಯಮಗಳು",
    privacy: "ಗೌಪ್ಯತೆ ನೀತಿ",
    agree: "ಸೈನ್ ಇನ್ ಮಾಡುವ ಮೂಲಕ, ನೀವು ನಮ್ಮ",
    and: "ಮತ್ತು",
    secure: "Google ನಿಂದ ಸುರಕ್ಷಿತ ದೃಢೀಕರಣ",
    selectLang: "ಭಾಷೆ"
  },
  hi: {
    welcome: "वापस स्वागत है",
    subText: "अपने खाते में जारी रखने के लिए साइन इन करें",
    signIn: "साइन इन करें",
    description: "साइन इन करने के लिए अपने Google खाते का उपयोग करें",
    continue: "Google के साथ जारी रखें",
    terms: "सेवा की शर्तें",
    privacy: "गोपनीयता नीति",
    agree: "साइन इन करके, आप हमारे",
    and: "और",
    secure: "Google द्वारा संचालित सुरक्षित प्रमाणीकरण",
    selectLang: "भाषा"
  }
};

const languages = [
  { code: 'en', label: 'English' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'hi', label: 'हिन्दी (Hindi)' }
];

/**
 * STYLES OBJECT
 */
const styles = {
  loginPage: {
    minHeight: '100vh',
    backgroundColor: '#f3f5ed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  authHeader: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  iconCircle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    backgroundColor: '#064e3b',
    borderRadius: '9999px',
    marginBottom: '20px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  welcomeText: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#064e3b',
    letterSpacing: '-0.025em',
    margin: '0 0 8px 0'
  },
  subText: {
    color: '#6b7280',
    fontWeight: '500',
    margin: 0,
    fontSize: '0.95rem'
  },
  signInCard: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
    textAlign: 'center'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#064e3b',
    marginBottom: '8px',
    marginTop: 0
  },
  cardDescription: {
    color: '#9ca3af',
    fontSize: '0.875rem',
    marginBottom: '24px',
    marginTop: 0
  },
  langSelectorWrapper: {
    position: 'relative',
    marginBottom: '24px',
    textAlign: 'left'
  },
  langLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '6px',
    display: 'block'
  },
  selectContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  selectIcon: {
    position: 'absolute',
    left: '12px',
    color: '#064e3b',
    pointerEvents: 'none'
  },
  chevronIcon: {
    position: 'absolute',
    right: '12px',
    color: '#9ca3af',
    pointerEvents: 'none'
  },
  selectField: {
    width: '100%',
    padding: '12px 40px',
    fontSize: '0.9375rem',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    color: '#374151',
    appearance: 'none',
    cursor: 'pointer',
    outline: 'none',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit'
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    fontWeight: '600',
    color: '#374151',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  googleIcon: {
    width: '20px',
    height: '20px',
    marginRight: '12px'
  },
  legalText: {
    marginTop: '24px',
    fontSize: '0.75rem',
    color: '#9ca3af',
    lineHeight: '1.6',
    padding: '0 8px'
  },
  link: {
    color: '#059669',
    fontWeight: '600',
    textDecoration: 'none',
    margin: '0 4px'
  },
  footerCaption: {
    marginTop: '32px',
    color: '#9ca3af',
    fontSize: '0.8125rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  statusDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#10b981',
    borderRadius: '50%'
  },
  divider: {
    height: '1px',
    backgroundColor: '#f3f4f6',
    width: '100%',
    margin: '24px 0'
  }
};

export default function Sign() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const handleLangChange = (e) => {
    setLang(e.target.value);
  };

  return (
    <div style={{ ...styles.loginPage, WebkitFontSmoothing: 'antialiased' }}>
      {/* BRANDING SECTION */}
      <div style={styles.authHeader}>
        <div style={styles.iconCircle}>
          <Lock style={{ color: 'white', width: '28px', height: '28px' }} />
        </div>
        <h1 style={styles.welcomeText}>{t.welcome}</h1>
        <p style={styles.subText}>{t.subText}</p>
      </div>

      {/* LOGIN CARD */}
      <div style={styles.signInCard}>
        <h2 style={styles.cardTitle}>{t.signIn}</h2>
        <p style={styles.cardDescription}>{t.description}</p>

        {/* DROPDOWN LANGUAGE SELECTION */}
        <div style={styles.langSelectorWrapper}>
          <label htmlFor="lang-select" style={styles.langLabel}>
            {t.selectLang}
          </label>
          <div style={styles.selectContainer}>
            <Globe size={18} style={styles.selectIcon} />
            <select
              id="lang-select"
              value={lang}
              onChange={handleLangChange}
              style={styles.selectField}
              onFocus={(e) => {
                e.target.style.borderColor = '#064e3b';
                e.target.style.boxShadow = '0 0 0 2px rgba(6, 78, 59, 0.05)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
            <ChevronDown size={18} style={styles.chevronIcon} />
          </div>
        </div>

        <div style={styles.divider} />

        {/* GOOGLE AUTH BUTTON */}
        <button
          onClick={() => console.log("Google Auth requested in:", lang)}
          style={styles.googleButton}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pjax/google.png" 
            alt="Google" 
            style={styles.googleIcon}
          />
          <span>{t.continue}</span>
        </button>

        {/* TERMS & PRIVACY */}
        <div style={styles.legalText}>
          {t.agree} 
          <a href="#" style={styles.link}>{t.terms}</a> 
          {t.and} 
          <a href="#" style={styles.link}>{t.privacy}</a>
        </div>
      </div>

      {/* SECURITY FOOTER */}
      <div style={styles.footerCaption}>
        <div style={styles.statusDot} />
        {t.secure}
      </div>
    </div>
  );
}