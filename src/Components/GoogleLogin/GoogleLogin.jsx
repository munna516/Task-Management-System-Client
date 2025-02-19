import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const GoogleLogin = () => {
  const { googleSignIn,successfulToast } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const data = await googleSignIn(googleProvider);
      navigate("/");
      successfulToast("Successfully login with Google");
    } catch (err) {}
  };
  return (
    <div>
      <div
        onClick={handleGoogleSignIn}
        className="flex cursor-pointer items-center justify-center mt-4 text-gray-600  border rounded-lg  hover:bg-gray-200 "
      >
        <div className="px-4 py-2 text-2xl  ">
          <FcGoogle />
        </div>
        <span className="px-4 py-3 font-bold text-center">
          Sign in with Google
        </span>
      </div>
    </div>
  );
};

export default GoogleLogin;
