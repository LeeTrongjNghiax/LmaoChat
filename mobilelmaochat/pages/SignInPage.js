/*
  * Used by 
  *   index.js
*/

import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react-native';
// import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '../contexts/ThemeProvider';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';

import userService from '../services/UserServices';
import { Button, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

/*
 * @param password: string
 */
export default function SignInPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  // const { theme } = useTheme();
  const theme = "theme1";
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  // const state = null;

  useEffect(() => {
    // if (state.state != null) {
    //   if ( Object.hasOwn(state.state, 'phoneNumber') )
    //     setPhoneNumber(state.state.phoneNumber);

    //   if ( Object.hasOwn(state.state, 'password') )
    //     setPassword(state.state.password);
    // }
  }, []);

  const handleChangePhoneNumber = e => {
    setPhoneNumber(e.target.value)
  }

  const handleChangePassword = e => {
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
    }
  }
  
  return (
    <ScrollView>
      <View className={`
        transition duration-[500] 
        bg-color-${theme}
        flex min-h-screen flex-col justify-center
      `}>
        <Navbar />

        <View className={`px-6 py-12 flex-1`}>
          
          {/* Logo and title */}
          <View className={`sm:mx-auto sm:max-w-sm`}>
            
            {/* Logo */}
            <Logo />

            {/* Title */}
            <Text className={`
              transition duration-[500] 
              text-color-${theme}
              mt-10 text-center text-2xl font-bold leading-9 tracking-tight select-none
            `}>
              Sign in to your Lmao Chat account
            </Text>
          </View>

          <View className={`mt-10 sm:mx-auto sm:max-w-sm`}>
            <View id='form' className={`space-y-6`}>
              
              {/* Phone Number block */}
              <View>

                {/* Phone Number Text */}
                <Text htmlFor="phoneNumber" className={`
                  transition duration-[500] 
                  text-color-${theme}
                  block text-sm font-medium leading-6 select-none
                `}>
                  Phone Number
                </Text>

                {/* Phone Number TextInput */}
                <View className={`mt-2`}>
                  <TextInput
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
                      text-color-${theme}
                      bg-color-${theme}
                      ${theme ? 'placeholder:text-gray-400' : 'placeholder:text-white'} 
                      block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 select-none
                    `}
                  />
                </View>
              </View>

              {/* Password block */}
              <View>

                {/* Password Text */}
                <Text htmlFor="password" className={`
                  transition duration-[500] 
                  text-color-${theme}
                  block text-sm font-medium leading-6 select-none
                `}>
                  Password
                </Text>

                {/* Password TextInput */}
                <View className={`mt-2 flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
                  <TextInput
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

                  <Pressable title='Toggle Password' onPress={() => setShowPassword(!showPassword)}>
                    {
                      showPassword ? 
                        (theme === "theme1" ?
                          <EyeOff color="white" /> :
                          <EyeOff color="black" />) :
                        (theme === "theme1" ?
                          <Eye color="white" /> :
                          <Eye color="black" />)
                    }
                  </Pressable>
                </View>
              </View>

              {/* Sign up and forgot password link */}
              <View className={`flex items-center justify-between`}>

                {/* Sign up link */}
                <Pressable
                  title='Sign Up'
                  onPress={() => {
                    // navigate('/OTPVerifyPage', {
                    //   state: {
                    //     phoneNumber, 
                    //     destination: "SignUpPage"
                    //   }
                    // });
                  }}
                  className={`
                    text-color-primary-${theme} 
                    hover:text-color-primary-hover-${theme}
                    text-sm font-semibold
                    select-none
                    cursor-pointer
                  `}
                >
                  <Text>Sign up</Text>
                </Pressable>

                {/* Forgot password link */}
                <Pressable
                  title='Forgot Password'
                  onPress={() => {
                    // navigate('/OTPVerifyPage', {
                    //   state: {
                    //     phoneNumber, 
                    //     destination: "ResetPasswordPage"
                    //   }
                    // });
                  }}
                  className={`
                    text-color-primary-${theme} 
                    hover:text-color-primary-hover-${theme} 
                    text-sm font-semibold 
                    select-none
                    cursor-pointer
                  `}
                >
                  <Text>Forgot Password?</Text>
                </Pressable>
              </View>

              {/* Errors */}
              <View>
                <Text className={`text-red-600`}>{error}</Text>
              </View>

              {/* Loading */}
              {
                loading === "LOAD" ?
                  <View className={`flex gap-1.5 items-center justify-center`}>
                  {
                    theme === "theme1" ?
                      <LoaderCircle className={`animate-spin`} size={20} color="white" /> :
                      <LoaderCircle className={`animate-spin`} size={20} color="black" />
                  }
                    <Text className={`text-color-${theme}`}>
                      Please wait while we sign in to your Lmao Chat account
                    </Text>
                  </View> :
                  <></>
              }

              {/* Submit Button */}
              <View>
                <Pressable
                  title='Sign In'
                  onPress={handleSignIn}
                  className={`
                    bg-color-primary-${theme} 
                    hover:bg-color-primary-hover-${theme} 
                  text-white 
                    shadow-sm px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none
                    flex w-full justify-center rounded-md 
                `}>
                  <Text>Sign in</Text>
                </Pressable>
              </View>
              
            </View>

          </View>
        </View>
      
      </View>
    </ScrollView>
  )
}