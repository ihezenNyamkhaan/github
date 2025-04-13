import React, { useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function UserRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8080/users/register", {
        firstName: "",
        email,
        phoneNumber: "", // if you're not using it, keep it empty or remove it
        password,
        role,
        accountNumber: role === "monitoring" ? accountNumber : null
      });
      
      setMessage("Амжилттай бүртгэгдлээ!");
    } catch (error) {
      console.error(error);
      setMessage("Бүртгэл амжилтгүй боллоо.");
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
        <button className="bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm">
          <FaUserCircle /> Нэвтрэх
        </button>
      </div>

      {/* Form Content */}
      <div className="flex items-center justify-center mt-10">
        <div className="w-full max-w-sm text-center">
          <button className="flex items-center gap-1 text-sm mb-6 text-gray-700">
            <FaArrowLeft /> Буцах
          </button>

          <div className="text-center mb-4">
            <FaUserCircle className="mx-auto text-3xl text-blue-500" />
            <h2 className="font-medium mt-2">Хэрэглэгчийн бүртгэл үүсгэх</h2>
          </div>Нэвтрэх 

          {/* Email */}
          <input
            type="email"
            placeholder="Имэйл оруулна уу"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Нууц үг"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          />

          {/* If monitoring is selected, show account number */}
          {role === "monitoring" && (
            <input
              type="text"
              placeholder="Дансны дугаар"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
          )}

          {/* Role selection buttons */}
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setRole("monitoring")}
              className={`px-2 py-1 text-sm rounded border ${
                role === "monitoring"
                  ? "bg-blue-200 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              Зохион байгуулагчаар
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`px-2 py-1 text-sm rounded border ${
                role === "admin"
                  ? "bg-blue-200 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              admin аар
            </button>
            <button
              onClick={() => setRole("user")}
              className={`px-2 py-1 text-sm rounded border ${
                role === "user"
                  ? "bg-blue-200 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              Хэрэглэгч
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleRegister}
            className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600"
          >
            Үргэлжлүүлэх
          </button>

          <p className="mt-4 text-sm text-gray-700"
          onClick={() => navigate("/login")}>Нэвтрэх &gt;</p>
          <p
            className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
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
