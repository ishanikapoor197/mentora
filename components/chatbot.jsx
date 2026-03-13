
"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function Chatbot() {

const { isSignedIn } = useUser();

const [open,setOpen] = useState(false);
const [showPopup,setShowPopup] = useState(true);
const [bounce,setBounce] = useState(true);
const [message,setMessage] = useState("");
const [chat,setChat] = useState([]);
const [loading,setLoading] = useState(false);

const chatEndRef = useRef(null);

// Auto scroll to latest message
useEffect(()=>{
chatEndRef.current?.scrollIntoView({behavior:"smooth"});
},[chat,loading]);

// Load previous messages
useEffect(()=>{


if(!isSignedIn) return;

const loadMessages = async () => {

  try{

    const res = await fetch("/api/chat");
    const data = await res.json();

    const formatted = data.map(msg => ({
      role: msg.role,
      text: msg.message
    }));

    setChat(formatted);

  }catch(error){
    console.error("Failed to load chat history:",error);
  }

};

loadMessages();


},[isSignedIn]);

const sendMessage = async () => {


if(!message.trim()) return;

// If user not signed in
if(!isSignedIn){

  setChat([
    ...chat,
    {
      role:"assistant",
      text:"Please sign in to Mentora to use the AI assistant."
    }
  ]);

  setMessage("");
  return;
}

const userMessage = message;

const newChat = [...chat,{role:"user",text:userMessage}];

setChat(newChat);
setMessage("");
setLoading(true);

try{

  const res = await fetch("/api/chat",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({message:userMessage})
  });

  const data = await res.json();

  setChat([
    ...newChat,
    {role:"assistant",text:data.reply}
  ]);

}catch(error){
  console.error("Chat error:",error);
}

setLoading(false);


};

return (
<>
{/* Popup Message */}
{showPopup && !open && ( <div className="fixed bottom-24 right-6 bg-white shadow-xl rounded-lg p-4 w-64 text-sm animate-bounce">


      <div className="flex justify-between items-start">
        <p className="text-gray-800">
          👋 Hi! I'm <b>Mentora AI</b>.<br/>
          Ask me any career question!
        </p>

        <button
          onClick={()=>{
            setShowPopup(false);
            setBounce(false);
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={16}/>
        </button>
      </div>

    </div>
  )}

  {/* Floating Chat Button */}
  <button
    onClick={()=>{
      setOpen(!open);
      setShowPopup(false);
      setBounce(false);
    }}
    className={`fixed bottom-6 right-6 
    bg-pink-500 text-white p-4 rounded-full 
    shadow-lg shadow-pink-400/60 
    hover:shadow-pink-500/80 
    ring-4 ring-pink-300/40 
    transition-all duration-300 
    hover:scale-110 
    ${bounce ? "animate-bounce" : ""}`}
  >
    <MessageCircle/>
  </button>

  {/* Chat Window */}
  {open && (
    <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-xl p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">
          Mentora AI
        </h3>

        {/* Close Chat Button */}
        <button
          onClick={()=>setOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18}/>
        </button>
      </div>

      {/* Messages */}
      <div className="h-60 overflow-y-auto mb-3 text-sm">

        {chat.map((msg,i)=>(
          <div key={i} className={msg.role==="user" ? "text-right":"text-left"}>
            <p className={`p-2 rounded mb-2 inline-block ${
              msg.role==="user"
                ? "bg-pink-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}>
              {msg.text}
            </p>
          </div>
        ))}

        {/* AI Loading Animation */}
        {loading && (
          <div className="text-left">
            <p className="bg-gray-100 p-2 rounded mb-2 inline-block">
              <span className="animate-pulse">● ● ●</span>
            </p>
          </div>
        )}

        <div ref={chatEndRef}></div>

      </div>

      {/* Clear Chat Button */}
      {chat.length > 0 && (
        <button
          onClick={()=>setChat([])}
          className="text-xs text-gray-500 mb-2 hover:text-gray-700"
        >
          Clear Chat
        </button>
      )}

      {/* Input */}
      <input
        disabled={!isSignedIn}
        className="border w-full p-2 rounded mb-2 disabled:bg-gray-200"
        placeholder={
          isSignedIn
            ? "Ask career question..."
            : "Sign in to use Mentora AI"
        }
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            e.preventDefault();
            sendMessage();
          }
        }}
      />

      {/* Button */}
      <button
        onClick={sendMessage}
        className="bg-pink-500 text-white px-4 py-2 rounded-full w-full hover:bg-pink-600 transition"
      >
        Ask AI
      </button>

    </div>
  )}
</>


);
}
