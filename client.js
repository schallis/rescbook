
React = require('react')
require('socket.io-client')
require('reactify')
require('react-bootstrap')

Dashboard = require('./dashboard.jsx')

React.render(
  React.createElement(Dashboard),
  document.getElementById('dashboard')
);
