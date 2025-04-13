// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function PlayerManager() {
//   const [teams, setTeams] = useState([]);

//   const handleDeleteTeam = async (teamId) => {
//     if (!window.confirm("Та энэ багийг устгахдаа итгэлтэй байна уу?")) return;
  
//     try {
//       await axios.delete(`http://localhost:8080/teams/delete/${teamId}`);
//       setTeams((prev) => prev.filter((team) => team.id !== teamId));
//     } catch (err) {
//       console.error("Failed to delete team:", err);
//       alert("Багийг устгах явцад алдаа гарлаа.");
//     }
//   };
  

//   useEffect(() => {
//     const fetchTeams = async () => {
//       const tournamentId = localStorage.getItem("tournamentId");

//       if (!tournamentId) {
//         console.error("Missing tournamentId in localStorage");
//         return;
//       }

//       try {
//         const res = await axios.get(`http://localhost:8080/teams/teams/tournament/${tournamentId}`);
//         setTeams(res.data);
//       } catch (err) {
//         console.error("Error fetching teams:", err);
//       }
//     };

//     fetchTeams();
//   }, []);

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-60 bg-[#427B91] p-4 text-white">
//         <div className="flex flex-col gap-4 p-4 mt-14">
//           <button className="bg-gray-200 text-black py-2 rounded">Багууд</button>
//           <button className="bg-gray-200 text-black py-2 rounded">Статик</button>
//           <button className="bg-gray-200 text-black py-2 rounded">Тэмцээний мэдээлэл</button>
//           <button className="bg-gray-200 text-black py-2 rounded">Тэмцээний мэдээлэл</button>
//         </div>
//         <button className="bg-blue-800 text-white mt-16 py-2 rounded w-full">👤 Гарах</button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <div className="bg-white rounded-md border p-4 mt-6">
//           <table className="w-full table-auto">
//             <thead>
//               <tr className="text-left border-b">
//                 <th className="p-2">#</th>
//                 <th className="p-2">Багийн нэр</th>
//                 <th className="p-2">Ангилал</th>
//                 <th className="p-2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {teams.map((team, index) => (
//                 <tr key={team.id} className="border-b">
//                   <td className="p-2">{index + 1}</td>
//                   <td className="flex items-center gap-2 p-2">
//                     {team.imageUrl && (
//                       <img
//                         src={team.imageUrl}
//                         alt={team.name}
//                         className="w-6 h-6 rounded-full object-cover"
//                       />
//                     )}
//                     {team.name || "Нэргүй баг"}
//                   </td>
//                   <td className="p-2">{team.category}</td>
//                   <td className="p-2 flex gap-2 justify-end">
//                     <button className="bg-sky-300 px-3 py-1 rounded">Өөрчлөх</button>
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                       onClick={() => handleDeleteTeam(team.id)}
//                     >
//                       Устгах
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//               {teams.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="text-center py-4 text-gray-500">
//                     Баг олдсонгүй
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }