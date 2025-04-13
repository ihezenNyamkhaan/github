import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function TeamManager() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editingPlayerId, setEditingPlayerId] = useState(null);

  const userId = parseInt(localStorage.getItem("userId"));
  const tournamentId = parseInt(localStorage.getItem("tournamentId"));

  const navigate = useNavigate();

  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm("Та энэ багийг устгахдаа итгэлтэй байна уу?")) return;
    try {
      await axios.delete(`http://localhost:8080/teams/delete/${teamId}`);
      setTeams((prev) => prev.filter((team) => team.id !== teamId));
      setPlayers([]);
    } catch (err) {
      console.error("Failed to delete team:", err);
      alert("Багийг устгах явцад алдаа гарлаа.");
    }
  };

  const handleTeamClick = async (teamUserId) => {
    if (selectedUserId === teamUserId) {
      // Toggle off if same team is clicked again
      setSelectedUserId(null);
      setPlayers([]);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:8080/teams/user/${teamUserId}/tournament/${tournamentId}/players`
      );
      setPlayers(res.data);
      setSelectedUserId(teamUserId);
    } catch (err) {
      console.error("Error fetching players:", err);
    }
  };

  const handlePlayerChange = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  const handleUpdatePlayer = async (playerId, playerData) => {
    try {
      await axios.put(`http://localhost:8080/teams/players/${playerId}`, playerData);
      setEditingPlayerId(null);
      alert("Амжилттай шинэчлэгдлээ.");
    } catch (err) {
      console.error("Failed to update player:", err);
      alert("Шинэчлэхэд алдаа гарлаа.");
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      if (!tournamentId) {
        console.error("Missing tournamentId in localStorage");
        return;
      }
      try {
        const res = await axios.get(`http://localhost:8080/teams/teams/tournament/${tournamentId}`);
        setTeams(res.data);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };
    fetchTeams();
  }, [tournamentId]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-[#427B91] p-4 text-white flex flex-col justify-between min-h-screen">
        {/* Top Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/monitor")}
            className="w-full py-2 bg-gray-200 text-black rounded"
          >
            Тэмцээн
          </button>
          <button
          onClick={() => navigate("#")}
          className="w-full py-2 bg-gray-200 text-blue-600 rounded">Багууд</button>
          <button
          onClick={() => navigate("/teams-admin")}
          className="w-full py-2 bg-gray-200 text-black rounded">Тоглогчдын үзүүлэлт</button>
        </div>

        {/* Bottom Logout */}
        <div className="mt-auto pt-6">
          <button className="bg-blue-800 text-white w-full py-2 rounded">👤 Гарах</button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-md border p-4 mt-6">
          <h2 className="text-lg font-semibold mb-4">Тэмцээнд бүртгэгдсэн багууд</h2>
          <table className="w-full table-auto mb-6">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">#</th>
                <th className="p-2">Багийн нэр</th>
                <th className="p-2">Ангилал</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr
                  key={team.id}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleTeamClick(team.userId)}
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="flex items-center gap-2 p-2">
                    {team.imageUrl && (
                      <img
                        src={team.imageUrl}
                        alt={team.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    {team.name}
                  </td>
                  <td className="p-2">{team.category}</td>
                  <td className="p-2 flex gap-2 justify-end">
                    <button className="bg-sky-300 px-3 py-1 rounded">Өөрчлөх</button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent triggering row click
                        handleDeleteTeam(team.id);
                      }}
                    >
                      Устгах
                    </button>
                  </td>
                </tr>
              ))}
              {teams.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    Баг олдсонгүй
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Players */}
          {players.length > 0 && (
            <>
              <h3 className="text-md font-semibold mb-2">Тоглогчид</h3>
              <table className="w-full table-auto border">
                <thead className="bg-gray-100">
                  <tr>
                  <th className="p-2 border">Зураг</th> {/* 👈 Add this */}
                    <th className="p-2 border">Нэр</th>
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Өндөр</th>
                    <th className="p-2 border">Цол</th>
                    <th className="p-2 border">Үүрэг</th>
                    <th className="p-2 border">Регистр</th>
                    <th className="p-2 border">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                {players.map((player, i) => (
    <tr key={player.id}>
      <td className="border p-2">
        {player.playerPhoto ? (
          <img
            src={player.playerPhoto}
            alt="Тоглогч"
            className="h-10 w-10 object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Photo</span>
        )}
      </td>
      <td className="border p-2">
        {editingPlayerId === player.id ? (
          <input
            value={player.name}
            onChange={(e) => handlePlayerChange(i, "name", e.target.value)}
            className="border px-2"
          />
        ) : (
          player.name
        )}
      </td>
                      <td className="border p-2">
                        {editingPlayerId === player.id ? (
                          <input
                            value={player.number}
                            onChange={(e) => handlePlayerChange(i, "number", e.target.value)}
                            className="border px-2"
                          />
                        ) : (
                          player.number
                        )}
                      </td>
                      <td className="border p-2">
                        {editingPlayerId === player.id ? (
                          <input
                            value={player.height}
                            onChange={(e) => handlePlayerChange(i, "height", e.target.value)}
                            className="border px-2"
                          />
                        ) : (
                          player.height
                        )}
                      </td>
                      <td className="border p-2">
                        {editingPlayerId === player.id ? (
                          <input
                            value={player.rank}
                            onChange={(e) => handlePlayerChange(i, "rank", e.target.value)}
                            className="border px-2"
                          />
                        ) : (
                          player.rank
                        )}
                      </td>
                      <td className="border p-2">
                        {editingPlayerId === player.id ? (
                          <input
                            value={player.role}
                            onChange={(e) => handlePlayerChange(i, "role", e.target.value)}
                            className="border px-2"
                          />
                        ) : (
                          player.role
                        )}
                      </td>
                      <td className="border p-2">
                        {editingPlayerId === player.id ? (
                          <input
                            value={player.regNumber}
                            onChange={(e) => handlePlayerChange(i, "regNumber", e.target.value)}
                            className="border px-2"
                          />
                        ) : (
                          player.regNumber
                        )}
                      </td>
                      <td className="border p-2">
                        {editingPlayerId === player.id ? (
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() => handleUpdatePlayer(player.id, player)}
                          >
                            Хадгалах
                          </button>
                        ) : (
                          <button
                            className="bg-yellow-400 px-3 py-1 rounded"
                            onClick={() => setEditingPlayerId(player.id)}
                          >
                            Засах
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
