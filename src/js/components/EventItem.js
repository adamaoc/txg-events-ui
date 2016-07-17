import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import EventModal from './EventModal';

class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evt: null
    };
    this.closeModal = this._closeModal.bind(this);
  }
  componentDidMount() {
    document.body.style.overflow = 'hidden';
    const url = 'http://api.txgarage.com/events/' + this.props.params.eventId;
    this.serviceRequest =
      axios.get(url)
        .then((result) => {
          this.setState({ evt: result.data.event });
        });
  }
  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }
  _closeModal(e) {
    if (e.currentTarget === e.target || e.target.classList[0] ===  'event-modal__closer-svg') {
      this.context.router.replace('/event-calendar/' + window.location.search);
    }
    return true;
  }
  renderDate(startDate, endDate) {
    const start = moment(startDate);
    const end = moment(endDate);
    if (endDate === "0000-00-00" || startDate === endDate) {
      return (
        <span>
        <p><label>Date:</label> {start.format("MMM Do YYYY")}</p>
        </span>
      );
    }
    return (
      <span>
        <p><label>Start Date:</label> {start.format("MMM Do YYYY")}</p>
        <p><label>End Date:</label> {end.format("MMM Do YYYY")}</p>
      </span>
    )
  }
  render() {
    const { evt } = this.state;
    if (evt) {
      const selectedEvt = evt[0];
      const imgStyle = 'url('+selectedEvt.coverPhoto+')';
      const time = moment(selectedEvt.startDate + ' ' + selectedEvt.time);
      return (
        <EventModal title={selectedEvt.title} closeModal={this.closeModal}>
          <div>
            <div className="event-modal__hero" style={{backgroundImage: imgStyle}}></div>
            <p><label>City:</label> {selectedEvt.city}</p>
            {this.renderDate(selectedEvt.startDate, selectedEvt.endDate)}
            <p><label>Time:</label> {time.format("h:mm a")}</p>
            <p><label>Address:</label> {selectedEvt.address}</p>
            <p>{selectedEvt.details}</p>
            <p><a href={selectedEvt.weblink} target="_blank">Find out more</a></p>
            {/* <div>{JSON.stringify(selectedEvt)}</div> */}
          </div>
        </EventModal>
      );
    } else {
      return (<div>loading...</div>);
    }
  }
}

EventItem.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default EventItem;
