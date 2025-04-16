import React, { useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");

    const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/users/forgot-password", {
        email,
      });
      setResponse(res.data); // "We sent OTP to your email"
    } catch (error) {
      console.error(error);
      setResponse("Бүртгэлтэй хэрэглэгч олдсонгүй");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b-4 border-blue-400">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <span className="font-bold text-md">BASKETBALL</span>
        </div>
        <h1 className="text-red-600 text-xl font-bold">
          Системд нэвтрэх бүртгүүлэх
        </h1>
        <button className="bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
                onClick={() => navigate("/login")}>
                  <FaUserCircle /> Нэвтрэх
                </button>
      </div>

      {/* Form */}
      <div className="flex justify-center mt-16">
        <div className="w-full max-w-sm text-center">
          <button className="flex items-center gap-1 text-sm mb-6 text-gray-700" onClick={() => navigate("/register")}
          >
            <FaArrowLeft /> Буцах
          </button>

          <div className="mb-4">
            <FaUserCircle className="mx-auto text-3xl text-blue-500" />
            <h2 className="font-medium mt-2">Нууц үг сэргээх</h2>
          </div>

          <p className="text-sm mb-2 text-gray-600">
            Бүртгэлтэй имэйл эсвэл утасны дугаараа оруулна уу
          </p>

          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600"
          >
            Илгээх
          </button>

          {response && <p className="mt-4 text-blue-600 font-semibold">{response}</p>}
        </div>
      </div>
    </div>
  );
}
