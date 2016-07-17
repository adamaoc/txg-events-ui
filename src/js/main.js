import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './app';
import EventItem from './components/EventItem';
import Calendar from './components/Calendar';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/event-calendar/" component={App}>
      <Route path="/event-calendar/:eventId" component={EventItem} />
    </Route>
    <Route path="/calendar/" component={Calendar} />
  </Router>
), document.getElementById('event-app'));
