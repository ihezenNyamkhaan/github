import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";

const AdminPage = () => {
  const [monitoringUsers, setMonitoringUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMonitoringUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/monitoring-users");
        setMonitoringUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch monitoring users:", error);
        setLoading(false);
      }
    };

    fetchMonitoringUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/users/${id}`);
      if (response.status === 200) {
        setMonitoringUsers(monitoringUsers.filter(user => user.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleUpdate = (user) => {
    setUserToUpdate(user);
    setUpdatedUser({
      firstName: user.firstName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      accountNumber: user.accountNumber,
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmitUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/users/${userToUpdate.id}`, updatedUser);
      if (response.status === 200) {
        setMonitoringUsers(monitoringUsers.map(user =>
          user.id === userToUpdate.id ? response.data : user
        ));
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const filteredUsers = monitoringUsers.filter((user) => {
    const searchTerm = search.trim().toLowerCase(); // Clean up the search term (trim spaces)
  
    // Safe check for null/undefined for firstName and email
    const userFirstName = user.firstName && user.firstName.toLowerCase ? user.firstName.toLowerCase() : ''; // Default to empty string if null or undefined
    const userEmail = user.email && user.email.toLowerCase ? user.email.toLowerCase() : ''; // Default to empty string if null or undefined
  
    return (
      userFirstName.includes(searchTerm) || 
      userEmail.includes(searchTerm)
    );
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
          <li className="mb-4"><button onClick={() => navigate("/admin")} className="text-white" font-bold>Зохион байгуулагчид</button></li>
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
            <h2 className="text-3xl font-bold mb-4">Хяналтын хэрэглэгчид</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                  <tr>
                    <th className="px-6 py-3">№</th>
                    <th className="px-6 py-3">Нэр</th>
                    <th className="px-6 py-3">Имэйл</th>
                    <th className="px-6 py-3">Утасны дугаар</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} className="border-b bg-white hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{user.firstName}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.phoneNumber}</td>
                      <td className="px-6 py-4">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                          onClick={() => handleUpdate(user)}
                        >
                          Өөрчлөх
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-md"
                          onClick={() => handleDelete(user.id)}
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

        {/* Modal for updating user */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-sm">
              <h3 className="text-xl font-bold mb-4">Өөрчлөх</h3>

              <label className="block text-sm mb-2">Нэр</label>
              <input
                type="text"
                name="firstName"
                value={updatedUser.firstName}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded-md"
              />

              <label className="block text-sm mb-2">Имэйл</label>
              <input
                type="text"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded-md"
              />

              <label className="block text-sm mb-2">Утасны дугаар</label>
              <input
                type="text"
                name="phoneNumber"
                value={updatedUser.phoneNumber}
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
