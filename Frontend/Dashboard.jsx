import React from "react";
import EventForm from "./EventForm";
import EventCard from "./EventCard";

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
    <EventForm />
    {/* In a real app, map over events and render EventCard for each */}
    <EventCard />
    <EventCard />
  </div>
);

export default Dashboard;
