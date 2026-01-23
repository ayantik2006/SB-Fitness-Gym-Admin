import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import gymHero from './assets/gym-hero.jpg';
import armBg from './assets/gym3.svg';
import dumbbellBg from './assets/gym2.svg';
import bicepBg from './assets/gym1.svg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to handle navigation
  const ALLOWED_EMAIL = "sbfitness@gmail.com";

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value) && value.toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) {
      setError('This email is not authorized for this gym site.');
    } else {
      setError('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.toLowerCase() === ALLOWED_EMAIL.toLowerCase()) {
      navigate('/dashboard'); // Moves user to dashboard
    }
  };

  const isButtonDisabled = email.toLowerCase() !== ALLOWED_EMAIL.toLowerCase();

  return (
    <div className="flex h-screen w-full font-sans bg-[#E5E7EB] overflow-hidden">
      <div className="hidden lg:flex w-[52%] h-full bg-black relative">
        <img src={gymHero} alt="Gym Hero" className="object-cover w-full h-full grayscale opacity-90" />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center items-center relative p-12 rounded-l-[40px] -ml-8 z-10 shadow-2xl"
           style={{ background: 'linear-gradient(145deg, #939393 0%, #E5E7EB 80%)' }}>
        
        <img src={dumbbellBg} className="absolute top-0 left-0 w-48 opacity-110 pointer-events-none rotate-12" alt="" />
        <img src={armBg} className="absolute bottom-0 left-0 w-54 opacity-80 pointer-events-none translate-x-10" alt="" />
        <img src={bicepBg} className="absolute bottom-20 right-0 w-96 opacity-100 pointer-events-none translate-x-0" alt="" />

        <div className="w-full max-w-md z-10 transform scale-90 origin-center">
          <h1 className="text-7xl font-bold text-[#6B7280] mb-2 text-center tracking-tighter">Welcome</h1>
          <p className="text-[#6B7280] text-center mb-12 font-semibold text-lg">Login with Email</p>

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="relative">
              <label className="text-[11px] font-bold text-[#000000] absolute -top-4 left-0 px-2 z-20">Email Id</label>
              <div className={`flex items-center border rounded-xl p-4 bg-transparent transition-colors ${error ? 'border-red-500' : 'border-gray-400 focus-within:border-[#4D575B]'}`}>
                <Mail className={`w-5 h-5 mr-3 ${error ? 'text-red-500' : 'text-gray-500'}`} />
                <input 
                  type="email" 
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="sbfitness@gmail.com" 
                  className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400 font-medium" 
                />
              </div>
              {error && (
                <div className="flex items-center mt-2 text-red-600 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  <span className="text-[10px] font-bold uppercase tracking-tight">{error}</span>
                </div>
              )}
            </div>

            <div className="relative">
              <label className="text-[11px] font-bold text-[#000000] absolute -top-4 left-0 px-2 z-20">Password</label>
              <div className="flex items-center border border-gray-400 rounded-xl p-4 bg-transparent focus-within:border-[#000000] transition-colors">
                <Lock className="w-5 h-5 text-gray-500 mr-3" />
                <input type="password" placeholder="**************" className="bg-transparent w-full outline-none text-gray-700 font-medium" />
              </div>
            </div>

            <div className="text-right">
              <Link to="/forgot-password" title="Forgot Password" className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition">
                Forgot your password?
              </Link>
            </div>

            <button 
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full font-bold py-5 rounded-xl shadow-lg transition-all uppercase tracking-widest text-base active:scale-95 ${
                isButtonDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#999999] hover:bg-blue-400 text-white'
              }`}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;