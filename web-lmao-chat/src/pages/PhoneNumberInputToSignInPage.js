/*
  * Used by 
  *   index.js
*/

import React, { useEffect, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import { useTheme } from '../contexts/ThemeProvider';
import ConfigVariables from '../ConfigVariables';
import LoadingPage from './LoadingPage';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';

export default function PhoneNumberInputToSignInPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('INPUT_PHONE_NUMBER');
  const [result, setResult] = useState('');
  const { theme } = useTheme();
  const auth = ConfigVariables.auth;
  const navigate = useNavigate();

  const handleChangePhoneNumber = e => {
    setPhoneNumber(e.target.value)
  }

  const handleChangeOTP = e => {
    setOTP(e.target.value)
  }

  const handleVerification = () => {
    if (!phoneNumber.match(/^0[0-9]{9}$/) ) {
      setError("Phone Number must have exatly 10 digits and start with 0");
      return;
    }

    return true;
  }

  const handleSendPhoneNumber = () => {
    if (handleVerification()) {
      document.querySelector("#sendPhoneNumberButton").disabled = true;

      let appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });

      signInWithPhoneNumber(auth, "+84" + phoneNumber.substring(1), appVerifier)
        .then(confirmationResult => {
          setResult(confirmationResult);
          setStep('VERIFY_OTP');
          setError(null);
        }).catch(error => {
          setError("Sign in with phone number error: " + error);
          console.error("Sign in with phone number error: " + error);
          document.querySelector("#sendPhoneNumberButton").disabled = false;
        });

      alert`Send OTP successfully!`
    }
  }

  const handleSendOTP = () => {
    if (otp === null) return;
        
    result.confirm(otp).then(result => {
      setStep('VERIFY_SUCCESS');
      navigate("/SignUp", { state: { phoneNumber: phoneNumber } })
    })
    .catch(err => {
      setError("Verify OTP error: " + err);
      console.error("Verify OTP error: " + err);
    });
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
        <div className={`sm:mx-auto sm:w-full sm:max-w-sm`}>
          
          {/* Logo */}
          <Logo />

          {/* Title */}
          <h2 className={`
            transition duration-[500] 
            text-color-${theme}
            mt-10 text-center text-2xl font-bold leading-9 tracking-tight select-none
          `}>
            Sign up to your Lmao Chat account
          </h2>
        </div>

        <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm`}>
          <div id='form' className={`space-y-6`}>
            
            {
              step === 'INPUT_PHONE_NUMBER' &&
                <>
                  {/* Phone Number block */}
                  <div>

                    {/* Phone Number label */}
                    <label htmlFor="phoneNumber" className={`
                      transition duration-[500] 
                      text-color-${theme}
                      block text-sm font-medium leading-6 select-none
                    `}>
                      Please input your phone number that we can send OTP code
                    </label>

                    {/* Phone Number input */}
                    <div className={`mt-2`}>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        autoComplete="tel"
                        maxLength={10}
                        placeholder='Your Phone Number'
                        value={phoneNumber}
                        onChange={handleChangePhoneNumber}
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
                      id='sendPhoneNumberButton'
                      type="submit"
                      onClick={handleSendPhoneNumber}
                      className={`
                        bg-color-primary-${theme} 
                        hover:bg-color-primary-hover-${theme} 
                      text-white  
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm flex w-full justify-center rounded-md 
                    `}>
                      Send Phone Number
                    </button>
                  </div>
                </>
            }

            {
              step === 'VERIFY_OTP' &&
                <>
                  {/* OTP block */}
                  <div>

                    {/* OTP label */}
                    <label htmlFor="otp" className={`
                      transition duration-[500] 
                      text-color-${theme}
                      block text-sm font-medium leading-6 select-none
                    `}>
                      Please input the OTP code that just sent to {phoneNumber}
                    </label>

                    {/* OTP input */}
                    <div className={`mt-2`}>
                      <input
                        id="otp"
                        name="otp"
                        type="number"
                        min={0}
                        max={999999}
                        placeholder='Your OTP'
                        value={otp}
                        onChange={handleChangeOTP}
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
                      type="submit"
                      onClick={handleSendOTP}
                      className={`
                        bg-color-primary-${theme} 
                        hover:bg-color-primary-hover-${theme} 
                      text-white  
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm flex w-full justify-center rounded-md 
                    `}>
                      Send OTP
                    </button>
                  </div>
                </>
            }
            
          </div>

        </div>
      </div>

      <div id='recaptcha-container'></div>
      
    </div>
  )
}