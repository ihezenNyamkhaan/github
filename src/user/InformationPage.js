import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";

const InformationPage = () => {
  const navigate = useNavigate();
  const { tournamentId } = useParams(); 
  const numericTournamentId = parseInt(tournamentId);

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Main Header Section */}
      <header className="bg-blue-600 text-white text-center">
        <div className="flex items-center justify-between px-10 py-4 shadow bg-white mb-10">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10" />
            <span className="font-bold text-lg">BASKETBALL</span>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-gray-700">
            <a href="/tournament">Тэмцээн</a>
            <a href="#" className="text-blue-600">Холбоо барих</a>
            <a href={`team-register/${numericTournamentId}`}>Баг бүртгэх</a>
            <a href="/userprofile">Профайл</a>
          </nav>
          <button className="bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
            onClick={() => navigate("/login")}>
            <FaUserCircle /> Нэвтрэх
          </button>
        </div>

        <h1 className="text-4xl font-extrabold">Манай Сайт руу Тавтай Морилно Уу</h1>
        <p className="mt-4 text-lg">Бид таныг илүү сайн вебсайт болон аппликейшнүүдийг бүтээхэд туслах шийдлүүдийг санал болгож байна.</p>
      </header>

      {/* About Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Манай Тухай</h2>
          <p className="mt-4 text-lg text-gray-600">Манай сайт нь монголын сагсан бөмбөгийн тэмцээн, баг бүртгэл болон олон өөр боломжуудыг санал болгож байна. Бид бүхий л төрлийн хэрэглэгчдэд зориулсан үйлчилгээ, мэдээллийг агуулсан платформыг санал болгож байна.</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Манай Онцлог Тусгай Чиглэлүүд</h2>
          <p className="mt-4 text-lg text-gray-600">Бид танд дараах онцлог тусгай чадваруудыг санал болгож байна.</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition duration-300">
              <h3 className="text-xl font-semibold">Хариуцлагатай Дизайн</h3>
              <p className="mt-2 text-gray-500">Манай дизайнууд нь гар утас болон бүх төрлийн төхөөрөмж дээр төгс харагдана.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition duration-300">
              <h3 className="text-xl font-semibold">Хэрэглэгчийн Тусгай Тохиргоо</h3>
              <p className="mt-2 text-gray-500">Танд хэрэгтэй бүх компонентуудыг өөрийн брендийн загвараар тохируулах боломжтой.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition duration-300">
              <h3 className="text-xl font-semibold">24/7 Дэмжлэг</h3>
              <p className="mt-2 text-gray-500">Манай баг нь өдөр бүр 24 цагийн турш таны асуултанд хариу өгөх боломжтой.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Манай Үйлчилгээ</h2>
          <p className="mt-4 text-lg text-gray-600">Бид таны хэрэгцээнд тохирсон шилдэг үйлчилгээг санал болгож байна.</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              <h3 className="text-xl font-semibold">Вэб Хөгжүүлэлт</h3>
              <p className="mt-2 text-gray-200">Манай баг нь орчин үеийн болон хариуцлагатай вэбсайтуудыг хөгжүүлдэг.</p>
            </div>
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              <h3 className="text-xl font-semibold">Апп Хөгжүүлэлт</h3>
              <p className="mt-2 text-gray-200">Өндөр гүйцэтгэлтэй аппликейшнүүдийг олон платформд зориулан бүтээдэг.</p>
            </div>
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              <h3 className="text-xl font-semibold">UI/UX Дизайн</h3>
              <p className="mt-2 text-gray-200">Манай дизайнууд нь бүх төхөөрөмж дээр хэрэглэгчдэд ээлтэй байдаг.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-200">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Холбоо Барих</h2>
          <p className="mt-4 text-lg text-gray-600">Бидэнтэй холбогдож танд хэрэгтэй мэдээллийг аваарай.</p>

          <form className="mt-8 space-y-4 max-w-lg mx-auto">
            <input
              type="text"
              className="w-full p-3 rounded-md bg-white shadow-sm"
              placeholder="Таны Нэр"
            />
            <input
              type="email"
              className="w-full p-3 rounded-md bg-white shadow-sm"
              placeholder="Таны Имэйл"
            />
            <textarea
              className="w-full p-3 rounded-md bg-white shadow-sm"
              placeholder="Таны Мэдэгдэл"
              rows="4"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Мэдэгдэл Илгээх
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <p>&copy; 2025 Манай Сайт. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </footer>

    </div>
  );
};

export default InformationPage;
