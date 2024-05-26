import React from 'react';
import { useTheme } from '../contexts/ThemeProvider';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';

export default function SignInPage() {
  const { theme } = useTheme();

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
            Sign in to your Lmao Chat account
          </h2>
        </div>

        <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm`}>
          <form className={`space-y-6`} action="#" method="POST">
            
            {/* Email block */}
            <div>

              {/* Email label */}
              <label htmlFor="email" className={`
                transition duration-[500] 
                text-color-${theme}
                block text-sm font-medium leading-6 select-none
              `}>
                Email address
              </label>

              {/* Email input */}
              <div className={`mt-2`}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder='Your Email'
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
              <div className={`mt-2`}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder='Your Password'
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

            {/* Sign up and forgot password link */}
            <div className={`flex items-center justify-between`}>

              {/* Sign up link */}
              <a href='/PhoneNumberInputToSignInPage' className={`
                text-color-primary-${theme} 
                hover:text-color-primary-hover-${theme}
                text-sm font-semibold
                select-none
              `}>
                Sign up
              </a>

              {/* Forgot password link */}
              <a href='/PhoneNumberInputToForgotPasswordPage' className={`
                text-color-primary-${theme} 
                hover:text-color-primary-hover-${theme} 
                text-sm font-semibold 
                select-none
              `}>
                Forgot Password?
              </a>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className={`
                  bg-color-primary-${theme} 
                  hover:bg-color-primary-hover-${theme} 
                text-white 
                  shadow-sm px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none
                  flex w-full justify-center rounded-md 
              `}>
                Sign in
              </button>
            </div>
            
          </form>

        </div>
      </div>
      
    </div>
  )
}