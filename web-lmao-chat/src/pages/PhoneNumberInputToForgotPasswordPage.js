import { useTheme } from '../contexts/ThemeProvider';
import Navbar from '../components/Navbar';
import React from 'react';
import Logo from '../components/Logo';

export default function PhoneNumberInputToForgotPasswordPage() {
  const { theme } = useTheme();

  return (
    <div class={`
      transition duration-[500] 
      bg-color-${theme}
      flex min-h-screen flex-col justify-center
    `}>
      <Navbar />

      <div className={`px-6 py-12 lg:px-8 flex-1`}>
        
        {/* Logo and title */}
        <div class={`sm:mx-auto sm:w-full sm:max-w-sm`}>
          
          {/* Logo */}
          <Logo />

          {/* Title */}
          <h2 class={`
            transition duration-[500] 
            text-color-${theme}
            mt-10 text-center text-2xl font-bold leading-9 tracking-tight select-none
          `}>
            Get password back in your Lmao Chat account
          </h2>
        </div>

        <div class={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm`}>
          <form class={`space-y-6`} action="#" method="POST">
            
            {/* OTP block */}
            <div>

              {/* OTP label */}
              <label for="otp" class={`
                transition duration-[500] 
                text-color-${theme}
                block text-sm font-medium leading-6 select-none
              `}>
                Please input your phone number that we can send OTP code
              </label>

              {/* OTP input */}
              <div class={`mt-2`}>
                <input
                  id="otp"
                  name="otp"
                  type="tel"
                  autocomplete="tel"
                  required
                  placeholder='Your phone number'
                  class={`
                    transition duration-[500] 
                    text-color-${theme}
                    bg-color-${theme}
                    ${theme ? 'placeholder:text-gray-400' : 'placeholder:text-white'} 
                    block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 select-none
                  `}
                />
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                class={`
                  flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none
              `}>
                Send OTP
              </button>
            </div>
            
          </form>

        </div>
      </div>
      
    </div>
  )
}