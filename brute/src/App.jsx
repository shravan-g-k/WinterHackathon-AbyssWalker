import React from 'react';
import { Lock } from 'lucide-react';

/**
 * STYLES OBJECTS
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
    marginBottom: '40px'
  },
  iconCircle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    backgroundColor: '#064e3b', // emerald-900
    borderRadius: '9999px',
    marginBottom: '24px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  welcomeText: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#064e3b',
    letterSpacing: '-0.025em',
    margin: '0 0 8px 0'
  },
  subText: {
    color: '#6b7280',
    fontWeight: '500',
    margin: 0
  },
  signInCard: {
    width: '100%',
    maxWidth: '448px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
    textAlign: 'center'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#064e3b',
    marginBottom: '8px',
    marginTop: 0
  },
  cardDescription: {
    color: '#9ca3af',
    fontSize: '0.875rem',
    marginBottom: '32px',
    marginTop: 0
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
    fontWeight: '500',
    color: '#064e3b',
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
    marginTop: '32px',
    fontSize: '11px',
    color: '#9ca3af',
    lineHeight: '1.625',
    padding: '0 16px'
  },
  link: {
    color: '#047857',
    fontWeight: '600',
    textDecoration: 'none',
    margin: '0 4px'
  },
  footerCaption: {
    marginTop: '40px',
    color: '#9ca3af',
    fontSize: '0.875rem',
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
  }
};

// UI Component: Google Button
const GoogleButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={styles.googleButton}
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
  >
    <img 
      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pjax/google.png" 
      alt="Google" 
      style={styles.googleIcon}
    />
    <span>Continue with Google</span>
  </button>
);

// UI Component: Sign In Card
const SignInCard = () => {
  return (
    <div style={styles.signInCard}>
      <h2 style={styles.cardTitle}>Sign In</h2>
      <p style={styles.cardDescription}>Use your Google account to sign in</p>
      
      <GoogleButton onClick={() => console.log("Init Google Auth...")} />

      <div style={styles.legalText}>
        By signing in, you agree to our 
        <a href="#" style={styles.link}>Terms of Service</a> 
        and 
        <a href="#" style={styles.link}>Privacy Policy</a>
      </div>
    </div>
  );
};

// UI Component: Branding Header


const AuthHeader = () => (
  <div style={styles.authHeader}>
    <div style={styles.iconCircle}>
      <Lock style={{ color: 'white', width: '28px', height: '28px' }} />
    </div>
    <h1 style={styles.welcomeText}>Welcome Back</h1>
    <p style={styles.subText}>Sign in to continue to your account</p>
  </div>
);

// Layout Component
const LoginPage = () => {
  return (
    <div style={styles.loginPage}>
      <AuthHeader />
      <SignInCard />
      
      <div style={styles.footerCaption}>
        <div style={styles.statusDot} />
        Secure authentication powered by Google
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    <div style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
      <LoginPage />
    </div>
  );
}