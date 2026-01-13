import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Added signOut
import { auth } from '../firebaseSetUp.js';

// Components
import Navbar from './views/Navbar'; // Make sure to create this file

// Pages
import Sign from './signup.jsx';
import CourseSelect from './views/lawtutor/pages/CourseSelect.jsx';
import CourseHome from './views/lawtutor/pages/CourseHome.jsx';
import SectionPage from './views/lawtutor/pages/SectionPage.jsx';
import FinalQuiz from './views/lawtutor/pages/FinalQuiz.jsx';
import ResultPage from './views/lawtutor/pages/ResultPage.jsx';
import Docscan from './docanalyzer.jsx';
import Chat from './chat.jsx';

import './tailwind.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- LOGOUT HANDLER ---
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // No need to navigate manually, the user state change 
      // below will trigger the Navigate to="/auth" route.
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f5ed]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-900"></div>
          <p className="text-emerald-900 font-medium">Securing session...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        
        {/* 1. INCLUDE NAVBAR HERE */}
        {/* It only shows when a user is logged in */}
        {user && (
          <Navbar 
            onLogout={handleLogout} 
            userEmail={user.email} 
          />
        )}

        {/* 2. MAIN CONTENT AREA */}
        <div className="transition-all duration-300">
          <Routes>
            {!user ? (
              <>
                <Route path="/auth" element={<Sign />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </>
            ) : (
              <>
                {/* Home defaults to Doc Analyzer per your previous request */}
                <Route path="/" element={<Docscan />} />
                <Route path="/docscan" element={<Docscan />} />
                
                {/* Law Tutor Routes */}
                <Route path="/lawtutor" element={<CourseSelect />} />
                <Route path="/lawtutor/:courseId" element={<CourseHome />} />
                <Route path="/lawtutor/:courseId/section/:sectionId" element={<SectionPage />} />
                <Route path="/lawtutor/:courseId/final" element={<FinalQuiz />} />
                <Route path="/lawtutor/:courseId/result" element={<ResultPage />} />
                
                {/* AI Chatbot Placeholder */}
                <Route path="/chatbot" element={<Chat/>} />
                
                <Route path="/auth" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;