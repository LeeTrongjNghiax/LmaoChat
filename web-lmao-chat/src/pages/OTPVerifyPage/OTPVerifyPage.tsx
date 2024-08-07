import { BaseSyntheticEvent, ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react"
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { Logo, Navbar } from "../../components";
import { UserServices } from "../../services";
import ConfigVariables from "../../ConfigVariables.js";
import GlobalStyles from "../../GlobalStyles.js";
import ExportColor, { GlobalVariables } from "../../GlobalVariables.js";

import SERVER_RESPONSE from "../../interfaces/ServerResponse.tsx";

export default function OTPVerifyPage(): ReactElement {
  const [phoneNumber, setPhoneNumber] = useState(``);
  const [otp, setOTP] = useState(``);
  const [error, setError] = useState<string | null>(``);
  const [loading, setLoading] = useState(``);
  const [step, setStep] = useState(`INPUT_PHONE_NUMBER`);
  const [result, setResult] = useState<ConfirmationResult>();
  const auth = ConfigVariables.auth;
  const navigate = useNavigate();
  const { state } = useLocation();
  const destination = state.destination;
  const sendPhoneNumberButton: HTMLButtonElement = document.querySelector(`#sendPhoneNumberButton`)!;
  const sendOTPButton: HTMLButtonElement = document.querySelector(`#sendOTPButton`)!;
  const styles = GlobalStyles();
  const status = GlobalVariables.status;

  const {
    backgroundColor,
    buttonColor,
    iconColor,
    textColor,
  } = ExportColor();

  useEffect(() => {
    if (state != null)
      if ( Object.hasOwn(state, `phoneNumber`) )
        if (state.phoneNumber !== undefined)
          setPhoneNumber(state.phoneNumber);
  }, [state]);

  const handleChangePhoneNumber = (e: BaseSyntheticEvent) => {
    setPhoneNumber(e.target.value)
  }

  const handleChangeOTP = (e: BaseSyntheticEvent) => {
    setOTP(e.target.value)
  }

  const handleVerification = () => {
    if (!phoneNumber.match(/^0[0-9]{9}$/) ) {
      setError(`Phone Number must have exatly 10 digits and start with 0`);
      return false;
    }

    return true;
  }

  const checkIfUserExist = async () => {
    const response: SERVER_RESPONSE = await UserServices.getUser(phoneNumber);

    switch (response.status) {
      case status.NO_CONTENT:
        setError(`Phone number or password is incorrect`);
        return false;
      case status.INTERNAL_SERVER_ERROR:
        setError(`Internal Server Error`);
        return false;
      case status.OK:
        setError(null);
        return true;
    }
  }

  const handleSendPhoneNumber = async () => {
    const checkUser = await checkIfUserExist();

    if ( !checkUser && destination === `ResetPasswordPage` ) {
      sendPhoneNumberButton.disabled = false;
      setError(`User with number ${phoneNumber} do not exist`);
      return;
    }

    if ( checkUser && destination === `SignUpPage` ) {
      sendPhoneNumberButton.disabled = false;
      setError(`User with number ${phoneNumber} exist`);
      return;
    }

    if (handleVerification()) {
      sendPhoneNumberButton.disabled = true;
      setLoading(`LOAD`);
      setError(null);

      let appVerifier = new RecaptchaVerifier(auth, `recaptcha-container`, {
        size: `invisible`,
      });

      signInWithPhoneNumber(auth, `+84` + phoneNumber.substring(1), appVerifier)
        .then(confirmationResult => {
          sendPhoneNumberButton.disabled = false;
          setLoading(`NOT_LOAD`);
          setError(null);
          setResult(confirmationResult);
          setStep(`VERIFY_OTP`);
        }).catch(error => {
          sendPhoneNumberButton.disabled = false;
          setLoading(`NOT_LOAD`);
          setError(`Sign in with phone number error: ${error}`);
          console.error(`Sign in with phone number error: ${error}`);
        });

      alert`Send OTP successfully!`;
    }
  }

  const handleSendOTP = () => {
    if (otp === null) return;

    sendOTPButton.disabled = true;
    setLoading(`LOAD`);
    setError(null);

    if (result !== undefined)
      result.confirm(otp).then(() => {
        sendOTPButton.disabled = false;
        setLoading(`NOT_LOAD`);
        setError(null);
        setStep(`VERIFY_SUCCESS`);
        alert`Verify OTP successfully!`;
        navigate(`/${destination}`, { state: { phoneNumber: phoneNumber } });
      })
      .catch(error => {
        sendOTPButton.disabled = false;
        setLoading(`NOT_LOAD`);
        setError(`Verify OTP error: ${error}`);
        console.error(`Verify OTP error: ${error}`);
      }); 
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
            {
              destination === `ResetPasswordPage` ?
                `Get password back in your Lmao Chat account` :
                `Sign up to your Lmao Chat account`
            }
          </h2>
        </div>

        <div className={`mt-10 sm:mx-auto sm:max-w-sm`}>
          <div id={`form`} className={`space-y-6`}>
            
            {
              step === `INPUT_PHONE_NUMBER` &&
                <>
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
                      Please input your phone number that we can send OTP code
                    </label>

                    {/* Phone Number input */}
                    <div className={`mt-2`}>
                      <input
                        id={`phoneNumber`}
                        name={`phoneNumber`}
                        type={`tel`}
                        autoComplete={`tel`}
                        maxLength={10}
                        placeholder={`Your Phone Number`}
                        value={phoneNumber}
                        onChange={handleChangePhoneNumber}
                        required
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
                          Please wait while we send the OTP code to {phoneNumber}
                        </p>
                      </div> :
                      <></>
                  }

                  {/* Submit button */}
                  <div>
                    <button
                      id={`sendPhoneNumberButton`}
                      type={`submit`}
                      onClick={handleSendPhoneNumber}
                      className={`
                      text-white  
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none px-3 py-1.5 text-sm font-semibold leading-6 flex w-full justify-center rounded-md 
                      `}
                      style={{
                        background: buttonColor
                      }}
                      title={`Send Phone Number`}
                    >
                      Send Phone Number
                    </button>
                  </div>
                </>
            }

            {
              step === `VERIFY_OTP` &&
                <>
                  {/* OTP block */}
                  <div>

                    {/* OTP label */}
                    <label 
                      htmlFor={`otp`}
                      className={`
                        transition duration-[500] 
                        block text-sm font-medium leading-6 select-none
                      `}
                      style={{
                        color: textColor
                      }}
                    >
                      Please input the OTP code that just sent to {phoneNumber}
                    </label>

                    {/* OTP input */}
                    <div className={`mt-2`}>
                      <input
                        id={`otp`}
                        name={`otp`}
                        maxLength={6}
                        placeholder={`Your OTP`}
                        value={otp}
                        onChange={handleChangeOTP}
                        required
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
                          Please wait while we verify the OTP code that sent to {phoneNumber}
                        </p>
                      </div> :
                      <></>
                  }

                  {/* Submit button */}
                  <div>
                    <button
                      id={`sendOTPButton`}
                      type={`submit`}
                      onClick={handleSendOTP}
                      className={`
                      text-white  
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 select-none px-3 py-1.5 text-sm font-semibold leading-6 flex w-full justify-center rounded-md 
                      `}
                      style={{
                        background: buttonColor
                      }}
                      title={`Send OTP`}
                    >
                      Send OTP
                    </button>
                  </div>
                </>
            }
            
          </div>

        </div>
      </div>

      <div id={`recaptcha-container`}></div>
      
    </div>
  )
}