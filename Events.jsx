import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    "all",
    "academic",
    "cultural",
    "sports",
    "technical",
    "social",
    "workshop",
  ];

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: "Tech Conference 2024",
        description: "Annual technology conference featuring industry experts",
        date: "2024-03-15",
        time: "09:00 AM",
        location: "Main Auditorium",
        category: "technical",
        organizer: "Computer Science Department",
        attendees: 150,
        maxAttendees: 200,
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
      },
      {
        id: 2,
        title: "Cultural Fest",
        description: "Celebrate diversity with music, dance, and art",
        date: "2024-03-20",
        time: "06:00 PM",
        location: "Open Air Theater",
        category: "cultural",
        organizer: "Cultural Committee",
        attendees: 300,
        maxAttendees: 500,
        image:
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
      },
      {
        id: 3,
        title: "Sports Meet",
        description: "Annual inter-college sports competition",
        date: "2024-03-25",
        time: "08:00 AM",
        location: "Sports Complex",
        category: "sports",
        organizer: "Physical Education Department",
        attendees: 200,
        maxAttendees: 300,
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      },
      {
        id: 4,
        title: "Workshop on AI",
        description: "Learn the basics of artificial intelligence",
        date: "2024-03-30",
        time: "02:00 PM",
        location: "Lab 101",
        category: "workshop",
        organizer: "AI Research Lab",
        attendees: 25,
        maxAttendees: 30,
        image:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
      },
    ];

    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, events]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return (
      <div className="events-loading">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Discover Events</h1>
        <p>Find and join amazing events happening around campus</p>
      </div>

      <div className="events-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="events-stats">
        <p>
          Showing {filteredEvents.length} of {events.length} events
        </p>
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="no-events">
            <h3>No events found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
