import React, { useContext, useState } from "react";
import authBg from "../assets/authBg.jpg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";
import axios from "axios";
const SignIn = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true },
      );
      console.log(result);
      // setLoading(true);
      setLoading(false);
      setUserData(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      setUserData(null);
      // setLoading(true);
      setLoading(false);

      setErr(error.response.data.message);
    }
  };

  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <form
        className="w-[90%] h-[500px] max-w-[450px] bg-[#0000009a] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]"
        onSubmit={handleSignIn}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Sign In to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white rounded-full
         text-[18px] relative"
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px] "
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword && (
            <IoEye
              className="absolute top-[20px] right-[20px] text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}

          {showPassword && (
            <IoEyeOff
              className="absolute top-[20px] right-[20px] text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        {err.length > 0 && <p className="text-red-500 text-[17px]"> *{err}</p>}

        <button
          className="min-w-[150px] h-[60px] cursor-pointer bg-white rounded-full text-black text-[17px] font-semibold mt-[10px]"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <p className="text-white text-[18px] ">
          Want To Create a New Account ?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
