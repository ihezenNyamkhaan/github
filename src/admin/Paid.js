import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";

const Paid = () => {
  const [teams, setTeams] = useState([]); // Store teams data
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch teams and their payment status
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:8080/teams");
        setTeams(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Filter teams based on search
  const filteredTeams = teams.filter((team) => {
    const searchTerm = search.trim().toLowerCase();
    const teamName = team.name ? team.name.toLowerCase() : ''; // Safe check for null
    return teamName.includes(searchTerm);
  });

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
            <h2 className="text-3xl font-bold mb-4">Бүх багуудийн төлбөр</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                  <tr>
                    <th className="px-6 py-3">№</th>
                    <th className="px-6 py-3">Нэр</th>
                    <th className="px-6 py-3">Баг</th>
                    <th className="px-6 py-3">Цол зэрэг</th>
                    <th className="px-6 py-3">Төлбөрийн төлөв</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((team, index) => (
                    <tr key={team.id} className="border-b bg-white hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{team.name}</td>
                      <td className="px-6 py-4">{team.category}</td>
                      <td className="px-6 py-4">{team.score}</td>
                      <td className="px-6 py-4">
                        {team.payment === 'PAID' ? (
                          <span className="text-green-500">Төлбөр хийгдсэн</span>
                        ) : (
                          <span className="text-red-500">Төлбөр хийгдээгүй</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Paid;
