import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function TournamentListPage() {
  const [tournaments, setTournaments] = useState([]);

  const navigate = useNavigate();

  const fetchTournaments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/monitor");
      setTournaments(res.data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-4 shadow bg-white">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <span className="font-bold text-lg">BASKETBALL</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
        <button onClick={() => navigate("/")} className="text-blue-600">Тэмцээн</button>
        <button onClick={() => alert("Coming soon")}>Холбоо барих</button>
        <button
          onClick={() => {
            const savedId = localStorage.getItem("tournamentId");
            if (savedId) {
              navigate(`/team-register/${savedId}`);
            } else {
              alert("Эхлээд тэмцээн сонгоно уу!");
            }
          }}
        >
          Баг бүртгэх
        </button>
        <button onClick={() => navigate("/profile")}>Профайл</button>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Нэвтрэх</button>
      </header>

      {/* Top Image */}
      <div className="w-full max-w-5xl mx-auto mt-6">
        <img
          src="/default-banner.jpg" // ⚠️ Replace with actual public folder path if needed
          alt="Default Banner"
          className="rounded-lg w-full object-cover"
        />
        <div className="flex justify-center mt-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 mx-1"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300 mx-1"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300 mx-1"></span>
        </div>
      </div>

      {/* Tournament List */}
<section className="w-full max-w-6xl mx-auto px-6 py-10">
  <h2 className="text-xl font-semibold mb-6">Тэмцээн</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {tournaments.map((tournament, index) => (
      <div
      key={index}
      className="bg-white rounded-lg shadow-md p-4 flex gap-4 items-start cursor-pointer"
      onClick={() => navigate(`/team-register/${tournament.id}`)}
      >
    
        <img
          src={tournament.logo || "/placeholder.png"}
          alt="logo"
          className="h-16 w-16 object-contain rounded"
        />
        <div>
          <p className="text-sm text-gray-500">
            {tournament.selectedCategories}
          </p>
          <h3 className="font-bold text-lg">{tournament.name}</h3>
          <p className="text-sm text-gray-600">{tournament.date}</p>
          <p className="text-gray-700 text-sm mt-1">
            {tournament.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

    </div>
  );
}