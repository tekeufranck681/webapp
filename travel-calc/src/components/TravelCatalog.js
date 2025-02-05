import React, { useState } from "react";
import "./TravelCatalog.css";
import paris from "../Homepage/img/paris.jpg"
import newyork from "../Homepage/img/newyork.jpg"
import tokyo from "../Homepage/img/tokyo.jpg"
import capetown from "../Homepage/img/capetown.jpg"
import bali from "../Homepage/img/bali.jpg"

const travelData = [
  {
    id: 1,
    destination: "Paris, France",
    duration: 7,
    agency: "Wanderlust Travels",
    price: 2500,
    rating: 4.8,
    description: "Explore the romance of Paris with guided tours, iconic landmarks, and authentic cuisine.",
    image: paris,
  },
  {
    id: 2,
    destination: "Tokyo, Japan",
    duration: 10,
    agency: "Explore Japan Tours",
    price: 3200,
    rating: 4.7,
    description: "Discover the beauty of Japan with a mix of modern skyscrapers, historic temples, and delicious sushi.",
    image: tokyo,
  },
  {
    id: 3,
    destination: "New York City, USA",
    duration: 5,
    agency: "Dream Destinations",
    price: 1800,
    rating: 4.6,
    description: "Experience the magic of NYC, from Times Square to Central Park, in a once-in-a-lifetime journey.",
    image: newyork,
  },
  {
    id: 4,
    destination: "Cape Town, South Africa",
    duration: 8,
    agency: "Safari Adventure",
    price: 2200,
    rating: 4.9,
    description: "Explore nature's beauty with a safari tour and breathtaking landscapes of Cape Town.",
    image: capetown,
  },
  {
    id: 5,
    destination: "Bali, Indonesia",
    duration: 6,
    agency: "Tropical Getaways",
    price: 2000,
    rating: 4.5,
    description: "Relax on the white sandy beaches of Bali, surrounded by tropical paradise and amazing nightlife.",
    image: bali,
  },
  {
    id: 1,
    destination: "Paris, France",
    duration: 7,
    agency: "Wanderlust Travels",
    price: 2500,
    rating: 4.8,
    description: "Explore the romance of Paris with guided tours, iconic landmarks, and authentic cuisine.",
    image: paris,
  },
  {
    id: 2,
    destination: "Tokyo, Japan",
    duration: 10,
    agency: "Explore Japan Tours",
    price: 3200,
    rating: 4.7,
    description: "Discover the beauty of Japan with a mix of modern skyscrapers, historic temples, and delicious sushi.",
    image: tokyo,
  },
  {
    id: 3,
    destination: "New York City, USA",
    duration: 5,
    agency: "Dream Destinations",
    price: 1800,
    rating: 4.6,
    description: "Experience the magic of NYC, from Times Square to Central Park, in a once-in-a-lifetime journey.",
    image: newyork,
  },
  {
    id: 4,
    destination: "Cape Town, South Africa",
    duration: 8,
    agency: "Safari Adventure",
    price: 2200,
    rating: 4.9,
    description: "Explore nature's beauty with a safari tour and breathtaking landscapes of Cape Town.",
    image: capetown,
  },
  {
    id: 5,
    destination: "Bali, Indonesia",
    duration: 6,
    agency: "Tropical Getaways",
    price: 2000,
    rating: 4.5,
    description: "Relax on the white sandy beaches of Bali, surrounded by tropical paradise and amazing nightlife.",
    image: bali,
  },
  
];

const TravelCatalog = () => {
  const [filter, setFilter] = useState({ price: "", duration: "" });
  const [selectedTrip, setSelectedTrip] = useState(null);

  const filteredTrips = travelData.filter((trip) => {
    return (
      (filter.price ? trip.price <= filter.price : true) &&
      (filter.duration ? trip.duration <= filter.duration : true)
    );
  });

  return (
    <div className="travel-container">
      <h1 className="title">🌍 Ultimate Travel Explorer</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <label>Max Price ($):</label>
        <input
          type="number"
          placeholder="Enter max price"
          onChange={(e) => setFilter({ ...filter, price: e.target.value })}
        />
        <label>Max Duration (Days):</label>
        <input
          type="number"
          placeholder="Enter max duration"
          onChange={(e) => setFilter({ ...filter, duration: e.target.value })}
        />
      </div>

      {/* Travel Packages List */}
      <div className="catalog-grid">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="travel-card">
            <img src={trip.image} alt={trip.destination} className="travel-image" />
            <div className="travel-details">
              <h2 className="destination">{trip.destination}</h2>
              <p className="duration">{trip.duration} Days</p>
              <p className="price">Price: <strong>${trip.price}</strong></p>
              <p className="rating">⭐ {trip.rating} / 5</p>
              <div className="buttons">
                <button className="view-btn" onClick={() => setSelectedTrip(trip)}>View Details</button>
                <button className="budget-btn">Plan Budget</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Trip Modal */}
      {selectedTrip && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setSelectedTrip(null)}>&times;</span>
            <h2>{selectedTrip.destination}</h2>
            <img src={selectedTrip.image} alt={selectedTrip.destination} />
            <p><strong>Agency:</strong> {selectedTrip.agency}</p>
            <p><strong>Duration:</strong> {selectedTrip.duration} Days</p>
            <p><strong>Price:</strong> ${selectedTrip.price}</p>
            <p><strong>Description:</strong> {selectedTrip.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelCatalog;
