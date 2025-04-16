import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function TeamDashboardPage() {
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  const numericTournamentId = parseInt(tournamentId);
  const userId = parseInt(localStorage.getItem("userId"));

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Fetch teams for the user when component mounts
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/teams/teams/${userId}?userId=${userId}`);
        setTeams(res.data);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };

    fetchTeams();
  }, [userId]);

  // Handle team selection
  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-4 shadow bg-white">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <span className="font-bold text-lg">BASKETBALL</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
          <a href="/tournament">Тэмцээн</a>
          <a href="information">Холбоо барих</a>
          <a href="#" className="text-blue-600">Баг бүртгэх</a>
          <a href="#">Профайл</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Нэвтрэх</button>
      </header>

      <div className="flex mt-8">
        {/* Sidebar */}
        <div className="border rounded p-4 w-60 mr-4">
          <a href={`team-register/${numericTournamentId}`} className="font-semibold text-black">Багийн бүртгэл</a>
          <div className="font-semibold mb-2 mt-2 text-blue-700  ">Миний тэмцээн</div>
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-4">
          <div className="border rounded p-4">
            <h2 className="text-center font-semibold">Тэмцээнд бүртгэгдсэн багууд</h2>
          </div>

          {/* Team list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div
                key={team.id}
                onClick={() => handleTeamClick(team)}
                className="border rounded p-4 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex gap-4 items-center">
                  {team.imageUrl && (
                    <img
                      src={team.imageUrl}
                      alt={team.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{team.name}</h3>
                    <p className="text-sm text-gray-500">{team.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team details and QR Code */}
          {selectedTeam && (
            <div className="mt-8 border rounded p-4">
              <h3 className="font-bold text-xl mb-4">Тэмцээний мэдээлэл</h3>
              <p><strong>Тэмцээн:</strong> {selectedTeam.name}</p>
              <p><strong>Тэмцээний ангилал:</strong> {selectedTeam.category}</p>
              <p><strong>Төлбөр:</strong> {selectedTeam.payment === 'PAID' ? 'Төлбөр хийгдсэн' : 'Төлбөр хийх шаардлагатай'}</p>
              <div className="mt-4">
                <img
                  src="/qr-sample.png"
                  alt="QR Code"
                  className="w-48 h-48 mx-auto"
                />
                <p className="text-center mt-2 text-gray-500">Доорх банкны апп ашиглан төлбөрөө хийнэ үү</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
