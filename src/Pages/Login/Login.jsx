import Lottie from "lottie-react";
import loginLottie from "../../assets/LottieFiles/LoginLottie.json";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";

const Login = () => {
  return (
    <>
      <div className="flex flex-col justify-center min-h-[calc(100vh-306px)] items-center mt-32 mb-14 px-3 ">
        <p className="mt-3 text-xl md:text-2xl lg:text-3xl text-center font-bold text-primary-color mb-5">
          Welcome To Task-Management System !
        </p>
        <div className="md:flex rounded-lg shadow-lg bg-slate-200">
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 flex justify-center items-center">
            <GoogleLogin></GoogleLogin>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <Lottie animationData={loginLottie}></Lottie>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// flex justify-center items-center  mt-36 mb-14
