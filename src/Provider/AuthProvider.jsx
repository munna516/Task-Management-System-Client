import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google Sign In
  const googleSignIn = (googleProvider) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // User Logout
  const userLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

   // Successfull toast
   const successfulToast = (text) => {
    toast.success(text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  // Error toast
  const errorToast = (text) => {
    toast.error(text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = { user, loading, googleSignIn,successfulToast,errorToast,userLogOut };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
