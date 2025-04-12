import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);

  const onSubmit = (data: any) => {
    console.log(data);
    navigate('/users');
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-black"
        style={{
          backgroundImage: "url('/auth/signup-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md mx-4 bg-black rounded-lg p-8">
          <h2 className="text-center text-2xl font-bold text-white mb-8 font-['Space_Grotesk']">
            <span className="text-white relative">
             <span className="text-[#FF02A2]">Login</span> Here
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF02A2]"></div>
            </span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-[#959092] font-['Space_Grotesk'] text-base mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="abc@xyz.com..."
                className="w-full h-12 rounded-lg border border-[#FF02A2] px-5 py-3.5 bg-white text-black font-['Space_Grotesk'] focus:outline-none"
                {...register("email", { 
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">Valid email is required</span>
              )}
            </div>

            <div>
              <label className="block text-[#959092] font-['Space_Grotesk'] text-base mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="type here..."
                  className="w-full h-12 rounded-lg border border-[#FF02A2] px-5 py-3.5 bg-white text-black font-['Space_Grotesk'] focus:outline-none"
                  {...register("password", { required: true })}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-4"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FaEyeSlash className="text-gray-600" />
                  ) : (
                    <FaEye className="text-gray-600" />
                  )}
                </button>
              </div>
              <div className="mt-1">
                <a href="#" className="text-[#959092] text-sm font-['Space_Grotesk'] hover:text-[#FF02A2]">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-white text-black font-['Space_Grotesk'] hover:bg-gray-100 !mt-6"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;