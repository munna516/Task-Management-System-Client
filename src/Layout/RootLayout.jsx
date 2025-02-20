import { Navbar } from "../Components/Navbar/Navbar";
import { Footer } from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
export const RootLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="bg-primary-color text-white w-full top-0 fixed z-50 ">
          <Navbar></Navbar>
        </div>
        <div className="flex-grow w-11/12 mx-auto ">
          <Outlet></Outlet>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};
