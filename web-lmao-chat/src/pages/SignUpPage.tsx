import { BaseSyntheticEvent, ReactElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import Logo from "../components/Logo.tsx";
import Navbar from "../components/Navbar.tsx";
import SERVER_RESPONSE from "../interfaces/ServerResponse.tsx";
import userService from "../services/UserServices.tsx";
import GlobalStyles from "../GlobalStyles.js";
import ExportColor, { GlobalVariables } from "../GlobalVariables.js";

export default function SignUpPage(): ReactElement {
  const [firstName, setFirstName] = useState(`Le`);
  const [lastName, setLastName] = useState(`Nghia`);
  const [password, setPassword] = useState(`11111111`);
  const [showPassword, setShowPassword] = useState(false);
  const [repeatedPassword, setRepeatedPassword] = useState(`11111111`);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const [error, setError] = useState<string | null>(``);
  const [loading, setLoading] = useState(``);
  const { state } = useLocation();
  const phoneNumber = state ? state.phoneNumber : ``;
  const navigate = useNavigate();
  const styles = GlobalStyles();
  const status = GlobalVariables.status;

  const {
    backgroundColor,
    buttonColor,
    iconColor,
    textColor,
  } = ExportColor();

  const handleFirstName = (e: BaseSyntheticEvent) => {
    setFirstName(e.target.value)
  }

  const handleLastName = (e: BaseSyntheticEvent) => {
    setLastName(e.target.value)
  }

  const handleChangePassword = (e: BaseSyntheticEvent) => {
    setPassword(e.target.value)
  }

  const handleChangeRepeatedPassword = (e: BaseSyntheticEvent) => {
    setRepeatedPassword(e.target.value)
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleShowRepeatedPassword = () => {
    setShowRepeatedPassword(!showRepeatedPassword);
  }

  const handleVerification = () => {
    if (!firstName) {
      setError(`First name must not be null`);
      return false;
    }

    if ( !firstName.match(/^[A-Z][a-z]*$/) ) {
      setError(`First name must start with uppercase character and cannot contain numbers`);
      return false;
    }

    if (!lastName) {
      setError(`Last name must not be null`);
      return false;
    }

    if ( !lastName.match(/^[A-Z][a-z]*$/) ) {
      setError(`Last name must start with uppercase character and cannot contain numbers`);
      return false;
    }

    const passwordMinCharacters = 8;
    if ( !(password.length >= passwordMinCharacters) ) {
      setError(`Password must have at least ${passwordMinCharacters} characters`);
      return false;
    }

    if ( !(password === repeatedPassword) ) {
      setError(`Password and Repeated password must be the same`);
      return false;
    }

    return true;
  }
  
  const handleSignUp = async () => {
    setError(null);
    
    if (handleVerification()) {
      setLoading(`LOAD`);

      const response: SERVER_RESPONSE = await userService.addUser(phoneNumber, firstName, lastName, password);
      
      setLoading(`NOT_LOAD`);

      switch (response.status) {
        case status.INTERNAL_SERVER_ERROR:
          setError(`Internal Server Error`);
          break;
        case status.CONFLICT:
          setError(`Cannot sign up new user. Existing user with number ${phoneNumber}`);
          break;
        case status.ACCEPTED:
          setError(`Sign up failed!`);
          break;
        case status.OK:
          setError(null);
          alert`Sign Up successfully!`;
          navigate(`/`, { state: { phoneNumber, password } });
      }
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

      <div className={`px-6 py-12 lg:px-8 flex-1`}>
        
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
            Sign up to your Lmao Chat account
          </h2>
        </div>

        <div className={`mt-10 sm:mx-auto sm:max-w-sm`}>
          <div id={`form`} className={`space-y-6`}>

            {/* Phone Number block */}
            <div>

              {/* Phone Number label */}
              <label
                htmlFor={`phoneNumber`}
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
                  id={`phoneNumber`}
                  name={`phoneNumber`}
                  type={`tel`}
                  autoComplete={`tel`}
                  placeholder={`Your Phone Number`}
                  value={phoneNumber}
                  readOnly
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    block w-full rounded-md border-0 p-1.5 ring-1 ring-gray-300 sm:text-sm sm:leading-6 select-none
                  `}
                  style={
                    styles.input
                  }
                />
              </div>
            </div>
            
            {/* First Name block */}
            <div>

              {/* First Name label */}
              <label
                htmlFor={`firstName`}
                className={`
                  transition duration-[500] 
                  block text-sm font-medium leading-6 select-none
                `}
                style={{
                  color: textColor
                }}
              >
                First Name
              </label>

              {/* First Name input */}
              <div className={`mt-2`}>
                <input
                  id={`firstName`}
                  name={`firstName`}
                  type={`text`}
                  autoComplete={`name`}
                  placeholder={`Your First Name`}
                  value={firstName}
                  onChange={handleFirstName}
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    block w-full rounded-md border-0 p-1.5 ring-1 ring-gray-300 sm:text-sm sm:leading-6 select-none
                  `}
                  style={
                    styles.input
                  }
                />
              </div>
            </div>

            {/* Last Name block */}
            <div>

              {/* Last Name label */}
              <label
                htmlFor={`lastName`}
                className={`
                  transition duration-[500] 
                  block text-sm font-medium leading-6 select-none
                `}
                style={{
                  color: textColor
                }}
              >
                Last Name
              </label>

              {/* Last Name input */}
              <div className={`mt-2`}>
                <input
                  id={`lastName`}
                  name={`lastName`}
                  type={`text`}
                  autoComplete={`name`}
                  placeholder={`Your Last Name`}
                  value={lastName}
                  onChange={handleLastName}
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    block w-full rounded-md border-0 p-1.5 ring-1 ring-gray-300 sm:text-sm sm:leading-6 select-none
                  `}
                  style={
                    styles.input
                  }
                />
              </div>
            </div>

            {/* Password block */}
            <div>

              {/* Password label */}
              <label
                htmlFor={`password`}
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
                  id={`password`}
                  name={`password`}
                  type={
                    showPassword ? `text` : `password`
                  }
                  autoComplete={`current-password`}
                  placeholder={`Your Password`}
                  value={password}
                  onChange={handleChangePassword}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    w-full sm:text-sm select-none focus:outline-none
                  `}
                  style={
                    styles.input
                  }
                />

                <button
                  onClick={handleShowPassword}
                  title={`Toggle Password`}
                >
                  {
                    showPassword ? 
                      <EyeOff color={iconColor} /> :
                      <Eye color={iconColor} />
                  }
                </button>
              </div>
            </div>

            {/* Repeated Password block */}
            <div>

              {/* Repeated Password label */}
              <label
                htmlFor={`repeatedPassword`}
                className={`
                  transition duration-[500] 
                  block text-sm font-medium leading-6 select-none
                `}
                style={{
                  color: textColor
                }}
              >
                Repeated Password
              </label>

              {/* Repeated Password input */}
              <div className={`mt-2 flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
                <input
                  id={`repeatedPassword`}
                  name={`repeatedPassword`}
                  type={
                    showRepeatedPassword ? `text` : `password`
                  }
                  autoComplete={`current-password`}
                  placeholder={`Repeated Password`}
                  value={repeatedPassword}
                  onChange={handleChangeRepeatedPassword}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    w-full sm:text-sm select-none focus:outline-none
                  `}
                  style={
                    styles.input
                  }
                />

                <button
                  onClick={handleShowRepeatedPassword}
                  title={`Toggle Repeated Password`}
                >
                  {
                    showRepeatedPassword ? 
                      <EyeOff color={iconColor} /> :
                      <Eye color={iconColor} />
                  }
                </button>
              </div>
            </div>

            {/* Errors */}
            <div>
              <p className={`text-red-600`}>{error}</p>
            </div>

            {/* Loading */}
            {
              loading === `LOAD` ?
                <div className={`flex gap-1.5 items-center justify-center`}>
                  <LoaderCircle className={`animate-spin`} size={20} color={iconColor} />

                  <p style={{color: textColor}}>
                    Please wait while we sign up to your Lmao Chat account
                  </p>
                </div> :
                <></>
            }

            {/* Submit button */}
            <div>
              <button
                // type="submit"
                onClick={handleSignUp}
                className={`
                text-white 
                  px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none
                  flex w-full justify-center rounded-md 
                `}
                style={{
                  background: buttonColor
                }}
                title={`Sign Up`}
              >
                Sign up
              </button>
            </div>
            
          </div>

        </div>
      </div>
    
    </div>
  )
}