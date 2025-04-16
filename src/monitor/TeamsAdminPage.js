import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TeamsAdminPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

    const navigate = useNavigate();
  

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const tournamentId = localStorage.getItem("tournamentId");
    if (!tournamentId) return;

    try {
      const res = await axios.get(
        `http://localhost:8080/teams/teams/tournament/${tournamentId}`
      );
      setTeams(res.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayers = async (teamId) => {
    try {
      const res = await axios.get(`http://localhost:8080/teams/team/${teamId}`);
      setPlayers(res.data);
      setSelectedTeamId(teamId);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleStatsChange = (teamId, field, value) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, [field]: value } : team
      )
    );
  };

  const handleSaveStats = async (team) => {
    try {
      await axios.put(`http://localhost:8080/teams/${team.id}/stats`, {
        wins: team.wins,
        losses: team.losses,
        score: team.score,
      });
      alert("Амжилттай хадгалагдлаа");
    } catch (error) {
      console.error("Stats хадгалах үед алдаа гарлаа:", error);
      alert("Алдаа гарлаа");
    }
  };

  const handleDelete = async (teamId) => {
    try {
      await axios.delete(`http://localhost:8080/teams/${teamId}`);
      setTeams((prev) => prev.filter((team) => team.id !== teamId));
    } catch (err) {
      console.error("Устгах үед алдаа гарлаа:", err);
    }
  };

  const handlePlayerChange = (playerId, field, value) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === playerId ? { ...player, [field]: value } : player
      )
    );
  };

  const handleSavePlayer = async (player) => {
    try {
      await axios.put(
        `http://localhost:8080/teams/players/${player.id}`,
        player
      );
      alert("Тоглогчийн мэдээлэл хадгалагдлаа");
    } catch (error) {
      console.error("Player update error:", error);
      alert("Алдаа гарлаа");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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
          onClick={() => navigate("/teams")}
          className="w-full py-2 bg-gray-200 text-black rounded">Багууд</button>
          <button
          onClick={() => navigate("/teams-admin")}
          className="w-full py-2 bg-gray-200 text-blue-600 rounded">Тоглогчдын үзүүлэлт</button>
        </div>

        {/* Bottom Logout */}
        <div className="mt-auto pt-6">
          <button className="bg-blue-800 text-white w-full py-2 rounded" onClick={() => navigate("/login")}>👤 Гарах</button>

        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Багууд</h1>

        {loading ? (
          <p>Ачааллаж байна...</p>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 overflow-x-auto max-w-5xl mx-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Багийн нэр</th>
                  <th className="p-2 border">Хожил</th>
                  <th className="p-2 border">Хожигдол</th>
                  <th className="p-2 border">Чансаа</th>
                  <th className="p-2 border">Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={index} className="text-center border-t">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border flex items-center gap-2 justify-center">
                      <img
                        src={team.imageUrl}
                        alt="team"
                        className="w-6 h-6 object-contain rounded-full"
                      />
                      <span>{team.name}</span>
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={team.wins || ""}
                        onChange={(e) => handleStatsChange(team.id, "wins", e.target.value)}
                        className="border p-1 w-12 text-center"
                        placeholder="W"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={team.losses || ""}
                        onChange={(e) => handleStatsChange(team.id, "losses", e.target.value)}
                        className="border p-1 w-12 text-center"
                        placeholder="L"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={team.score || ""}
                        onChange={(e) => handleStatsChange(team.id, "score", e.target.value)}
                        className="border p-1 w-12 text-center"
                        placeholder="S"
                      />
                    </td>
                    <td className="p-2 border space-x-2">
                      <button
                        onClick={() => handleSaveStats(team)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Хадгалах
                      </button>
                      <button
                        onClick={() => handleDelete(team.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Устгах
                      </button>
                      <button
                        onClick={() => fetchPlayers(team.id)}
                        className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Тоглогчид
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTeamId && (
          <>
            <h2 className="text-2xl font-bold mt-12 mb-6">Тоглогчдын чансаа</h2>
            <div className="bg-white rounded-lg shadow p-6 overflow-x-auto max-w-5xl mx-auto">
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Нэр</th>
                    <th className="p-2 border">Баг</th>
                    <th className="p-2 border">Оноо</th>
                    <th className="p-2 border">Дамжуулалт</th>
                    <th className="p-2 border">Хамгаалалт</th>
                    <th className="p-2 border">Алдаа</th>
                    <th className="p-2 border">Чансаа</th>
                    <th className="p-2 border">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr key={player.id} className="text-center border-t">
                      <td className="p-2 border">{index + 1}</td>
                      <td className="p-2 border flex items-center gap-2 justify-center">
                        <img
                          src={player.playerPhoto}
                          alt="player"
                          className="w-6 h-6 object-contain rounded-full"
                        />
                        <span>{player.name}</span>
                      </td>
                      <td className="p-2 border">{player.name || "-"}</td>

                      <td className="p-2 border">
                        <input
                          value={player.score || ""}
                          onChange={(e) => handlePlayerChange(player.id, "score", e.target.value)}
                          className="border p-1 w-14 text-center"
                          placeholder="Оноо"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          value={player.assist || ""}
                          onChange={(e) => handlePlayerChange(player.id, "assist", e.target.value)}
                          className="border p-1 w-14 text-center"
                          placeholder="Дамж."
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          value={player.defense || ""}
                          onChange={(e) => handlePlayerChange(player.id, "defense", e.target.value)}
                          className="border p-1 w-14 text-center"
                          placeholder="Хамг."
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          value={player.mistake || ""}
                          onChange={(e) => handlePlayerChange(player.id, "mistake", e.target.value)}
                          className="border p-1 w-14 text-center"
                          placeholder="Алдаа"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          value={player.rankScore || ""}
                          onChange={(e) => handlePlayerChange(player.id, "rankScore", e.target.value)}
                          className="border p-1 w-14 text-center"
                          placeholder="Чансаа"
                        />
                      </td>
                      <td className="p-2 border">
                        <button
                          onClick={() => handleSavePlayer(player)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Хадгалах
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
