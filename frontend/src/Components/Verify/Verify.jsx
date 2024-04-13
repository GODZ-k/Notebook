import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link , useNavigate} from "react-router-dom";

function Verify() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()

  async function verify() {
try {
    const response =  await axios.post("http://localhost:3000/api/v1/users/verify",
      {
        otp: otp,
      },
      {
        headers: {
          "Content-Type": "application/Json",
        },
      }
    );

    console.log(response)

    toast.success(response.data.message, {
        position: "top-center",
        theme: "dark",
      });
      
      navigate("/user/login")

} catch (error) {
    
    toast.error("User authentication failed", {
        position: "top-center",
        theme: "dark",
      });
}
  
  }

  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Verify your account
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                action="#"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    name="otp"
                    id="otp"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Please enter your otp"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  onClick={verify}
                  class="w-full border-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Verify;
