import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  const [user, setUser] = useState("");
const navigate = useNavigate()

  const accessToken = document.cookie ?document.cookie.split(" ")[0].split("=")[1].split(";")[0] : null
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users/current-user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUser(response.data.data.username);
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      });
  }, []);


   function logoutUser(){
    console.log(accessToken)
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("User logged out successfully")
    navigate("/user/login")
    //  axios.post('http://localhost:3000/api/v1/users/logout',{
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    // }).then((response)=> console.log(accessToken))
  }

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          {user ? (
            <div className="flex items-center lg:order-2">
              <Link
                onClick={logoutUser}
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Logout {user}
              </Link>
            </div>
          ) : (
            <div className="flex items-center lg:order-2">
              <Link
                to="/user/login"
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log in
              </Link>
              <Link
                to="/user/signup"
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Get started
              </Link>
            </div>
          )}
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b ${
                      isActive ? "text-orange-700" : "text-gray-800"
                    } border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b ${
                      isActive ? "text-orange-700" : "text-gray-800"
                    } border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Add
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
