import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Link } from 'react-router';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

const ListedItem = ({ evt }) => {
  const { id, title, coverPhoto, city, startDate, endDate } = evt;
  const start = moment(startDate);
  const end = moment(endDate);
  let dateMessage;
  if (endDate === "0000-00-00" || startDate === endDate) {
    dateMessage = start.format("MMM Do YYYY");
  } else {
    dateMessage = start.format("MMM Do YYYY") + ' to ' + end.format("MMM Do YYYY");
  }
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
        {city} | {dateMessage}
      </div>
    </div>
  );
};

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = { btnText: 'List View' };
    this.handleCalNav = this._handleCalNav.bind(this);
    this.handleCalSelectEvt = this._handleCalSelectEvt.bind(this);
  }
  _handleCalNav(date) {
    const moveDate = moment(date);
    const month = moveDate.get('month');
  }
  _handleCalSelectEvt(evt) {
    const path = `/event-calendar/${evt.id}/`;
    browserHistory.push(path);
  }
  render() {
    const { events, calView } = this.props;
    const { btnText } = this.state;
    return (
      <div className="txg-event-list">
        <div className="txg-event-list__listed">
          {calView
            ? <BigCalendar
                events={events}
                startAccessor='startDate'
                endAccessor='endDate'
                views={['month']}
                onNavigate={this.handleCalNav}
                onSelectEvent={this.handleCalSelectEvt}
              />
            : events.map((evt, i) => {
              return <ListedItem evt={evt} key={i} />
            })
          }
        </div>
      </div>
    );
  }
}

export default EventList;
