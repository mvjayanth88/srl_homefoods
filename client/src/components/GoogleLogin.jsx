import { GoogleLogin } from '@react-oauth/google';

  const Login = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log('Success:', credentialResponse);
        setLoginSuccess(true);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};


export default Login;