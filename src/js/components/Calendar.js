import React, { Component } from 'react';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      loading: true
    }
  }
  componentDidMount() {
    this.serviceRequest =
      axios.get('http://api.txgarage.com/events/')
        .then((result) => {
          this.setState({
            events: result.data.events,
            loading: false
          });
        });
  }
  render() {
    const { events, loading } = this.state;
    return (
      <div>
        {loading
          ? <div>Loading...</div>
          : <BigCalendar
              events={events}
              startAccessor='startDate'
              endAccessor='endDate'
            />
        }
      </div>
    );
  }
}

export default MyCalendar;
