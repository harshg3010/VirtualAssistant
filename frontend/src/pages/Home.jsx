import { useContext } from "react";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import voice_image1 from "../assets/voice_image1.gif";
import voice_image2 from "../assets/voice_image2.gif";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);

  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isProcessingRef = useRef(false);
  const [ham, setHam] = useState(false);
  const isRecognizingRef = useRef(false);
  const synth = window.speechSynthesis;

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  const startRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start();
        // console.log("Recognition requested to start");
      } catch (error) {
        if (error.name !== "InvalidStateError") {
          console.log("Start Error : ", error);
        }
      }
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang === "hi-IN");
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    isSpeakingRef.current = true;

    utterance.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;
      setTimeout(() => {
        startRecognition();
      }, 800);
    };
    synth.cancel();
    synth.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if (type === "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    if (type === "calculator_open") {
      window.open("https://www.google.com/search?q=calculator", "_blank");
    }

    if (type === "facebook_open") {
      window.open("https://www.facebook.com", "_blank");
    }

    if (type === "instagram_open") {
      window.open("https://www.instagram.com", "_blank");
    }

    if (type === "weather_show") {
      window.open(`https://www.google.com/search?q=weather`, "_blank");
    }

    if (type === "youtube_search") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank",
      );
    }

    if (type === "youtube_play") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank",
      );
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // console.log("Speech Recognition Not Supported");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognitionRef.current = recognition;
    let isMounted = true;

    const startTimeout = setTimeout(() => {
      if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          // console.log("Recognition Requested to get Started");
        } catch (e) {
          if (e.name !== "InvalidStateError") {
            console.log(e);
          }
        }
      }
    }, 1000);

    

    recognition.onstart = () => {
      console.log("recognition Started");
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log("Recognition Ended");

      isRecognizingRef.current = false;
      setListening(false);

      // 🔥 prevent restart during speaking or API call
      if (isSpeakingRef.current || isProcessingRef.current) return;

      setTimeout(() => {
        try {
          recognition.start();
          console.log("Recognition reStarted");
        } catch (e) {
          if (e.name !== "InvalidStateError") {
            console.log(e);
          }
        }
      }, 1200);
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();

      console.log("Heard:", transcript);

      // wait until assistant name is said
      const lowerText = transcript.toLowerCase();
      const assistant = userData?.assistantName?.toLowerCase();

      // only trigger if assistant name is FIRST detected
      if (!assistant || !lowerText.includes(assistant)) return;

      // remove assistant name from actual command
      const cleanCommand = lowerText.replace(assistant, "").trim();
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      setAiText("");
      setUserText(transcript);

      recognition.stop();
      isRecognizingRef.current = false;
      setListening(false);

      try {
        console.log("Sending Gemini Request:", cleanCommand);
        const data = await getGeminiResponse(cleanCommand);
        handleCommand(data);
        setAiText(data.response);
        setUserText("");
      } catch (err) {
        console.log(err);
      }

      isProcessingRef.current = false;
    };


    const greeting = new SpeechSynthesisUtterance(
      `Hello ${userData.name}, I am ${userData.assistantName}. Please say my name before every request. How can I help you?`,
    );
    greeting.lang = "hi-IN";
    window.speechSynthesis.speak(greeting);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
    };
  }, []);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#03034ddc] flex justify-center items-center flex-col gap-[15px] overflow-hidden">
      <IoMenu
        className="lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]"
        onClick={() => {
          setHam(true);
        }}
      />
      <div
        className={`absolute lg:hidden top-0 w-full h-full bg-[#0000006d] backdrop-blur-lg  p-[20px] flex flex-col gap-[20px] items-center  ${ham ? "translate-x-0" : "translate-x-full"} transition-transform`}
      >
        <RxCross1
          className=" text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]"
          onClick={() => {
            setHam(false);
          }}
        />
        <button
          className="min-w-[150px] h-[60px]  text-black cursor-pointer bg-white rounded-full text-black text-[19px] font-semibold "
          onClick={handleLogout}
        >
          Log Out
        </button>
        <button
          className="min-w-[150px] h-[60px] cursor-pointer bg-white rounded-full text-black text-[19px] font-semibold  px-[20px] py-[10px]"
          onClick={() => navigate("/customize")}
        >
          {" "}
          Customize Your Assistant
        </button>
        <div className="w-full h-[20px] bg-gray-400"></div>
        <h1 className="text-white text-[19px] font-semibold">History</h1>
        <div className="w-full h-[400px] gap-[20px] overflow-y-auto flex flex-col">
          {userData.history?.map((his, index) => (
            <span className="text-white text-[18px] truncate" key={index}>
              {his}
            </span>
          ))}
        </div>
      </div>
      <button
        className="min-w-[180px] h-[60px] absolute hidden lg:flex top-[20px] right-[20px] bg-white rounded-full text-black text-[19px] font-semibold items-center justify-start px-6 cursor-pointer"
        onClick={handleLogout}
      >
        Log Out
      </button>

      <button
        className="min-w-[280px] h-[60px] absolute hidden lg:flex top-[110px] right-[20px] bg-white rounded-full text-black text-[19px] font-semibold items-center justify-start px-6 cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize Your Assistant
      </button>
      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover border rounded-2xl"
        />
      </div>
      <h1 className="text-white text-[18px] font-semibold">
        {" "}
        I'm {userData?.assistantName}
      </h1>
      {!aiText && (
        <img
          src={voice_image2}
          alt=""
          className="w-[200px] border rounded-2xl "
        />
      )}
      {aiText && (
        <img
          src={voice_image1}
          alt=""
          className="w-[200px] border rounded-2xl"
        />
      )}

      <h1 className="text-white text-[18px] font-semibold text-wrap">
        {" "}
        {userText ? userText : aiText ? aiText : null}
      </h1>
    </div>
  );
};
export default Home;
