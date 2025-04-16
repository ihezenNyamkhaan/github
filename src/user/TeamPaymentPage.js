import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TeamPaymentPage() {
  const { teamId } = useParams(); // Extract teamId from the URL
  const [team, setTeam] = useState(null);
  const [tournament, setTournament] = useState(null);
  const userId = parseInt(localStorage.getItem("userId"));


  useEffect(() => {
    if (teamId) fetchTeamData(teamId); // Fetch data when the component mounts
  }, [teamId]);

  const fetchTeamData = async (id) => {
    try {
      // Fetch team data by teamId using the new API endpoint
      const teamRes = await axios.get(`http://localhost:8080/teams/team/${id}`);
      setTeam(teamRes.data[0]); // Set the team data (assuming the response is an array)

      // Fetch tournament data using the tournamentId from the team
      const tournamentRes = await axios.get(
        `http://localhost:8080/monitor/${userId}`
      );
      setTournament(tournamentRes.data);
    } catch (err) {
      console.error("Error fetching team/tournament:", err);
    }
  };

  // Handle the payment process
  const handlePayment = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/teams/${teamId}/stats`, {
        wins: team?.score || "0", // Use score as an example, adjust as needed
        losses: team?.mistake || "0", // Use mistake as an example, adjust as needed
        score: team?.score || "0",
        payment: "PAID",
      });
      setTeam(response.data); // Update team status to "PAID"
      alert("Төлбөр амжилттай хийгдлээ!"); // Show success message
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Төлбөр амжилтгүй. Дахин оролдоно уу."); // Show error message
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-4 shadow bg-white mb-10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <span className="font-bold text-lg">BASKETBALL</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
          <a href="/tournament">Тэмцээн</a>
          <a href="/information" >Холбоо барих</a>
          <a href="#" className="text-blue-600">Баг бүртгэх</a>
          <a href="#">Профайл</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Нэвтрэх</button>
      </header>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="border rounded p-4 shadow">
            <div className="flex gap-4 items-center">
              <img src={tournament?.logo} alt="Tournament" className="w-12 h-12 rounded" />
              <div>
                <h2 className="text-lg font-bold">{tournament?.name}</h2>
                <p className="text-sm text-gray-500">{tournament?.date}</p>
              </div>
            </div>
            <p className="text-sm mt-2 text-gray-600">{tournament?.description}</p>
          </div>

          <div className="border rounded p-4 shadow text-center">
            <h3 className="text-lg font-semibold mb-2">Нийт төлбөр</h3>
            <p className="text-2xl font-bold text-green-600">200,000₮</p>
            <button
              onClick={handlePayment}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Төлбөр төлөх
            </button>
            {team?.payment === "PAID" && (
              <p className="text-green-600 font-semibold text-center mt-2">
                Төлбөр хийгдсэн
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4 text-center">
          <div className="border rounded p-4 shadow">
            <h3 className="text-lg font-semibold mb-4">QR код</h3>
            <img src="/qr-sample.png" alt="QR" className="w-48 h-48 mx-auto" />
            <p className="text-sm text-gray-500 mt-2">
              Доорх банкны апп ашиглан төлбөрөө хийнэ үү
            </p>
          </div>

          <p className="text-sm">Баг: <strong>{team?.teamName}</strong></p>
          <p className="text-sm">Ангилал: {team?.rank}</p>
        </div>
      </div>
    </div>
  );
}
