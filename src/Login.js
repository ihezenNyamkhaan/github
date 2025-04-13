import React, { useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/users/login", {
        firstName: "",
        email,
        phoneNumber: "",
        password,
        role: "",
        accountNumber: ""
      });
  
      const { id, role } = res.data;
  
      localStorage.setItem("userId", id);
      localStorage.setItem("userRole", role); // store role if needed
  
      setMessage("Амжилттай нэвтэрлээ");
  
      if (role === "ADMIN") {
        navigate("/monitor"); // ✅ redirect to TournamentManager
      } else {
        // handle redirect for other roles like "USER"
        navigate("/"); // or /home or wherever your default user page is
      }
    } catch (error) {
      console.error(error);
      setMessage("Имэйл эсвэл нууц үг буруу байна");
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
        <h1 className="text-red-600 text-xl font-bold">Системд нэвтрэх</h1>
        <button
          className="bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
          onClick={() => navigate("/register")}
        >
          <FaUserCircle /> Бүртгүүлэх
        </button>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center mt-16">
        <div className="w-full max-w-sm text-center">
          <FaUserCircle className="mx-auto text-3xl text-blue-500" />
          <h2 className="font-medium mt-4 mb-2">Нэвтрэх</h2>

          <input
            type="email"
            placeholder="Имэйл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          />

          <input
            type="password"
            placeholder="Нууц үг"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600"
          >
            Нэвтрэх
          </button>

          <p
            className="mt-4 text-sm text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Нууц үгээ мартсан &gt;
          </p>

          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}
