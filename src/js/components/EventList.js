import React from 'react';
import { Link } from 'react-router';

const EventList = ({ evt }) => {
  const { id, title, coverPhoto, city, startDate, endDate } = evt;
  return (
    <div className="event-list--event">
      <div className="event-list__hero">
        <Link to={`/event-calendar/${id}`}>
          <img src={coverPhoto} alt={title} />
        </Link>
      </div>
      <div className="event-list__excerpt">
        <Link to={`/event-calendar/${id}`}>
          <h3>{title}</h3>
        </Link>
        {city} | {startDate} to {endDate}
      </div>
    </div>
  );
};

export default EventList;
