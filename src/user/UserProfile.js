import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";


export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();
  const { tournamentId } = useParams(); 
  const numericTournamentId = parseInt(tournamentId);
  

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch logged-in user's data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    setUpdatedUser(user); // Pre-fill form with current values
  };

  // Handle user profile update
  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8080/users/${userId}`, updatedUser);
      setUser(updatedUser); // Update local state with the updated data
      setIsEditMode(false); // Exit edit mode
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-4 shadow bg-white">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <span className="font-bold text-lg">BASKETBALL</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
          <a href="/tournament">Тэмцээн</a>
          <button onClick={() => navigate("/information")}>Холбоо барих</button>
          <a href={`team-register/${numericTournamentId}`}>Баг бүртгэх</a>
          <a href="#" className="text-blue-600">Профайл</a>
        </nav>
          <button className="bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
        onClick={() => navigate("/login")}>
          <FaUserCircle /> Нэвтрэх
        </button>       </header>

      <div className="flex justify-center mt-8">
        <div className="w-full max-w-md text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Таны Мэдээлэл</h2>

          {/* Display user data or form for editing */}
          {isEditMode ? (
            <div>
              <input
                type="text"
                name="firstName"
                value={updatedUser.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="phoneNumber"
                value={updatedUser.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="accountNumber"
                value={updatedUser.accountNumber}
                onChange={handleChange}
                placeholder="Account Number"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
              />

              <button
                onClick={handleSaveChanges}
                className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600"
              >
                Хадгалах
              </button>
            </div>
          ) : (
            <div>
              <p><strong>Нэр:</strong> {user.firstName}</p>
              <p><strong>Имэйл:</strong> {user.email}</p>
              <p><strong>Утасны дугаар:</strong> {user.phoneNumber}</p>
              <p><strong>Дансны дугаар:</strong> {user.accountNumber}</p>

              <button
                onClick={toggleEditMode}
                className="w-full mt-4 bg-sky-500 text-white py-2 rounded hover:bg-sky-600"
              >
                Засах
              </button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
