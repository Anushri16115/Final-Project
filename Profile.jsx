import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  // Mock user data - in a real app, this would come from an API
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@college.edu",
      studentId: "STU2024001",
      department: "Computer Science",
      year: "3rd Year",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      phone: "+1 (555) 123-4567",
      joinedDate: "2022-09-01",
      eventsCreated: 5,
      eventsAttended: 12,
      bio: "Passionate about technology and community building. Love organizing tech events and workshops.",
    };

    setUser(mockUser);
    setLoading(false);
  }, []);

  const [userEvents] = useState([
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "2024-03-15",
      status: "attended",
      role: "attendee",
    },
    {
      id: 2,
      title: "Coding Workshop",
      date: "2024-02-20",
      status: "created",
      role: "organizer",
    },
    {
      id: 3,
      title: "Cultural Fest",
      date: "2024-01-15",
      status: "attended",
      role: "attendee",
    },
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-error">
        <h2>Profile not found</h2>
        <p>Unable to load user profile</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={user.avatar} alt={user.name} />
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="user-email">{user.email}</p>
          <p className="user-department">
            {user.department} • {user.year}
          </p>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">{user.eventsCreated}</span>
              <span className="stat-label">Events Created</span>
            </div>
            <div className="stat">
              <span className="stat-number">{user.eventsAttended}</span>
              <span className="stat-label">Events Attended</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => handleTabChange("profile")}
        >
          Profile
        </button>
        <button
          className={`tab-button ${activeTab === "events" ? "active" : ""}`}
          onClick={() => handleTabChange("events")}
        >
          My Events
        </button>
        <button
          className={`tab-button ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => handleTabChange("settings")}
        >
          Settings
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "profile" && (
          <div className="profile-details">
            <div className="detail-section">
              <h3>Personal Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Student ID</label>
                  <span>{user.studentId}</span>
                </div>
                <div className="detail-item">
                  <label>Phone</label>
                  <span>{user.phone}</span>
                </div>
                <div className="detail-item">
                  <label>Joined</label>
                  <span>{new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Bio</h3>
              <p className="user-bio">{user.bio}</p>
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="user-events">
            <h3>My Event History</h3>
            <div className="events-list">
              {userEvents.map((event) => (
                <div key={event.id} className="event-item">
                  <div className="event-info">
                    <h4>{event.title}</h4>
                    <p className="event-date">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="event-status">
                    <span className={`status-badge ${event.status}`}>
                      {event.status === "attended" ? "Attended" : "Created"}
                    </span>
                    <span className="role-badge">{event.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="profile-settings">
            <h3>Account Settings</h3>
            <div className="settings-form">
              <div className="form-group">
                <label>Display Name</label>
                <input type="text" defaultValue={user.name} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue={user.email} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" defaultValue={user.phone} />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea defaultValue={user.bio} rows="4"></textarea>
              </div>
              <button className="save-button">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
