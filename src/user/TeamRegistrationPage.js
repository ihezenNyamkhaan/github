// ✅ Full Updated TeamDashboardPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function TeamDashboardPage() {
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  const numericTournamentId = parseInt(tournamentId);
  const userId = parseInt(localStorage.getItem("userId"));

  const [showForm, setShowForm] = useState(false);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamImage, setTeamImage] = useState(null);
  const [category, setCategory] = useState("Эрэгтэй");
  const [submittedTeam, setSubmittedTeam] = useState(null);
  const [selectedTeamUserId, setSelectedTeamUserId] = useState(null);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleToggleForm = () => setShowForm(true);

  const handleAddPlayer = () => {
    setFormPlayers([
      ...formPlayers,
      {
        avatar: null,
        name: "",
        number: "",
        height: "",
        rank: "",
        role: "",
        regNumber: "",
      },
    ]);
  };
  const [formPlayers, setFormPlayers] = useState([
    {
      avatar: null,
      name: "",
      number: "",
      height: "",
      rank: "",
      role: "",
      regNumber: ""
    }
  ]);

  const handlePlayerChange = (index, field, value) => {
    const updated = [...formPlayers];
    updated[index][field] = value;
    setFormPlayers(updated);
  };

  const handleSaveTeam = async () => {
    try {
      const teamImageBase64 = teamImage
        ? await convertToBase64(teamImage)
        : "";
  
      const playersWithPhotos = await Promise.all(
        formPlayers.map(async (player) => ({
          playerPhoto: player.avatar
            ? await convertToBase64(player.avatar)
            : "",
          name: player.name,
          number: player.number,
          height: player.height,
          rank: player.rank,
          role: player.role,
          regNumber: player.regNumber,
        }))
      );
  
      const payload = {
        team: {
          name: teamName,
          imageUrl: teamImageBase64,
          category,
          userId,
          tournamentId: numericTournamentId,
        },
        players: playersWithPhotos,
      };
  
      const response = await axios.post("http://localhost:8080/teams/register", payload);
      await axios.post("http://localhost:8080/teams/register", payload);
      const createdTeam = response.data;
      setSubmittedTeam({ teamName, teamImage });
      navigate(`/team-payment/${createdTeam.id}`);      
      setSubmittedTeam({ teamName, teamImage });
      setShowForm(false);
      fetchTeams();
      setFormPlayers([{
        avatar: null,
        name: "",
        number: "",
        height: "",
        rank: "",
        role: "",
        regNumber: ""
      }]); // reset form players
    } catch (err) {
      console.error("Team registration failed:", err);
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/teams/teams/tournament/${tournamentId}`
      );
      setTeams(res.data);
      localStorage.setItem("teamsData", JSON.stringify(res.data)); // Store teams data in localStorage
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    }
  };

  const handleTeamClick = async (team) => {
    if (selectedTeamUserId === team.id)
      {
      // Clicking the same team again – hide the player list and reset state
      setSelectedTeamUserId(team.id);
      setPlayers([]);
      return;
    }
  
    // Update selected team state
    setSelectedTeamUserId(team.userId);
  
    // Fetch the players associated with the selected team
    try {
      const res = await axios.get(`http://localhost:8080/teams/team/${team.id}`);
      console.log("Players data:", res.data); // Debug log to check the response
      setPlayers(res.data); // This is where you update the players state
    } catch (error) {
      console.error("Failed to load players:", error);
    }
  };
  
  

  useEffect(() => {
    
    fetchTeams();
    const teamsData = localStorage.getItem("teamsData");
    if (teamsData) {
      setTeams(JSON.parse(teamsData)); // Use stored teams data
    } else {
      // If no stored data, fetch the teams
      fetchTeams();
    }

  }, [tournamentId]);

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
          <a href="/information">Холбоо барих</a>
          <a href="#" className="text-blue-600">Баг бүртгэх</a>
          <a href="/userprofile">Профайл</a>
        </nav>
        <button className="bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
        onClick={() => navigate("/login")}>
          <FaUserCircle /> Нэвтрэх
        </button>      
        </header>

      <div className="flex mt-8">
        {/* Sidebar */}
        <div className="border rounded p-4 w-60 mr-4">
        <div className={`font-semibold mb-2 ${showForm ? "text-black" : "text-blue-700"}`}>
          Багийн бүртгэл
        </div>
        <a
          href="/team-qr"
          className={`font-semibold ${showForm ? "text-blue-700" : "text-black"}`}
        > 
          Миний тэмцээн
        </a>
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

          {/* Players table */}
          {selectedTeamUserId && players.length > 0 && (
  <div className="mt-8 border rounded p-4">
    <h3 className="font-bold text-xl mb-4">Тоглогчид</h3>
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Зураг</th>
          <th className="p-2 border">Овог Нэр</th>
          <th className="p-2 border">#</th>
          <th className="p-2 border">Өндөр</th>
          <th className="p-2 border">Цол</th>
          <th className="p-2 border">Үүрэг</th>
          <th className="p-2 border">Регистр</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, i) => (
          <tr key={i}>
            <td className="p-2 border">
              {player.playerPhoto && (
                <img
                  src={player.playerPhoto}
                  alt={player.name}
                  className="h-10 w-10 object-cover rounded-full"
                />
              )}
            </td>
            <td className="p-2 border">{player.name}</td>
            <td className="p-2 border">{player.number}</td>
            <td className="p-2 border">{player.height}</td>
            <td className="p-2 border">{player.rank}</td>
            <td className="p-2 border">{player.role}</td>
            <td className="p-2 border">{player.regNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



          {/* Register button */}
          <div className="border rounded p-4">
            <div className="flex justify-center">
              <button
                onClick={handleToggleForm}
                className="bg-green-400 text-black px-4 py-1 rounded hover:bg-green-500"
              >
                Шинээр бүртгэх
              </button>
            </div>
          </div>

          {/* Form */}
          {showForm && (
            <div className="border rounded p-4 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <label className="font-medium">Багийн нэр:</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Boston Celtics"
                  className="border rounded px-2 py-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-medium">Багийн зураг:</label>
                <input type="file" onChange={(e) => setTeamImage(e.target.files[0])} />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-medium">Тэмцээний ангилал:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option>Эрэгтэй</option>
                  <option>Эмэгтэй</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Тоглогчдын бүртгэл:</h3>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border">Цээж зураг</th>
                    <th className="p-2 border">Овог Нэр</th>
                    <th className="p-2 border">Хувийн дугаар</th>
                    <th className="p-2 border">Биеийн өндөр</th>
                    <th className="p-2 border">Цол зэрэг</th>
                    <th className="p-2 border">Үүрэг</th>
                    <th className="p-2 border">Регистерийн дугаар</th>
                  </tr>
                </thead>
                <tbody>
                {formPlayers.map((player, index) => (

                    <tr key={index}>
                      <td className="p-2 border">
                        <input
                          type="file"
                          onChange={(e) =>
                            handlePlayerChange(index, "avatar", e.target.files[0])
                          }
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="text"
                          value={player.name}
                          onChange={(e) =>
                            handlePlayerChange(index, "name", e.target.value)
                          }
                          className="w-full border px-1"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="text"
                          value={player.number}
                          onChange={(e) =>
                            handlePlayerChange(index, "number", e.target.value)
                          }
                          className="w-full border px-1"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="text"
                          value={player.height}
                          onChange={(e) =>
                            handlePlayerChange(index, "height", e.target.value)
                          }
                          className="w-full border px-1"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="text"
                          value={player.rank}
                          onChange={(e) =>
                            handlePlayerChange(index, "rank", e.target.value)
                          }
                          className="w-full border px-1"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="text"
                          value={player.role}
                          onChange={(e) =>
                            handlePlayerChange(index, "role", e.target.value)
                          }
                          className="w-full border px-1"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="text"
                          value={player.regNumber}
                          onChange={(e) =>
                            handlePlayerChange(index, "regNumber", e.target.value)
                          }
                          className="w-full border px-1"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleAddPlayer}
                  className="bg-cyan-400 text-white px-4 py-2 rounded"
                >
                  Тоглогч нэмэх
                </button>
                <button
                  onClick={handleSaveTeam}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Хадгалах
                </button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
