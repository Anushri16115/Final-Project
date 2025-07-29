import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to College Event Management</h1>
          <p>Organize, discover, and participate in amazing college events</p>
          <div className="hero-buttons">
            <Link to="/events" className="btn btn-primary">
              Browse Events
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Event Creation</h3>
            <p>Create and manage events with our intuitive interface</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Community Driven</h3>
            <p>Connect with fellow students and discover new opportunities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Real-time Updates</h3>
            <p>Stay informed with instant notifications and updates</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <h3>500+</h3>
          <p>Events Created</p>
        </div>
        <div className="stat-item">
          <h3>10,000+</h3>
          <p>Active Users</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Colleges</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
