import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../apis/auth";
import toast from "react-hot-toast";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res:any = await login(data);
      if(res?.data?.success === true) {
        localStorage.setItem("token", res?.data?.token);
        toast.success("Login successful");
        navigate("/performers");
      } else {
        toast.error(res?.error?.data?.error);
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
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
              className="w-full h-12 rounded-lg bg-white text-black font-['Space_Grotesk'] hover:bg-gray-100 !mt-6 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;