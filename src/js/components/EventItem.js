import React, { Component } from 'react';
import axios from 'axios';
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
  render() {
    const { evt } = this.state;
    if (evt) {
      const selectedEvt = evt[0];
      const imgStyle = 'url('+selectedEvt.coverPhoto+')';
      return (
        <EventModal title={selectedEvt.title} closeModal={this.closeModal}>
          <div>
            <div className="event-modal__hero" style={{backgroundImage: imgStyle}}></div>
            <p>City: {selectedEvt.city}</p>
            <p>Start Date: {selectedEvt.startDate}</p>
            <p>End Date: {selectedEvt.endDate}</p>
            <p>Time: {selectedEvt.time}</p>
            <p>Address: {selectedEvt.address}</p>
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
