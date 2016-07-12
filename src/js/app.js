import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import EventList from './components/EventList';


const cityFilter = [
  { label: 'DFW', value: 'dfw' },
  { label: 'Houston', value: 'houston' },
  { label: 'San Antonio', value: 'san_antonio' },
  { label: 'Austin', value: 'austin' },
  { label: 'Lubbock', value: 'lubbock' },
  { label: 'Victoria', value: 'Victoria' }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      loading: true,
      curFilter: null
    };
    this.handleFilterSwitch = this._handleFilterSwitch.bind(this);
    this.removeFilter = this._removeFilter.bind(this);
  }
  componentDidMount() {
    this.serviceRequest =
      axios.get('http://api.txgarage.com/events/')
        .then((result) => {
          this.setState({
            allEvents: result.data.events,
            events: result.data.events,
            loading: false
          });
        });
  }
  componentWillUnmount() {
    // this.serviceRequest.abort();
  }
  _removeFilter() {
    this.setState({
      events: this.state.allEvents,
      curFilter: null
    });
  }
  _handleFilterSwitch(value) {
    const url = 'http://api.txgarage.com/events/majorcity/' + value.value;
    this.setState({
      loading: true,
      curFilter: value
    });

    this.serviceRequest =
      axios.get(url)
        .then((result) => {
          this.setState({
            events: result.data.events,
            loading: false
          });
        });
  }
  render() {
    const { loading, events, curFilter } = this.state;
    if (!loading) {
      return (
        <div className="txg-events-app">
          <div className="txg-events__tools">
            <label>Filter By:</label>
            <div className="event-tool__filter">
              <Select
                name="city-filter"
                placeholder="Select a City"
                options={cityFilter}
                onChange={this.handleFilterSwitch} />
            </div>
          </div>
          <div className="event-tools__selected-filter">
            {curFilter
              ? <div>
                  <label>Selected Filter: </label>
                  <span className="txg-events__tools-filter">
                    {curFilter.value}
                    <span className="cur-filter__remover" onClick={this.removeFilter}> (x)</span>
                  </span>
                </div>
              : null
            }
          </div>
          <div className="txg-event-list">
          {events.length === 0
            ? <div className="event-list--error">No events found.</div>
            : events.map((evt, i) => {
                return <EventList key={i} evt={evt} />;
              })
          }
          </div>
          <div className="txg-events-modal">
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return (
        <div className="txg-events-app">
          <div className="txg-events__loader">
            loading...
          </div>
        </div>
      );
    }
  }
};

export default App;
