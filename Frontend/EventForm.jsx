import React from "react";

const EventForm = () => (
  <form style={{ margin: "2rem 0" }}>
    <h3>Create / Edit Event</h3>
    <input type="text" placeholder="Event Name" />
    <br />
    <br />
    <textarea placeholder="Event Description"></textarea>
    <br />
    <br />
    <button type="submit">Submit</button>
  </form>
);

export default EventForm;
