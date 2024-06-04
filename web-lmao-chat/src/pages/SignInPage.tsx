/*
  * Used by 
  *   index.js
*/

import React, { ReactElement, useEffect, useState } from 'react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '../contexts/ThemeProvider';
import Navbar from '../components/Navbar.tsx';
import Logo from '../components/Logo';
import ExportColor from '../GlobalVariables';

import userService from '../services/UserServices';

/*
 * @param password: string
 */
export default function SignInPage(): ReactElement {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<String | null>("");
  const { theme } = useTheme();
  const [loading, setLoading] = useState("NOT_LOAD");
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const {
    backgroundColor,
    buttonColor,
    iconColor,
    linkColor,
    textColor,
  } = ExportColor();

  useEffect(() => {

    if (state != null) {
      if ( Object.hasOwn(state, 'phoneNumber') )
        if (state.phoneNumber !== undefined)
          setPhoneNumber(state.phoneNumber);

      if ( Object.hasOwn(state, 'password') )
        if (state.password !== undefined)
          setPassword(state.password);
    }
  }, [state]);

  const handleChangePhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value)
  }

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value)
  }

  const handleVerification = () => {
    if (!phoneNumber) {
      setError("Phone number must not be null");
      return false;
    }

    if (!password) {
      setError("Password must not be null");
      return false;
    }

    return true;
  }

  const handleSignIn = async () => {
    setError(null);

    if (!handleVerification())
      return;

    setLoading("LOAD");

    const foundUser = await userService.login(phoneNumber, password);
    
    if (foundUser.data == null) {
      setLoading("NOT_LOAD");
      setError("Phone number or password is incorrect");
    }
    else {
      setLoading("NOT_LOAD");
      setError(null);
      alert`Sign in successfully!`;
      navigate("/MainPage", { state: { user: foundUser.data } });
    }
  }
  
  return (
    <div
      className={`
        transition duration-[500] 
        flex min-h-screen flex-col justify-center
      `}
      style={{
        background: backgroundColor
      }}
    >
      <Navbar />

      <div className={`px-6 py-12 flex-1`}>
        
        {/* Logo and title */}
        <div className={`sm:mx-auto sm:max-w-sm`}>
          
          {/* Logo */}
          <Logo />

          {/* Title */}
          <h2
            className={`
              transition duration-[500] 
              mt-10 text-center text-2xl font-bold leading-9 tracking-tight select-none
            `}
            style={{
              color: textColor
            }}
          >
            Sign in to your Lmao Chat account
          </h2>
        </div>

        <div className={`mt-10 sm:mx-auto sm:max-w-sm`}>
          <div id='form' className={`space-y-6`}>
            
            {/* Phone Number block */}
            <div>

              {/* Phone Number label */}
              <label
                htmlFor="phoneNumber"
                className={`
                  transition duration-[500] 
                  block text-sm font-medium leading-6 select-none
                `}
                style={{
                  color: textColor
                }}
              >
                Phone Number
              </label>

              {/* Phone Number input */}
              <div className={`mt-2`}>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  placeholder='Your Phone Number'
                  value={phoneNumber}
                  onChange={handleChangePhoneNumber}
                  required
                  className={`
                    transition duration-[500] 
                    ${theme ? 'placeholder:text-gray-400' : 'placeholder:text-white'} 
                    block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 select-none
                  `}
                  style={{
                    background: backgroundColor, 
                    color: textColor
                  }}
                />
              </div>
            </div>

            {/* Password block */}
            <div>

              {/* Password label */}
              <label
                htmlFor="password"
                className={`
                  transition duration-[500] 
                  block text-sm font-medium leading-6 select-none
                `}
                style={{
                  color: textColor
                }}
              >
                Password
              </label>

              {/* Password input */}
              <div className={`mt-2 flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
                <input
                  id="password"
                  name="password"
                  type={
                    showPassword ? "text" : "password"
                  }
                  autoComplete="current-password"
                  placeholder='Your Password'
                  value={password}
                  onChange={handleChangePassword}
                  required
                  className={`
                    transition duration-[500] 
                    ${theme ? 'placeholder:text-gray-400' : 'placeholder:text-white'} 
                    w-full shadow-sm sm:text-sm select-none focus:outline-none
                  `}
                  style={{
                    background: backgroundColor, 
                    color: textColor
                  }}
                />

                <button onClick={() => setShowPassword(!showPassword)}>
                  {
                    showPassword ? 
                      (theme === "theme1" ?
                        <EyeOff color={iconColor} /> :
                        <EyeOff color={iconColor} />) :
                      (theme === "theme1" ?
                        <Eye color={iconColor} /> :
                        <Eye color={iconColor} />)
                  }
                </button>
              </div>
            </div>

            {/* Sign up and forgot password link */}
            <div className={`flex items-center justify-between`}>

              {/* Sign up link */}
              <button
                onClick={() => {
                  // navigate('/PhoneNumberInputToSignInPage', { state: { phoneNumber } });
                  navigate('/OTPVerifyPage', {
                    state: {
                      phoneNumber, 
                      destination: "SignUpPage"
                    }
                  });
                }}
                className={`
                  text-sm font-semibold select-none
                `}
                style={{
                  color: linkColor, 
                }}
              >
                Sign up
              </button>

              {/* Forgot password link */}
              <button
                onClick={() => {
                  // navigate("/PhoneNumberInputToForgotPasswordPage", { state: { phoneNumber } });
                  navigate('/OTPVerifyPage', {
                    state: {
                      phoneNumber, 
                      destination: "ResetPasswordPage"
                    }
                  });
                }}
                className={`
                  text-sm font-semibold select-none
                `}
                style={{
                  color: linkColor, 
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Errors */}
            <div>
              <p className={`text-red-600`}>{error}</p>
            </div>

            {/* Loading */}
            {
              loading === "LOAD" ?
                <div className={`flex gap-1.5 items-center justify-center`}>
                {
                  theme === "theme1" ?
                    <LoaderCircle className={`animate-spin`} size={20} color="white" /> :
                    <LoaderCircle className={`animate-spin`} size={20} color="black" />
                }
                  <p style={{color: textColor}}>
                    Please wait while we sign in to your Lmao Chat account
                  </p>
                </div> :
                <></>
            }

            {/* Submit button */}
            <div>
              <button
                onClick={handleSignIn}
                className={`
                text-white 
                  shadow-sm px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none
                  flex w-full justify-center rounded-md 
                `}
                style={{
                  backgroundColor: buttonColor
                }}  
              >
                Sign in
              </button>
            </div>
            
          </div>

        </div>
      </div>
    
    </div>
  )
}