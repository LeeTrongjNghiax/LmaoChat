/*
  * Used by 
  *   index.js
*/

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '../contexts/ThemeProvider';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import LoadingPage from './LoadingPage';

import userService from '../services/UserServices';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const state = useLocation();
  const phoneNumber = state.state.phoneNumber;

  const handleChangePassword = e => {
    setPassword(e.target.value)
  }

  const handleChangeRepeatedPassword = e => {
    setRepeatedPassword(e.target.value)
  }

  const handleVerification = () => {
    const passwordMinCharacters = 8;
    if ( !(password.length >= passwordMinCharacters) ) {
      setError(`Password must have at least ${passwordMinCharacters} characters`);
      return false;
    }

    if ( !(password == repeatedPassword) ) {
      setError("Password and Repeated password must be the same");
      return false;
    }

    return true;
  }

  const handleResetPassword = async () => {
    if (handleVerification()) {
      await userService.updateUser(phoneNumber, password, null, null);
      alert("Reset password successfully!");
      navigate("/", { state: { phoneNumber, password } });
    }
  }

  useEffect(() => {
    window.onload = function() {
      setLoading(false);
    };
  }, []);

  if (loading)
    return <LoadingPage />

  return (
    <div className={`
      transition duration-[500] 
      bg-color-${theme}
      flex min-h-screen flex-col justify-center
    `}>
      <Navbar />

      <div className={`px-6 py-12 lg:px-8 flex-1`}>
        
        {/* Logo and title */}
        <div className={`sm:mx-auto sm:max-w-sm`}>
          
          {/* Logo */}
          <Logo />

          {/* Title */}
          <h2 className={`
            transition duration-[500] 
            text-color-${theme}
            mt-10 text-center text-2xl font-bold leading-9 tracking-tight select-none
          `}>
            Reset password of your Lmao Chat account
          </h2>
        </div>

        <div className={`mt-10 sm:mx-auto sm:max-w-sm`}>
          <div id='form' className={`space-y-6`}>

            {/* Password block */}
            <div>

              {/* Password label */}
              <label htmlFor="password" className={`
                transition duration-[500] 
                text-color-${theme}
                block text-sm font-medium leading-6 select-none
              `}>
                Password
              </label>

              {/* Password input */}
              <div className={`mt-2`}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder='Your Password'
                  value={password}
                  onChange={handleChangePassword}
                  required
                  className={`
                    transition duration-[500] 
                    text-color-${theme}
                    bg-color-${theme}
                    ${theme ? 'placeholder:text-gray-400' : 'placeholder:text-white'} 
                    block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 select-none
                  `}
                />
              </div>
            </div>
            
            {/* Repeated Password block */}
            <div>

              {/* Repeated Password label */}
              <label htmlFor="repeatedPassword" className={`
                transition duration-[500] 
                text-color-${theme}
                block text-sm font-medium leading-6 select-none
              `}>
                Repeat Password
              </label>

              {/* Repeated Password input */}
              <div className={`mt-2`}>
                <input
                  id="repeatedPassword"
                  name="repeatedPassword"
                  type="password"
                  autoComplete="current-password"
                  placeholder='Repeated Password'
                  value={repeatedPassword}
                  onChange={handleChangeRepeatedPassword}
                  required
                  className={`
                    transition duration-[500] 
                    text-color-${theme}
                    bg-color-${theme}
                    ${theme ? 'placeholder:text-gray-400' : 'placeholder:text-white'} 
                    block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 select-none
                  `}
                />
              </div>
            </div>

            {/* Errors */}
            <div>
              <p className={`text-red-600`}>{error}</p>
            </div>

            {/* Submit button */}
            <div>
              <button
                onClick={handleResetPassword}
                className={`
                  bg-color-primary-${theme} 
                  hover:bg-color-primary-hover-${theme} 
                text-white 
                  shadow-sm px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none
                  flex w-full justify-center rounded-md 
              `}>
                Reset Password
              </button>
            </div>
            
          </div>

        </div>
      </div>
    
    </div>
  )
}