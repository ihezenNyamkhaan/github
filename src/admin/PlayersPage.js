import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";

const AdminPage = () => {
  const [players, setPlayers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerToUpdate, setPlayerToUpdate] = useState(null);
  const [updatedPlayer, setUpdatedPlayer] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/teams/players");
        setPlayers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch players:", error);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/teams/players/${id}`);
      if (response.status === 200) {
        setPlayers(players.filter(player => player.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete player:", error);
    }
  };

  const handleUpdate = (player) => {
    setPlayerToUpdate(player);
    setUpdatedPlayer({
      name: player.name,
      number: player.number,
      height: player.height,
      rank: player.rank,
      role: player.role,
      regNumber: player.regNumber,
      teamName: player.teamName,
      score: player.score,
      assist: player.assist,
      defense: player.defense,
      mistake: player.mistake,
      rankScore: player.rankScore,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPlayer({ ...updatedPlayer, [name]: value });
  };

  const handleSubmitUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/teams/players/${playerToUpdate.id}`, updatedPlayer);
      if (response.status === 200) {
        setPlayers(players.map(player =>
          player.id === playerToUpdate.id ? response.data : player
        ));
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to update player:", error);
    }
  };

  // Filtering by player name only
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar Section */}
      <div className="w-1/4 bg-blue-600 text-white p-6">
        <div className="flex items-center justify-center mb-10">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <span className="ml-2 font-bold text-lg">BASKETBALL</span>
        </div>
        <nav>
          <ul>
            <li className="mb-4"><button onClick={() => navigate("/admin")} className="text-white">Зохион байгуулагчид</button></li>
            <li className="mb-4"><button onClick={() => navigate("/players-page")} className="text-white">Оролцогчид</button></li>
            <li className="mb-4"><button onClick={() => navigate("/paid")} className="text-white">Төлбөр</button></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
            onClick={() => navigate("/login")}
          >
            <FaUserCircle /> Нэвтрэх
          </button>

          <div className="flex items-center gap-2">
            <p className="text-sm">Нэрэээр хайх: </p>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border rounded-md"
              placeholder="Хайх"
            />
          </div>
        </div>

        {/* Back Button */}
        <button
          className="flex items-center gap-1 text-sm mb-6 text-gray-700"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Буцах
        </button>

        {/* Table Section */}
        <section className="py-8 px-4">
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Бүх тоглогчид</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                  <tr>
                    <th className="px-6 py-3">№</th>
                    <th className="px-6 py-3">Цээж зураг</th>
                    <th className="px-6 py-3">Овог Нэр</th>
                    <th className="px-6 py-3">Хувийн дугаар</th>
                    <th className="px-6 py-3">Биеийн өндөр</th>
                    <th className="px-6 py-3">Цол зэрэг</th>
                    <th className="px-6 py-3">Үүрэг</th>
                    <th className="px-6 py-3">Шинэчлэл</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map((player, index) => (
                    <tr key={player.id} className="border-b bg-white hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">
                        <img src={player.imageUrl} alt={player.name} width="50" height="50" />
                      </td>
                      <td className="px-6 py-4">{player.name}</td>
                      <td className="px-6 py-4">{player.number}</td>
                      <td className="px-6 py-4">{player.height}</td>
                      <td className="px-6 py-4">{player.rank}</td>
                      <td className="px-6 py-4">{player.role}</td>
                      <td className="px-6 py-4">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                          onClick={() => handleUpdate(player)}
                        >
                          Өөрчлөх
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-md"
                          onClick={() => handleDelete(player.id)}
                        >
                          Устгах
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Modal for updating player */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-sm">
              <h3 className="text-xl font-bold mb-4">Өөрчлөх</h3>

              <label className="block text-sm mb-2">Овог Нэр</label>
              <input
                type="text"
                name="name"
                value={updatedPlayer.name}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded-md"
              />

              <label className="block text-sm mb-2">Хувийн дугаар</label>
              <input
                type="text"
                name="number"
                value={updatedPlayer.number}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded-md"
              />

              <label className="block text-sm mb-2">Биеийн өндөр</label>
              <input
                type="text"
                name="height"
                value={updatedPlayer.height}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded-md"
              />
              <label className="block text-sm mb-2">Цол зэрэг</label>
              <input
                type="text"
                name="rank"
                value={updatedPlayer.rank}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded-md"
              />

              <label className="block text-sm mb-2">Үүрэг</label>
              <input
                type="text"
                name="role"
                value={updatedPlayer.role}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded-md"
              />

              <button
                onClick={handleSubmitUpdate}
                className="bg-blue-600 text-white py-2 rounded-md mr-2"
              >
                Хадгалах
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-400 text-white py-2 rounded-md"
              >
                Хаах
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
