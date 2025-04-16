import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TournamentManager() {
  const [showForm, setShowForm] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");


  const [form, setForm] = useState({
    name: "",
    date: "",
    location: "",
    teamCount: "",
    logo: "",
    selectedCategories: [],
    description: "",
  });

  const [categoryToAdd, setCategoryToAdd] = useState("");
  const navigate = useNavigate();

  const handleAddCategory = () => {
    if (categoryToAdd && !form.selectedCategories.includes(categoryToAdd)) {
      setForm((prev) => ({
        ...prev,
        selectedCategories: [...prev.selectedCategories, categoryToAdd],
      }));
      setCategoryToAdd("");
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, logo: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const payload = {
        ...form,
        selectedCategories: form.selectedCategories.join(","),
        userId: parseInt(userId),
      };

      await axios.post("http://localhost:8080/monitor", payload);
      fetchTournaments();
      setShowForm(false);
      setForm({
        name: "",
        date: "",
        location: "",
        teamCount: "",
        logo: "",
        selectedCategories: [],
        description: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTournaments = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.get(`http://localhost:8080/monitor/user/${userId}`);
      setTournaments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-[#427B91] p-4 text-white flex flex-col justify-between min-h-screen">
        {/* Top Buttons */}
        <div className="space-y-4">
          <button className="w-full py-2 bg-gray-200 text-blue-600 rounded">Тэмцээн</button>
          <button
            onClick={() => navigate("/teams")}
            className="w-full py-2 bg-gray-200 text-black rounded"
          >
            Багууд
          </button>
          <button
            onClick={() => navigate("/teams-admin")}
            className="w-full py-2 bg-gray-200 text-black rounded"
          >
            Тоглогчдын үзүүлэлт
          </button>
        </div>

        {/* Bottom Logout */}
        <div className="mt-auto pt-6">
          <button className="bg-blue-800 text-white w-full py-2 rounded" onClick={() => navigate("/login")}>👤 Гарах</button>

        </div>
      </aside>

        

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="bg-[#427B91] rounded-md p-3 mb-6 mt-16 flex justify-end">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-400 hover:bg-green-500 text-black px-4 py-1 rounded"
          >
            Тэмцээн үүсгэх
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex justify-end mb-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">-- Ангилал шүүх --</option>
            <option value="Эрэгтэй">Эрэгтэй</option>
            <option value="Эмэгтэй">Эмэгтэй</option>
            <option value="Оюутан">Оюутан</option>
          </select>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-md shadow-md max-w-2xl mb-6">
            <div className="grid grid-cols-2 gap-4">
              <label>
                Тэмцээний нэр
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border px-2 py-1 rounded"
                />
              </label>

              <label>
                Огноо
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border px-2 py-1 rounded"
                />
              </label>

              <label>
                Байршил
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Хот, байршил оруулна уу"
                  className="w-full border px-2 py-1 rounded"
                />
              </label>

              <label>
                Нийт багийн тоо
                <input
                  type="number"
                  value={form.teamCount}
                  onChange={(e) => setForm({ ...form, teamCount: e.target.value })}
                  className="w-full border px-2 py-1 rounded"
                />
              </label>

              <label className="col-span-2">
                Тэмцээний лого (зураг)
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-full border px-2 py-1 rounded"
                />
              </label>

              <label className="col-span-2">
                Тэмцээний ангилал
                <div className="flex gap-2 items-center">
                  <select
                    value={categoryToAdd}
                    onChange={(e) => setCategoryToAdd(e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  >
                    <option value="">-- Сонгох --</option>
                    <option value="Эрэгтэй">Эрэгтэй</option>
                    <option value="Эмэгтэй">Эмэгтэй</option>
                    <option value="Оюутан">Оюутан</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </label>

              <div className="col-span-2">
                <p className="text-sm text-gray-600">Сонгосон ангилал:</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {form.selectedCategories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 px-3 py-1 text-sm rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <label className="col-span-2">
                Тэмцээний тайлбар
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border px-2 py-1 rounded h-24"
                />
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Хадгалах
            </button>
          </div>
        )}

        {/* Tournament Cards */}
        {tournaments
          .filter((t) =>
            filterCategory === ""
              ? true
              : t.selectedCategories?.split(",").includes(filterCategory)
          )
          .map((t, index) => (
            <div
              key={index}
              onClick={() => {
                localStorage.setItem("tournamentId", t.id);
                navigate("/teams");
              }}
              className="cursor-pointer bg-white shadow-sm rounded-md p-4 flex items-center gap-4 mb-4 hover:shadow-md transition"
            >
              <img
                src={t.logo}
                alt="logo"
                className="h-16 w-16 object-contain rounded"
              />
              <div>
                <p className="text-gray-500 text-sm">
                  {t.selectedCategories?.split(",").map((cat, i) => (
                    <span key={i} className="mr-2">
                      {cat}
                    </span>
                  ))}
                </p>
                <h3 className="font-bold text-lg">{t.name}</h3>
                <p className="text-sm text-gray-700">{t.date}</p>
                <p className="text-gray-600">{t.description}</p>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}
