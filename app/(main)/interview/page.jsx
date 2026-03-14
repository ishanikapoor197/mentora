
// "use client";

// import { useState, useRef } from "react";
// import { askInterviewAI } from "@/actions/interview";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";

// export default function InterviewPage() {

//   const { user } = useUser();
//   const router = useRouter();

//   const [question, setQuestion] = useState("");
//   const [history, setHistory] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [loadingFeedback, setLoadingFeedback] = useState(false);
//   const [listening, setListening] = useState(false);
//   const [interviewActive, setInterviewActive] = useState(false);
//   const [interviewType, setInterviewType] = useState(null);
//   const [category, setCategory] = useState(null);

//   const recognitionRef = useRef(null);
//   const technicalCategories = ["OOPs", "Java", "Python", "DSA"];
//   if (typeof window !== "undefined" && !recognitionRef.current) {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (SpeechRecognition) {
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.lang = "en-US";
//       recognitionRef.current.continuous = false;
//     }
//   }

//   const recognition = recognitionRef.current;

//   function speak(text) {
//     const speech = new SpeechSynthesisUtterance(text);
//     speech.lang = "en-US";

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(speech);
//   }

//   async function startInterview() {

//     const prompt = `Start a ${interviewType} interview for a software developer.`;

//     const reply = await askInterviewAI(prompt, interviewType,category);

//     setQuestion(reply);
//     setHistory("AI: " + reply);
//     setInterviewActive(true);
    

//     speak(reply);
//   }

//   function listenAnswer() {

//     if (!recognition) {
//       alert("Speech Recognition not supported.");
//       return;
//     }

//     if (listening) return;

//     setListening(true);

//     try {
//       recognition.start();
//     } catch {
//       return;
//     }

//     recognition.onresult = async (event) => {

//       const answer = event.results[0][0].transcript;

//       const updatedHistory =
//         history + "\nCandidate: " + answer;

//       setHistory(updatedHistory);

//       const reply = await askInterviewAI(updatedHistory, interviewType,category);

//       setQuestion(reply);

//       setHistory(updatedHistory + "\nAI: " + reply);

//       speak(reply);

//       setListening(false);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };
//   }

//   async function endInterview() {

//     if (recognition) recognition.stop();
//     window.speechSynthesis.cancel();

//     setInterviewActive(false);
//     setLoadingFeedback(true);

//     const result = await askInterviewAI(
//       history + "\nInterview finished. Provide evaluation.",
//       interviewType,
//       category
//     );

//     setFeedback(result);
//     setLoadingFeedback(false);
//   }

//   function goBackToSelection() {

//     if (recognition) recognition.stop();

//     setInterviewType(null);
//     setInterviewActive(false);
//     setQuestion("");
//     setHistory("");
//     setFeedback("");
//   }

//   return (

//     <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-10">

//       <h1 className="text-4xl font-bold text-pink-700 mb-10">
//         AI Voice Interview
//       </h1>

//       {!interviewType && (

//         <div className="flex gap-6">

//           <button
//             onClick={() => setInterviewType("Technical")}
//             className="bg-blue-500 text-white px-8 py-4 rounded-xl"
//           >
//             Technical Interview
//           </button>

//           <button
//             onClick={() => setInterviewType("HR")}
//             className="bg-purple-500 text-white px-8 py-4 rounded-xl"
//           >
//             HR Interview
//           </button>
//           <button
//             onClick={() => setInterviewType("Role")}
//             className="bg-green-500 text-white px-8 py-4 rounded-xl"
//           >
//             Role Based Interview
//           </button>

//         </div>

//       )}
//       {interviewType === "Technical" && !category && (

//   <div className="grid grid-cols-2 gap-6 mt-10">

//     {technicalCategories.map((cat) => (

//       <button
//         key={cat}
//         onClick={() => setCategory(cat)}
//         className="bg-blue-400 text-white px-6 py-3 rounded-xl"
//       >
//         {cat}
//       </button>

//     ))}

//   </div>

// )}

      
//         {interviewType && (interviewType !== "Technical" || category) && !interviewActive && !feedback && !loadingFeedback && (

//         <div className="flex flex-col items-center">

//           <button
//             onClick={goBackToSelection}
//             className="text-pink-600 mb-6"
//           >
//             ← Back to Interview Type
//           </button>

//           {/* <p className="mb-6">{interviewType} Interview</p> */}
//           <p className="mb-6">
//   {interviewType} Interview {category ? `- ${category}` : ""}
// </p>

//           <div className="grid md:grid-cols-2 gap-8 max-w-4xl">

//             <div className="bg-white p-10 rounded-xl shadow text-center">

//               <div className="text-4xl mb-3">🤖</div>

//               <h2 className="font-semibold">AI Interviewer</h2>
//               <p className="text-sm text-gray-500">Mentora AI</p>

//             </div>

