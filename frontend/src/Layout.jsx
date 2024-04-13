import { Outlet } from "react-router-dom";
import { Header, Footer } from "./Components/index.js";

//tost
import { ToastContainer ,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer
        position="top-center"
        theme="dark"
      />
      <Footer />
    </>
  );
}

export default Layout;
