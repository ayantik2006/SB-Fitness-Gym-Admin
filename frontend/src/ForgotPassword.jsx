import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'; 
import { Link } from 'react-router-dom';

// Importing your decorative assets
import squiggle from './assets/squiggle.svg';
import diamondPattern from './assets/diamond-pattern.svg';
import circleBlue from './assets/circle-blue.svg';
import circleRed from './assets/circle-red.svg';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFinalSuccess, setShowFinalSuccess] = useState(false);
  const [error, setError] = useState(''); // New state for unauthorized error

  const ALLOWED_EMAIL = "sbfitness@gmail.com"; // i can change email from here

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(''); // Clear error while typing
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // 1. Check if the format is valid
    if (emailRegex.test(value)) {
      // 2. Check if it matches the specific authorized email
      if (value.toLowerCase() === ALLOWED_EMAIL.toLowerCase()) {
        setTimeout(() => {
          setIsSubmitted(true);
          setError('');
        }, 500);
      } else {
        setIsSubmitted(false);
        setError('This email is not authorized to reset password.');
      }
    } else {
      setIsSubmitted(false);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setShowFinalSuccess(true);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center relative font-sans overflow-hidden"
         style={{ background: 'linear-gradient(135deg, #737375 40%, #FFFFFF 100%)' }}>
      
      {/* Decorative Layer */}
      <img src={squiggle} className="absolute top-10 left-10 w-72 opacity-80" alt="" />
      <img src={squiggle} className="absolute bottom-10 left-1/2 -translate-x-1/2 w-70 opacity-50 rotate-180" alt="" />
      <img src={diamondPattern} className="absolute top-1/2 left-20 -translate-y-1/2 w-50 opacity-50" alt="" />
      <img src={diamondPattern} className="absolute top-40 right-40 w-40 opacity-60" alt="" />
      <img src={circleBlue} className="absolute top-1/3 right-0 w-24 opacity-50" alt="" />
      <img src={circleRed} className="absolute bottom-1/4 right-1/3 w-12 opacity-50" alt="" />

      {/* Central White Card */}
      <div className="bg-white w-full max-w-md p-10 rounded-[24px] shadow-2xl z-10 flex flex-col items-center min-h-[420px] justify-center transition-all duration-500">
        
        {!showFinalSuccess && (
          <>
            <h1 className="text-3xl font-extrabold text-[#1E3A8A] mb-4">Forgot Password</h1>
            <p className="text-[#6B7280] text-center text-sm mb-8 leading-relaxed">
              Enter your email for changing the password, a link will be sent to email for changing password.
            </p>
          </>
        )}

        {showFinalSuccess ? (
          <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <p className="text-[#1E3A8A] font-extrabold text-xl uppercase tracking-widest text-center">Link Sent</p>
            <p className="text-gray-400 text-sm mt-2">Please check your inbox</p>
          </div>
        ) : (
          <form className="w-full space-y-6" onSubmit={handleContinue}>
            <div className="relative w-full min-h-[90px] flex flex-col justify-end">
              <label className="text-[11px] font-bold text-[#1E3A8A] block mb-1 ml-1">Email</label>

              {!isSubmitted ? (
                <>
                  <div className={`flex items-center border rounded-lg p-4 bg-[#F9FAFB] transition-all ${error ? 'border-red-400 focus-within:border-red-500' : 'border-gray-200 focus-within:border-[#1E3A8A]'}`}>
                    <input 
                      type="email" 
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter email" 
                      className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-300 text-sm" 
                    />
                  </div>
               
                  {error && (
                    <div className="flex items-center mt-2 text-red-500 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      <span className="text-[10px] font-bold uppercase tracking-tight">{error}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-between border border-green-200 rounded-lg p-4 bg-green-50 animate-in fade-in zoom-in duration-300">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm font-medium text-green-700">{email}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail(''); 
                    }}
                    className="text-[10px] font-bold text-green-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            <button 
              type="submit"
              disabled={!isSubmitted}
              className={`w-full font-bold py-4 rounded-lg shadow-md transition-all uppercase tracking-widest text-sm active:scale-95 ${
                isSubmitted ? 'bg-[#1E3A8A] text-white hover:bg-[#1e3a8a]/90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              CONTINUE
            </button>
          </form>
        )}

        <Link 
          to="/" 
          className="mt-8 flex items-center text-xs font-bold text-gray-400 hover:text-[#1E3A8A] transition-colors"
        >
          <ArrowLeft className="w-3 h-3 mr-2" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;