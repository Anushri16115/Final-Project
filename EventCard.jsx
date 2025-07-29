import React from "react";
import { utils } from "../services/api";
import "./EventCard.css";

const EventCard = ({ event }) => {
  if (!event) {
    return (
      <div className="event-card loading">
        <div className="loading-spinner"></div>
        <p>Loading event...</p>
      </div>
    );
  }

  const eventStatus = utils.getEventStatus(event);
  const isFull = event.attendees >= event.maxAttendees;
  const attendancePercentage = (event.attendees / event.maxAttendees) * 100;

  return (
    <div className="event-card">
      <div className="event-image">
        <img
          src={
            event.image ||
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"
          }
          alt={event.title}
        />
        <div className={`event-status ${eventStatus}`}>
          {eventStatus === "past"
            ? "Past"
            : eventStatus === "full"
            ? "Full"
            : "Upcoming"}
        </div>
      </div>

      <div className="event-content">
        <div className="event-header">
          <h3 className="event-title">{event.title}</h3>
          <span className="event-category">{event.category}</span>
        </div>

        <p className="event-description">{event.description}</p>

        <div className="event-details">
          <div className="detail-item">
            <span className="detail-icon">📅</span>
            <span>{utils.formatDate(event.date)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">🕒</span>
            <span>{utils.formatTime(event.time)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span>{event.location}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">👤</span>
            <span>{event.organizer}</span>
          </div>
        </div>

        <div className="event-attendance">
          <div className="attendance-info">
            <span>
              {event.attendees} / {event.maxAttendees} attendees
            </span>
            <span className="attendance-percentage">
              {Math.round(attendancePercentage)}% full
            </span>
          </div>
          <div className="attendance-bar">
            <div
              className="attendance-fill"
              style={{ width: `${attendancePercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="event-actions">
          <button
            className={`action-button ${isFull ? "disabled" : "primary"}`}
            disabled={isFull}
          >
            {isFull ? "Event Full" : "Register"}
          </button>
          <button className="action-button secondary">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
