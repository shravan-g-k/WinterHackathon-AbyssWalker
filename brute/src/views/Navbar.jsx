import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  MessageSquare, 
  FileSearch, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const Navbar = ({ onLogout, userEmail }) => {
  const location = useLocation();

  // Highlight logic for active buttons
  const isActive = (path) => location.pathname.startsWith(path);

  const navLinks = [
    { name: 'Law Tutor', path: '/lawtutor', icon: <BookOpen size={18} />, activeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { name: 'AI Chatbot', path: '/chatbot', icon: <MessageSquare size={18} />, activeColor: 'bg-blue-50 text-blue-700 border-blue-100' },
    { name: 'Doc Analyzer', path: '/docscan', icon: <FileSearch size={18} />, activeColor: 'bg-sky-50 text-sky-700 border-sky-100' },
    { name: 'Virtual Courtroom', path: '/courtroom', icon: <FileSearch size={18} />, activeColor: 'bg-sky-50 text-sky-700 border-sky-100' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-6 py-3">
      <div className=" mx-auto flex items-center justify-between">
        
        {/* Left Side: Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3665/3665923.png" 
              alt="Logo" 
              className="w-10 h-10 object-contain transition-transform group-hover:rotate-12 duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="hidden lg:block">
            <span className="font-black text-slate-900 text-xl tracking-tighter">
              BRUTE<span className="text-blue-600">-AI</span>
            </span>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] -mt-1">Legal Help</p>
          </div>
        </Link>

        {/* Center: Main Navigation */}
        <div className="flex items-center gap-10 bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300
                ${isActive(link.path) 
                  ? `${link.activeColor} shadow-sm border` 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white'
                }`}
            >
              {link.icon}
              <span className="hidden md:inline">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Right Side: User & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end pr-4 border-r border-slate-200">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active User</span>
            <span className="text-xs font-bold text-slate-700">{userEmail || 'Guest User'}</span>
          </div>

          <button 
            onClick={onLogout}
            className="group flex items-center gap-2 px-4 py-2.5 bg-white border border-red-100 text-red-500 font-bold text-sm rounded-xl hover:bg-red-50 hover:border-red-200 transition-all active:scale-95 shadow-sm"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;