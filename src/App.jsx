import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"; // Router ve Link import ediliyor
import Select from "react-select";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import ButtonImage from "./assets/greenPlus2.jpg"; 
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
  const [searchTerm, setSearchTerm] = useState("");
  const [depolar, setDepolar] = useState([
    { id: 1, name: "Depo 1", location: "Yazılım Mühendisliği", capacity: "Helin Özalkan" },
    { id: 2, name: "Depo 2", location: "Mekatronik Mühendisliği", capacity: "Ali Veli" },
    { id: 3, name: "Depo 3", location: "Bilgisayar Mühendisliği", capacity: "Helin Özalkan" },
    { id: 4, name: "Depo 4", location: "Kimya Mühendisliği", capacity: "Ayşe Yılmaz" },
    { id: 5, name: "Depo 5", location: "Makine Mühendisliği", capacity: "Mehmet Demir" },
    { id: 6, name: "Depo 6", location: "Elektrik-Elektronik Mühendisliği", capacity: "Helin Özalkan" },
    { id: 7, name: "Depo 7", location: "Moleküler Biyoloji ve Genetik Mühendisliği", capacity: "Helin Özalkan" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showOptionsForm, setShowOptionsForm] = useState(false);
  const [newDepo, setNewDepo] = useState({ name: "", location: "", capacity: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!newDepo.name.trim()) {
      errors.name = "Depo adı boş olamaz.";
    } else if (newDepo.name.length < 3 || newDepo.name.length > 50) {
      errors.name = "Depo adı 3 ile 50 karakter arasında olmalıdır.";
    }

    if (!newDepo.location.trim()) {
      errors.location = "Bölüm alanı boş olamaz.";
    } else if (newDepo.location.length < 3 || newDepo.location.length > 50) {
      errors.location = "Bölüm alanı 3 ile 50 karakter arasında olmalıdır.";
    }

    if (!newDepo.capacity.trim()) {
      errors.capacity = "Depo sahibi alanı boş olamaz.";
    } else if (newDepo.capacity.length < 3 || newDepo.capacity.length > 50) {
      errors.capacity = "Depo sahibi 3 ile 50 karakter arasında olmalıdır.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddDepo = () => {
    if (!validateForm()) return;

    setDepolar([
      ...depolar,
      {
        id: depolar.length + 1,
        name: newDepo.name,
        location: newDepo.location,
        capacity: newDepo.capacity,
      },
    ]);
    setNewDepo({ name: "", location: "", capacity: "" });
    setErrors({});
    setShowForm(false);
  };

  const filteredDepolar = depolar.filter((depo) =>
    depo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    depo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    depo.capacity.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const handleOptionSelect = (option) => {
    alert(`${option} işlemi seçildi.`);
    setShowOptionsForm(false);
  };

  return (
    <div className="depot-page">
      <h2>Depoları Görüntüle</h2>
      <div className="search-and-edit">
        <input
          type="text"
          placeholder="Depo, Bölüm veya Depo Sahibi ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          className="edit-button"
          onClick={() => setShowOptionsForm(true)}
        >
          Depoları Düzenle
        </button>
      </div>

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
        <img
          src={ButtonImage}
          alt="Add"
          className="add-button"
          onClick={() => setShowForm(true)}
        />
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h3>Yeni Depo Ekle</h3>
            <input
              type="text"
              placeholder="Depo Adı"
              value={newDepo.name}
              onChange={(e) => setNewDepo({ ...newDepo, name: e.target.value })}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}

            <input
              type="text"
              placeholder="Bölüm"
              value={newDepo.location}
              onChange={(e) => setNewDepo({ ...newDepo, location: e.target.value })}
            />
            {errors.location && <p className="error-message">{errors.location}</p>}

            <input
              type="text"
              placeholder="Depo Sahibi"
              value={newDepo.capacity}
              onChange={(e) => setNewDepo({ ...newDepo, capacity: e.target.value })}
            />
            {errors.capacity && <p className="error-message">{errors.capacity}</p>}

            <div className="form-buttons">
              <button onClick={handleAddDepo}>Kaydet</button>
              <button onClick={() => setShowForm(false)}>Kapat</button>
            </div>
          </div>
        </div>
      )}

      {showOptionsForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h3>Depoları Düzenle</h3>
            <button
              className="option-button"
              onClick={() => handleOptionSelect("Depo Sil")}
            >
              Depo Sil
            </button>
            <button
              className="option-button"
              onClick={() => handleOptionSelect("Depo Bilgilerini Güncelle")}
            >
              Depo Bilgilerini Güncelle
            </button>
            <button
              className="close-button"
              onClick={() => setShowOptionsForm(false)}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
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
