/** @jsx React.DOM */
'use strict';

var React = require('react');

var MapComponent = (function () {
  var map;
  return React.createClass({
    propTypes: {
      accessToken: React.PropTypes.string.isRequired,
      mapId: React.PropTypes.string.isRequired,
      latitude: React.PropTypes.number.isRequired,
      longitude: React.PropTypes.number.isRequired
    },



    componentDidMount: function () {
      // Provide your access token
      L.mapbox.accessToken = this.props.accessToken;

      // Create a map in the div #map
      this.map = L.mapbox.map('map', this.props.mapId);
      this.setMapLocation(this.props);
      // map.fitBounds(40.745953,-73.955555);
      // map.setZoom(14);
      // var geocoder = L.mapbox.geocoder('mapbox.places');
      // geocoder.query('4545 Center Blvd, Long Island City, NJ', showMap);
      // function showMap(err, data) {
      //   if (data.lbounds) {
      //     alert(data.latlng);
      //     map.fitBounds(data.lbounds);
      //   } else if (data.latlng) {
      //     alert(data.latlng);
      //     map.setView([data.latlng[0], data.latlng[1]], 13);
      //   }
      // }
      //map.setZoom(14);
    },
    // Called on initialization and after each change to the components
    // props or state
    componentWillUpdate(nextProps, nextState) {
      this.setMapLocation(nextProps);
    },
    setMapLocation(props) {
      this.map.setView([props.latitude, props.longitude], 14);
    },
    render: function () {
      return (
        <div id="map">
          {this.props.children}
        </div>
      )
    }
  });
})();

module.exports = MapComponent;
