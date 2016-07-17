import React, { Component } from 'react';
import axios from 'axios';
import EventList from './components/EventList';
import Calendar from './components/Calendar';
import FilterTools from './components/filters/FilterTools';
import SelectedFilters from './components/filters/SelectedFilters';

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
      curFilter: null,
      calView: false
    };
    this.handleFilterSwitch = this._handleFilterSwitch.bind(this);
    this.removeFilter = this._removeFilter.bind(this);
    this.handleViewSwitch = this._handleViewSwitch.bind(this);
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
  _handleViewSwitch(view) {
    if (view === 'calendar') {
      this.setState({ calView: true });
    } else {
      this.setState({ calView: false });
    }
  }
  render() {
    const { loading, events, curFilter, calView } = this.state;
    if (!loading) {
      return (
        <div className="txg-events-app">
          <FilterTools
            cityFilter={cityFilter}
            handleFilterSwitch={this.handleFilterSwitch}
            handleViewSwitch={this.handleViewSwitch}
            calView={calView}
          />
          <SelectedFilters
            curFilter={curFilter}
            removeFilter={this.removeFilter}
          />

          {events.length === 0
            ? <div className="event-list--error">No events found.</div>
            : <EventList events={events} calView={calView} />
          }
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
