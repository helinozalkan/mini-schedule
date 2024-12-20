import React, { useState } from "react";
import Select from "react-select";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import "./App.css";

const App = () => {
  // Başlangıçta her gün için boş bir dizi
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
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Schedule</h2>
        <ul>
          <li><AiOutlineHome /> Bilgi Girişi</li>
          <li><AiOutlineHome /> Ders Programı Oluştur</li>
          <li><AiOutlineHome /> Sınav Programı Oluştur</li>
          <li><AiOutlineHome /> Bilgi Görüntüle</li>
          <li><AiOutlineSetting /> Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
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
    </div>
  );
};

export default App;
