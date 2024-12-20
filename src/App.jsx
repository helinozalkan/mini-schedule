import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"; // Router ve Link import ediliyor
import Select from "react-select";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import "./App.css";

// Sayfa bileşenlerini oluşturuyoruz
const SchedulePage = () => {
  const [selectedHours, setSelectedHours] = useState(
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].reduce(
      (acc, day) => {
        acc[day] = []; // Her gün için boş bir dizi
        return acc;
      },
      {}
    )
  );

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = ["08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30"];

  const toggleSelectAll = (day) => {
    setSelectedHours((prev) => ({
      ...prev,
      [day]: prev[day]?.length === hours.length ? [] : hours,
    }));
  };

  return (
    <div className="main-content">
      <h2>Ders Programı Oluştur</h2>
      <div className="header">
        <input type="text" placeholder="Enter academian name..." />
        <Select options={[{ value: "Faculty1", label: "Faculty 1" }]} placeholder="Select faculty" />
        <Select isMulti options={[{ value: "BMY201", label: "BMY 201" }]} placeholder="Ders kodları" />
      </div>
      <div className="schedule">
        {days.map((day) => (
          <div key={day} className="day">
            <h4>{day}</h4>
            {hours.map((hour) => (
              <div key={hour}>
                <input
                  type="checkbox"
                  checked={selectedHours[day]?.includes(hour) || false}
                  onChange={() =>
                    setSelectedHours((prev) => ({
                      ...prev,
                      [day]: prev[day]?.includes(hour)
                        ? prev[day].filter((h) => h !== hour)
                        : [...(prev[day] || []), hour],
                    }))
                  }
                />
                <label>{hour}</label>
              </div>
            ))}
            <button onClick={() => toggleSelectAll(day)}>Select all</button>
          </div>
        ))}
      </div>
      <button className="save-button">Save</button>
    </div>
  );
};
const DepolarPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimini tutan state
  const depolar = [
    { id: 1, name: "Depo 1", location: "Yazılım Mühendisliği", capacity: "Helin Özalkan" },
    { id: 2, name: "Depo 2", location: "Mekatronik Mühendisliği", capacity: "Ali Veli" },
    { id: 3, name: "Depo 3", location: "Bilgisayar Mühendisliği", capacity: "Helin Özalkan" },
    { id: 4, name: "Depo 4", location: "Kimya Mühendisliği", capacity: "Ayşe Yılmaz" },
    { id: 5, name: "Depo 5", location: "Makine Mühendisliği", capacity: "Mehmet Demir" },
    { id: 6, name: "Depo 6", location: "Elektrik-Elektronik Mühendisliği", capacity: "Helin Özalkan" },
  ];

  // Arama metnine göre filtreleme
  const filteredDepolar = depolar.filter((depo) =>
    depo.capacity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="depot-page">
      <h2>Depoları Görüntüle</h2>

      {/* Arama alanı */}
      <input
        type="text"
        placeholder="Depo,Bölüm veya Depo Sahibi ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="depot-cards">
        {filteredDepolar.length > 0 ? (
          filteredDepolar.map((depo) => (
            <div key={depo.id} className="depot-card">
              <h3>{depo.name}</h3>
              <p>Bölüm: {depo.location}</p>
              <p>Depo Sahibi: {depo.capacity}</p>
            </div>
          ))
        ) : (
          <p>Arama kriterlerine uygun depo bulunamadı.</p>
        )}
      </div>
    </div>
  );
};


const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Schedule</h2>
          <ul>
            <li><AiOutlineHome /> <Link to="/">Bilgi Girişi</Link></li>
            <li><AiOutlineHome /> <Link to="/schedule">Ders Programı Oluştur</Link></li>
            <li><AiOutlineHome /> <Link to="/exam">Sınav Programı Oluştur</Link></li>
            <li><AiOutlineHome /> <Link to="/info">Bilgi Görüntüle</Link></li>
            <li><AiOutlineHome /> <Link to="/depot">Depoları Görüntüle</Link></li>
            <li><AiOutlineSetting /> <Link to="/settings">Settings</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<div>Bilgi Girişi</div>} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/exam" element={<div>Sınav Programı Oluştur</div>} />
            <Route path="/info" element={<div>Bilgi Görüntüle</div>} />
            <Route path="/depot" element={<DepolarPage />} />
            <Route path="/settings" element={<div>Settings Sayfası</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