//             <div className="bg-white p-10 rounded-xl shadow text-center">

//               <img
//                 src={user?.imageUrl}
//                 className="w-20 h-20 rounded-full mx-auto mb-3"
//               />

//               <h2 className="font-semibold">{user?.fullName}</h2>
//               <p className="text-sm text-gray-500">Candidate</p>

//             </div>

//           </div>

//           <button
//             onClick={startInterview}
//             className="mt-10 bg-green-500 text-white px-10 py-3 rounded-full"
//           >
//             Start Call
//           </button>

//         </div>

//       )}

//       {interviewActive && (

//         <div className="bg-white p-8 rounded-xl shadow max-w-2xl text-center">

//           <p className="mb-6">{question}</p>

//           <div className="flex gap-4 justify-center">

//             <button
//               onClick={listenAnswer}
//               disabled={listening}
//               className="bg-green-500 text-white px-6 py-2 rounded"
//             >
//               {listening ? "Listening..." : "Speak Answer"}
//             </button>

//             <button
//               onClick={endInterview}
//               className="bg-red-500 text-white px-6 py-2 rounded"
//             >
//               End Interview
//             </button>

//           </div>

//         </div>

//       )}

//       {loadingFeedback && (

//         <div className="bg-white p-10 rounded-xl shadow text-center">

//           <h2 className="text-xl font-bold mb-4">
//             Interview Completed
//           </h2>

//           <p>Generating feedback...</p>

//         </div>

//       )}

//       {feedback && (

//         <div className="bg-white p-8 rounded-xl shadow max-w-3xl">

//           <h2 className="text-2xl font-bold mb-4">
//             Interview Feedback
//           </h2>

//           <p className="whitespace-pre-line">{feedback}</p>

//           <div className="flex gap-4 mt-6">

//             <button
//               onClick={goBackToSelection}
//               className="bg-pink-500 text-white px-6 py-2 rounded"
//             >
//               Try Another Interview
//             </button>


//           </div>

//         </div>

//       )}

//     </div>
//   );
// }
"use client";

