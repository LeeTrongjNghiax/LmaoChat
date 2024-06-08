import { BaseSyntheticEvent, ReactElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import Logo from "../components/Logo.tsx";
import Navbar from "../components/Navbar.tsx";
import SERVER_RESPONSE from "../interfaces/ServerResponse.tsx";
import userService from "../services/UserServices.tsx";
import GlobalStyles from "../GlobalStyles.js";
import ExportColor, { GlobalVariables } from "../GlobalVariables.js";

export default function ResetPasswordPage(): ReactElement {
  const [password, setPassword] = useState(``);
  const [repeatedPassword, setRepeatedPassword] = useState(``);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const [error, setError] = useState<string | null>(``);
  const [loading, setLoading] = useState(``);
  const navigate = useNavigate();
  const { state } = useLocation();
  const styles = GlobalStyles();
  const status = GlobalVariables.status;
  let phoneNumber: string;

  if (state != null)
    if ( Object.hasOwn(state, `phoneNumber`) )
      phoneNumber = state.phoneNumber
    else
      phoneNumber = `0932659945`

  const {
    backgroundColor,
    buttonColor,
    iconColor,
    textColor,
  } = ExportColor();

  const handleChangePassword = (e: BaseSyntheticEvent) => {
    setPassword(e.target.value)
  }

  const handleChangeRepeatedPassword = (e: BaseSyntheticEvent) => {
    setRepeatedPassword(e.target.value)
  }

  const handleVerification = () => {
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

  const handleResetPassword = async () => {
    setError(null);

    if (handleVerification()) {
      setLoading(`LOAD`);

      const response: SERVER_RESPONSE = await userService.updateUser(phoneNumber, password, null, null);

      setLoading(`NOT_LOAD`);

      switch (response.status) {
        case status.INTERNAL_SERVER_ERROR:
          setError(`Internal Server Error`);
          break;
        case status.OK:
          setError(null);
          alert`Reset password successfully!`;
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
            Reset password of your Lmao Chat account
          </h2>
        </div>

        <div className={`mt-10 sm:mx-auto sm:max-w-sm`}>
          <div id={`form`} className={`space-y-6`}>

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
                  onClick={() => setShowPassword(!showPassword)}
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
                Repeat Password
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
                  onClick={() => setShowRepeatedPassword(!showRepeatedPassword)}
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
                    Please wait while we reset password of your Lmao Chat account
                  </p>
                </div> :
                <></>
            }

            {/* Submit button */}
            <div>
              <button
                onClick={handleResetPassword}
                className={`
                text-white 
                  px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none
                  flex w-full justify-center rounded-md 
                `}
                style={{
                  background: buttonColor
                }}
                title={`Reset Password`}
              >
                Reset Password
              </button>
            </div>
            
          </div>

        </div>
      </div>
    
    </div>
  )
}