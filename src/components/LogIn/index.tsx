import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useAuth } from '@src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import logo from '/logo.svg';

function Login() {
  const [otp, setOtp] = React.useState('');
  const { Login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (newValue) => {
    setOtp(newValue);
    if (newValue?.length == 5 && newValue !== otp) {
      Login({ code: newValue }).then(() => {
        navigate('/');
      });
    }
  };

  if (isLoggedIn()) {
    navigate('/');
    return <></>;
  }
  return (
    <div className=" h-[100vh] flex flex-col gap-5 justify-center items-center px-2 md:px-10 ">
      <img src={logo} alt="" className=" h-[150px]" />
      {/* Please Enter the Code to proceed */}
      <h1 className=" text-lg md:text-3xl text-center text-primary">
        Bitte geben Sie den Code ein, um fortzufahren
      </h1>
      <div className=" max-w-[650px]">
        <MuiOtpInput value={otp} onChange={handleChange} length={5} />
      </div>
    </div>
  );
}

export default Login;
