import Card from "../components/Card";
import image1 from "../assets/img1.jpg";
import image2 from "../assets/img2.jpg";
import image3 from "../assets/img3.jpg";
import image4 from "../assets/img4.jpg";
import image5 from "../assets/img5.jpg";
import image6 from "../assets/img6.jpg";
import image7 from "../assets/img7.jpg";
import { RiImageAddLine } from "react-icons/ri";
import { useContext, useRef, useState } from "react";
import { userDataContext } from "../context/userContext";
import { MdArrowBack } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const Customize = () => {
  const {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);
  const navigate = useNavigate();
  const inputImage = useRef();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#03034ddc] flex justify-center items-center flex-col p-[20px] ">
      <MdArrowBack
        className="absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h1 className="text-white text-[30px] mb-[40px] text-center">
        Select Your <span className="text-blue-500">Assistant Image</span>
      </h1>
      <div className="w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />
        <div
          className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#0000ff51] border-2 
                   border-[#0000ff2f] rounded-2xl overflow-hidden
                     hover:shadow-2xl  cursor-pointer
                      hover:border-4 hover:border-white flex items-center justify-center ${selectedImage == "input" ? "border-4 border-white shadow-2xl shadow-blue-950" : null}`}
          onClick={() => {
            inputImage.current?.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && (
            <RiImageAddLine className="text-white w-[25px] h-[25px]" />
          )}
          {frontendImage && (
            <img src={frontendImage} className="h-full object-cover" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>
      {selectedImage && (
        <button
          className="min-w-[150px] h-[60px] mt-[30px] cursor-pointer bg-white rounded-full text-black text-[19px] font-semibold "
          onClick={() => navigate("/customize2")}
        >
          Next
        </button>
      )}
    </div>
  );
};
export default Customize;
