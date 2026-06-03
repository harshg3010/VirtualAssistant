# 🎙️ AI Voice Assistant

An AI-powered voice-enabled virtual assistant built using the **MERN Stack** and **Google Gemini API**. The assistant listens for a custom wake word, understands natural language commands, performs web actions, and responds using speech synthesis in real time.

---

## 🚀 Features

* 🎤 Voice Recognition using Web Speech API
* 🧠 AI-powered responses powered by Google Gemini
* 🔑 Custom Assistant Name (Wake Word Detection)
* 🔊 Real-Time Text-to-Speech Responses
* 📅 Date, Time, Day & Month Queries
* 🔎 Google Search Integration
* ▶️ YouTube Search & Video Playback
* ☁️ Weather Information Support
* 🧮 Calculator Launch Support
* 📱 Open Instagram & Facebook via Voice Commands
* 👤 JWT Authentication with Secure Cookies
* 📝 Conversation History Tracking
* 🎨 Assistant Name & Avatar Customization
* ☁️ Cloudinary Image Upload Support
* 📱 Fully Responsive UI

---

## 🏗️ System Architecture

```text
User Voice
     ↓
Speech Recognition
     ↓
React Frontend
     ↓
Express Backend API
     ↓
Google Gemini API
     ↓
Intent Detection
     ↓
Action Execution
     ↓
Speech Synthesis Response
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Icons
* Web Speech API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser
* Multer

### AI & Cloud Services

* Google Gemini API
* Cloudinary

### Database

* MongoDB Atlas

---

## 📂 Project Structure

```text
project-root
│
├── client
│   ├── src
│   ├── assets
│   ├── pages
│   ├── context
│   └── components
│
├── server
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── config
│   └── index.js
│
└── README.md
```

---

## 📦 Installation

### Clone Repository

```bash
git clone <repository-url>
cd project-folder
```

### Install Dependencies

```bash
npm install
```

---

## ▶️ Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## ▶️ Run Backend

### Development Mode

```bash
nodemon index.js
```

### Production Mode

```bash
node index.js
```

Backend runs on:

```text
http://localhost:5000
```

---

## 🎯 Example Voice Commands

```text
Alexa what is today's date?

Alexa what time is it?

Alexa search React Hooks on Google

Alexa play Believer on YouTube

Alexa open Instagram

Alexa show weather

Alexa who created you?
```

---

## 🔒 Security Features

* JWT Authentication
* HTTP-Only Cookies
* Protected Routes
* Environment Variable Protection
* Secure Password Storage
* Session Management

---

## 📸 Screenshots

### Home Screen

(Add Screenshot Here)

### Assistant Customization

(Add Screenshot Here)

### Voice Interaction

(Add Screenshot Here)

---

## 🌟 Resume Highlights

* Developed a full-stack AI voice assistant with real-time speech recognition and speech synthesis capabilities.
* Integrated Google Gemini API for intent classification and conversational AI interactions.
* Implemented wake-word-based activation to optimize API usage and improve user experience.
* Designed secure authentication, assistant customization, and conversation history management features.

---

## 👨‍💻 Author

**Harsh Goel**

* GitHub: Your GitHub Profile
* LinkedIn: Your LinkedIn Profile

---

⭐ If you found this project useful, consider giving it a star.
