// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    fetch('/api/hotels')
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error('Error fetching hotels:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewHotel({ ...newHotel, [e.target.name]: e.target.value });
  };

  const handleAddHotel = () => {
    fetch('/api/hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHotel),
    })
      .then((res) => res.json())
      .then((data) => {
        setHotels([...hotels, data]);
        setNewHotel({
          name: '',
          location: '',
          description: '',
        });
      })
      .catch((error) => console.error('Error adding hotel:', error));
  };

  return (
    <div className="App">
      <h1>Hotel Management System</h1>
      <div>
        <h2>Hotels</h2>
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel._id}>
              <strong>{hotel.name}</strong> - {hotel.location}
            </li>
          ))}
        </ul>
      </div>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={newHotel.name} onChange={handleInputChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={newHotel.location} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={newHotel.description} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleAddHotel}>
          Add Hotel
        </button>
      </form>
    </div>
  );
}

export default App;
