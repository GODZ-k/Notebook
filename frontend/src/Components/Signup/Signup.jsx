import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [username, setusername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisabled] = useState(false);
  const navigate = useNavigate(); // Initialize useHistory

  async function register() {
    setDisabled(true);
    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("phoneNo", phone);
    // formData.append("password", password);
    // console.log(formData)
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        {
          username: username,
          password: password,
          phoneNo: phone,
        },
        {
          headers: {
            "Content-Type": "application/Json",
          },
        }
      );

      toast.success(response.data.message, {
        position: "top-center",
        theme: "dark",
      });

      console.log(response.data.message);

      navigate("/user/verify");
      
      setTimeout(() => {
          setDisabled(false);
          // Redirect to verification page
      }, 3000);


    } catch (error) {

      toast.error("Otp sending failed", {
        position: "top-center",
        theme: "dark",
      });

      setDisabled(false);

    }
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up your account
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required
                  />
                </div>
                <div>
                  <label
                    for="Phone"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone no
                  </label>
                  <input
                    type="number"
                    name="phoneNo"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="+91"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={disable}
                  onClick={register}
                  class="w-full border-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account yet?{" "}
                  <Link
                    to="/user/login"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