import { useState, useRef } from "react";
import { askInterviewAI } from "@/actions/interview";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function InterviewPage() {

  const { user } = useUser();
  const router = useRouter();

  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [listening, setListening] = useState(false);
  const [interviewActive, setInterviewActive] = useState(false);
  const [interviewType, setInterviewType] = useState(null);
  const [category, setCategory] = useState(null);
const [resumeText, setResumeText] = useState("");
  const recognitionRef = useRef(null);
  const technicalCategories = ["OOPs", "Java", "Python", "DSA"];

  if (typeof window !== "undefined" && !recognitionRef.current) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = false;
    }
  }

  const recognition = recognitionRef.current;

  function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }

  async function startInterview() {

    // const prompt = `Start a ${interviewType} interview for a software developer.`;
let prompt = `Start a ${interviewType} interview for a software developer.`;

if (interviewType === "Resume") {
  prompt = `
You are conducting a resume based interview.

Here is the candidate resume:
${resumeText}

Ask questions based on:
- projects
- technologies used
- skills
- experience

Ask one question at a time.
`;
}
    const reply = await askInterviewAI(prompt, interviewType, category,resumeText);

    setQuestion(reply);
    setHistory("AI: " + reply);
    setInterviewActive(true);

    speak(reply);
  }

  function listenAnswer() {

    if (!recognition) {
      alert("Speech Recognition not supported.");
      return;
    }

    if (listening) return;

    setListening(true);

    try {
      recognition.start();
    } catch {
      return;
    }

    recognition.onresult = async (event) => {

      const answer = event.results[0][0].transcript;

      const updatedHistory =
        history + "\nCandidate: " + answer;

      setHistory(updatedHistory);

      const reply = await askInterviewAI(updatedHistory, interviewType, category,resumeText);

      setQuestion(reply);

      setHistory(updatedHistory + "\nAI: " + reply);

      speak(reply);

      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  async function endInterview() {

    if (recognition) recognition.stop();
    window.speechSynthesis.cancel();

    setInterviewActive(false);
    setLoadingFeedback(true);

    const result = await askInterviewAI(
      history + "\nInterview finished. Provide evaluation.",
      interviewType,
      category
    );

    setFeedback(result);
    setLoadingFeedback(false);
  }

  function goBackToSelection() {

    if (recognition) recognition.stop();
    window.speechSynthesis.cancel();

    setInterviewType(null);
    setCategory(null);
    setInterviewActive(false);
    setQuestion("");
    setHistory("");
    setFeedback("");
    setResumeText(""); 
  }

  return (

    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-10">

      <h1 className="text-4xl font-bold text-pink-700 mb-10">
        AI Voice Interview
      </h1>

      {!interviewType && (

        <div className="flex gap-6">

          <button
            onClick={() => setInterviewType("Technical")}
            className="bg-blue-500 text-white px-8 py-4 rounded-xl"
          >
            Technical Interview
          </button>

          <button
            onClick={() => setInterviewType("HR")}
            className="bg-purple-500 text-white px-8 py-4 rounded-xl"
          >
            HR Interview
          </button>

          <button
            onClick={() => setInterviewType("Role")}
            className="bg-green-500 text-white px-8 py-4 rounded-xl"
          >
            Role Based Interview
          </button>

<button
  onClick={() => {
    setInterviewType("Resume");
    setResumeText("");   // ⭐ force resume upload again
  }}
  className="bg-orange-500 text-white px-8 py-4 rounded-xl"
>
  Resume Based Interview
</button>

        </div>

      )}

      {interviewType === "Technical" && !category && (

        <div className="grid grid-cols-2 gap-6 mt-10">

          {technicalCategories.map((cat) => (

            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="bg-blue-400 text-white px-6 py-3 rounded-xl"
            >
              {cat}
            </button>

          ))}

        </div>

      )}

{interviewType === "Resume" && !resumeText && (

  <div className="flex flex-col items-center mt-6">

    {/* Back Button */}
    <button
      onClick={goBackToSelection}
      className="text-pink-600 mb-8"
    >
      ← Back to Interview Type
    </button>

    {/* Upload Card */}
    <label className="cursor-pointer bg-white border-2 border-dashed border-pink-400 rounded-xl p-12 w-[420px] text-center shadow hover:bg-pink-50 transition">

      <div className="text-5xl mb-4">📄</div>

      <p className="font-semibold text-xl">
        Upload Your Resume
      </p>

      <p className="text-gray-500 mt-1">
        PDF or DOCX
      </p>

      {/* <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={async (e) => {

          const file = e.target.files[0];
          if (!file) return;

          const text = await file.text();
          setResumeText(text);

        }}
      /> */}
<input
  type="file"
  accept=".pdf,.docx"
  className="hidden"
  onChange={async (e) => {

    const file = e.target.files[0];
    if (!file) return;

    try {

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        alert("Resume parsing failed.");
        return;
      }

      const data = await res.json();

      if (!data.text || data.text.length < 20) {
        alert("Could not read resume content.");
        return;
      }

      setResumeText(data.text);

    } catch (err) {
      console.error(err);
      alert("Error reading resume.");
    }

  }}
/>
    </label>

  </div>

)}
      {interviewType &&
 (interviewType !== "Technical" || category) &&
 (interviewType !== "Resume" || resumeText) &&
 !interviewActive &&
 !feedback &&
 !loadingFeedback && (

        <div className="flex flex-col items-center">

          <button
            onClick={goBackToSelection}
            className="text-pink-600 mb-6"
          >
            ← Back to Interview Type
          </button>

          <p className="mb-6">
            {interviewType} Interview {category ? `- ${category}` : ""}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">

            <div className="bg-white p-10 rounded-xl shadow text-center">

              <div className="text-4xl mb-3">🤖</div>

              <h2 className="font-semibold">AI Interviewer</h2>
              <p className="text-sm text-gray-500">Mentora AI</p>

            </div>

            <div className="bg-white p-10 rounded-xl shadow text-center">

              <img
                src={user?.imageUrl}
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />

              <h2 className="font-semibold">{user?.fullName}</h2>
              <p className="text-sm text-gray-500">Candidate</p>

            </div>

          </div>

          <button
            onClick={startInterview}
            className="mt-10 bg-green-500 text-white px-10 py-3 rounded-full"
          >
            Start Call
          </button>

        </div>

      )}

      {interviewActive && (

        <div className="bg-white p-8 rounded-xl shadow max-w-2xl text-center">

          <p className="mb-6">{question}</p>

          <div className="flex gap-4 justify-center">

            <button
              onClick={listenAnswer}
              disabled={listening}
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              {listening ? "Listening..." : "Speak Answer"}
            </button>

            <button
              onClick={endInterview}
              className="bg-red-500 text-white px-6 py-2 rounded"
            >
              End Interview
            </button>

          </div>

        </div>

      )}

      {loadingFeedback && (

        <div className="bg-white p-10 rounded-xl shadow text-center">

          <h2 className="text-xl font-bold mb-4">
            Interview Completed
          </h2>

          <p>Generating feedback...</p>

        </div>

      )}

      {feedback && (

        <div className="bg-white p-8 rounded-xl shadow max-w-3xl">

          <h2 className="text-2xl font-bold mb-4">
            Interview Feedback
          </h2>

          <p className="whitespace-pre-line">{feedback}</p>

          <div className="flex gap-4 mt-6">

            <button
              onClick={goBackToSelection}
              className="bg-pink-500 text-white px-6 py-2 rounded"
            >
              Try Another Interview
            </button>

          </div>

        </div>

      )}

    </div>
  );
}