/*
  * Used by 
  *   index.js
*/

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '../contexts/ThemeProvider';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';

import userService from '../services/UserServices';

/*
 * @param phoneNumber: string
 */
export default function SignUpPage() {
  const [firstName, setFirstName] = useState("Le");
  const [lastName, setLastName] = useState("Nghia");
  const [password, setPassword] = useState("11111111");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const [repeatedPassword, setRepeatedPassword] = useState("11111111");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { state } = useLocation();
  const phoneNumber = state ? state.phoneNumber : "";
  const navigate = useNavigate();

  const handleFirstName = e => {
    setFirstName(e.target.value)
  }

  const handleLastName = e => {
    setLastName(e.target.value)
  }

  const handleChangePassword = e => {
    setPassword(e.target.value)
  }

  const handleChangeRepeatedPassword = e => {
    setRepeatedPassword(e.target.value)
  }

  const handleVerification = () => {
    if (!firstName) {
      setError("First name must not be null");
      return false;
    }

    if ( !firstName.match(/^[A-Z][a-z]*$/) ) {
      setError("First name must start with uppercase character and cannot contain numbers");
      return false;
    }

    if (!lastName) {
      setError("Last name must not be null");
      return false;
    }

    if ( !lastName.match(/^[A-Z][a-z]*$/) ) {
      setError("Last name must start with uppercase character and cannot contain numbers");
      return false;
    }

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
  
  const handleSignUp = async () => {
    if (handleVerification()) {
      await userService.addUser(phoneNumber, firstName, lastName, password);
      alert`Sign Up successfully!`;
      navigate("/", { state: { phoneNumber, password } })
    }
  }
  
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
            Sign up to your Lmao Chat account
          </h2>
        </div>

        <div className={`mt-10 sm:mx-auto sm:max-w-sm`}>
          <div id='form' className={`space-y-6`}>

            {/* Phone Number block */}
            <div>

              {/* Phone Number label */}
              <label htmlFor="phoneNumber" className={`
                transition duration-[500] 
                text-color-${theme}
                block text-sm font-medium leading-6 select-none
              `}>
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
                  readOnly
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
            
            {/* First Name block */}
            <div>

              {/* First Name label */}
              <label htmlFor="firstName" className={`
                transition duration-[500] 
                text-color-${theme}
                block text-sm font-medium leading-6 select-none
              `}>
                First Name
              </label>

              {/* First Name input */}
              <div className={`mt-2`}>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="name"
                  placeholder='Your First Name'
                  value={firstName}
                  onChange={handleFirstName}
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

            {/* Last Name block */}
            <div>

              {/* Last Name label */}
              <label htmlFor="lastName" className={`
                transition duration-[500] 
                text-color-${theme}
                block text-sm font-medium leading-6 select-none
              `}>
                Last Name
              </label>

              {/* Last Name input */}
              <div className={`mt-2`}>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="name"
                  placeholder='Your Last Name'
                  value={lastName}
                  onChange={handleLastName}
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
                    text-color-${theme}
                    bg-color-${theme}
                    ${theme ? 'placeholder:text-gray-400' : 'placeholder:text-white'} 
                    w-full shadow-sm sm:text-sm select-none focus:outline-none
                  `}
                />

                <button onClick={() => setShowPassword(!showPassword)}>
                  {
                    showPassword ? 
                      (theme === "theme1" ?
                        <EyeOff color="white" /> :
                        <EyeOff color="black" />) :
                      (theme === "theme1" ?
                        <Eye color="white" /> :
                        <Eye color="black" />)
                  }
                </button>
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
                Password
              </label>

              {/* Repeated Password input */}
              <div className={`mt-2 flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
                <input
                  id="repeatedPassword"
                  name="repeatedPassword"
                  type={
                    showRepeatedPassword ? "text" : "password"
                  }
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
                    w-full shadow-sm sm:text-sm select-none focus:outline-none
                  `}
                />

                <button onClick={() => setShowRepeatedPassword(!showRepeatedPassword)}>
                  {
                    showRepeatedPassword ? 
                      (theme === "theme1" ?
                        <EyeOff color="white" /> :
                        <EyeOff color="black" />) :
                      (theme === "theme1" ?
                        <Eye color="white" /> :
                        <Eye color="black" />)
                  }
                </button>
              </div>
            </div>

            {/* Errors */}
            <div>
              <p className={`text-red-600`}>{error}</p>
            </div>

            {/* Submit button */}
            <div>
              <button
                // type="submit"
                onClick={handleSignUp}
                className={`
                  bg-color-primary-${theme} 
                  hover:bg-color-primary-hover-${theme} 
                text-white 
                  shadow-sm px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none
                  flex w-full justify-center rounded-md 
              `}>
                Sign up
              </button>
            </div>
            
          </div>

        </div>
      </div>
    
    </div>
  )
}