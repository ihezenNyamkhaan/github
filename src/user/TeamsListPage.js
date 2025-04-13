import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TeamsListPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    const tournamentId = localStorage.getItem("tournamentId");
    if (!tournamentId) return;

    try {
      const res = await axios.get(`http://localhost:8080/teams/teams/tournament/${tournamentId}`);
      setTeams(res.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-4 shadow bg-white">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <span className="font-bold text-lg">BASKETBALL</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
          <a href="#" className="text-blue-600">Тэмцээн</a>
          <a href="#">Холбоо барих</a>
          <a href="#">Баг бүртгэх</a>
          <a href="#">Профайл</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Нэвтрэх</button>
      </header>
      <h1 className="text-2xl font-bold mb-6 mt-6">Тэмцээн Баг</h1>

      {loading ? (
        <p>Ачааллаж байна...</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Багийн нэр</th>
                <th className="p-3 border">Бүртгүүлсэн огноо</th>
                <th className="p-3 border">Дэлгэрэнгүй</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 flex items-center gap-3 justify-center">
                    <img
                      src={team.imageUrl}
                      alt="logo"
                      className="w-6 h-6 object-contain rounded-full"
                    />
                    <span>{team.name}</span>
                  </td>
                  <td className="p-3">2025–02–20 23:57</td>
                  <td className="p-3 text-blue-600 cursor-pointer">Дэлгэрэнгүй</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
