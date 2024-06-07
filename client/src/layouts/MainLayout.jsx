import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const MainLayout = () => {
  return (
    <div
      className="bg-custom-bg bg-center bg-no-repeat bg-fixed min-h-screen flex flex-col"
      style={{
        backgroundSize: "cover", // Use 'cover' to ensure the background covers the entire area
        "@media (max-width: 640px)": {
          backgroundSize: "contain", // Use 'contain' for smaller screens to ensure the image fits well
        },
      }}
    >
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default MainLayout;
