var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var SocketIO = require('socket.io-client');
var MapComponent = require('./mapbox.jsx');
var moment = require('moment');

const PageHeader = Bootstrap.PageHeader;
const Label = Bootstrap.Label;
const Panel = Bootstrap.Panel;
const Grid = Bootstrap.Grid;
const Row = Bootstrap.Row;
const Col = Bootstrap.Col;
const NavItem = Bootstrap.NavItem;
const Nav = Bootstrap.Nav;
const Navbar = Bootstrap.Navbar;
const CollapsibleNav = Bootstrap.CollapsibleNav;
const MenuItem = Bootstrap.MenuItem;
const ButtonToolbar = Bootstrap.ButtonToolbar;
const DropdownButton = Bootstrap.DropdownButton;
const Thumbnail = Bootstrap.Thumbnail;
const ButtonInput = Bootstrap.ButtonInput;
const Input = Bootstrap.Input;
const Button = Bootstrap.Button;
const FormControls = Bootstrap.FormControls;
const TabbedArea = Bootstrap.TabbedArea;
const TabPane = Bootstrap.TabPane;
const Glyphicon = Bootstrap.Glyphicon;

const IncidentPanel = React.createClass({
  render: function() {
    if (this.props.selected == null) {
      return <div className="incident-panel"><Panel bsStyle='info' header='No item selected'><span>Select an incident from the left</span></Panel></div>
    }
    else {
      var incident = this.props.selected.props.incident;
      var title = 'Incident #' + incident.num;
      const saveInnerButton = <Button>Save</Button>;
      return <div className="incident-panel">
        <MapComponent
          mapId='schallis.f1d44938'
          accessToken='pk.eyJ1Ijoic2NoYWxsaXMiLCJhIjoiYjQwNWVmNjVkOWZlMjE0MWE0OTY1ZWE2NzEyNjAwMzQifQ.h96lOzy4V0a8bEpUd3EC2Q'
          latitude={incident.location.latitude}
          longitude={incident.location.longitude}>
          <DropdownButton pullRight className="map-detail" eventKey={3} title={<span><Glyphicon glyph='map-marker' /> Viewing All</span>}>
            <MenuItem eventKey='1'><span className="fa fa-fw"/> First Responders</MenuItem>
            <MenuItem eventKey='2'><span className="fa fa-fw"/> Nearby Citizens</MenuItem>
            <MenuItem active eventKey='2'><span className="fa fa-fw fa-check"/> All</MenuItem>
          </DropdownButton>
        </MapComponent>
        <TabbedArea defaultActiveKey={1}>
          <TabPane eventKey={1} tab='Information'>
              <h3>Basic Information</h3>
                <form className="form">
                  <FormControls.Static  bsStyle="success" hasFeedback label="Number">{incident.label}</FormControls.Static>
                  <FormControls.Static  bsStyle="success" hasFeedback label="Location">{incident.location.latitude}, {incident.location.longitude}</FormControls.Static>
                  <FormControls.Static  bsStyle="success" hasFeedback label="Status">{incident.status}</FormControls.Static>
                  <FormControls.Static  bsStyle="success" hasFeedback label="Time">{incident.datetime}</FormControls.Static>
                </form>
                <h3>Incident Questions</h3>
                  <form className="form">
                    <FormControls.Static bsStyle="success" hasFeedback label="Type">{incident.type}</FormControls.Static>
                    <FormControls.Static bsStyle="success" hasFeedback label="People">2</FormControls.Static>
                    <Input type='text' placeholder='Enter floor' bsStyle="error" label="Floor" buttonAfter={saveInnerButton}></Input>
                  </form>
                <h3>Personal Information</h3>
                  <form className="form">
                    <FormControls.Static bsStyle="success" hasFeedback label="Medical Conditions" >{incident.personal.conditions}</FormControls.Static>
                    <FormControls.Static bsStyle="success" hasFeedback label="Allergies &amp; Reactions" >{incident.personal.allergies}</FormControls.Static>
                    <FormControls.Static bsStyle="success" hasFeedback label="Medications" >{incident.personal.medications}</FormControls.Static>
                    <FormControls.Static bsStyle="success" hasFeedback label="Blood Type" >{incident.personal.blood}</FormControls.Static>
                    <FormControls.Static bsStyle="warning" hasFeedback label="Contacts" >{incident.personal.contacts}</FormControls.Static>
                  </form>
            </TabPane>
            <TabPane eventKey={2} tab='Communications'>
              <h3>Chat</h3>
              <p><strong>12:01 @schallis</strong> I can smell smoke on the corner of 48th</p>
              <p><strong>12:00 @jappleseed</strong> Flames on the 3rd floor</p>
              <form>
                <Input type='textarea' placeholder='Type your message...' />
                <ButtonInput value='Send' />
                <Input type='checkbox' label='Private' />
              </form>
            </TabPane>
            <TabPane eventKey={3} tab='Media'>
              <h3>Pictures</h3>
              <Thumbnail src="http://placehold.it/150x150"><p>Description</p></Thumbnail>
              <Thumbnail src="http://placehold.it/150x150"><p>Description</p></Thumbnail>
              <Thumbnail src="http://placehold.it/150x150"><p>Description</p></Thumbnail>
            </TabPane>
            </TabbedArea>
      </div>
    }
  }
});

const Incident = React.createClass({
  handleClick: function() {
    this.props.selectIncident(this);
  },
  render: function() {
    var selected = this.props.isSelected;
    return (<NavItem
      onClick={this.handleClick}
      className={selected ? "selected" : ""}>
    <h3>#{this.props.num} <Label>{this.props.incident.status}</Label></h3>
    <h4 class="type">{this.props.incident.type}</h4>
    <span class="datetime">{moment(this.props.incident.datetime).fromNow()}</span>
    </NavItem>)
  }
});

const IncidentComponent = React.createClass({
  getInitialState: function() {
    return {
      'selectedIncident': null
    }
  },
  selectIncident: function(incident) {
    this.setState({
      selectedIncident: incident
    });
  },
  render: function() {
    //var selectedKey = (this.state.selectedIncident && this.state.selectedIncident.props.num) || null;
    var children = this.props.children.map(function(incident, i) {
      //var isSelected = incident.props.num === selectedKey;
      return React.addons.cloneWithProps(incident, {
        //isSelected: isSelected,
        selectIncident: this.selectIncident,
        num: incident.props.num
      });
    }, this);
    return (
      <div>
      <Navbar fluid brand='RescBook' toggleNavKey={0}>
        <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
          <Nav navbar>
            <NavItem eventKey={1} href='#'>Incidents</NavItem>
            <NavItem eventKey={2} href='#'>Insight</NavItem>
          </Nav>
          <Nav navbar right>
            <DropdownButton eventKey={3} title='Steven Challis'>
              <MenuItem eventKey='1'>Profile</MenuItem>
              <MenuItem eventKey='2'>My History</MenuItem>
              <MenuItem eventKey='2'>Audit Log</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey='4'>Log out</MenuItem>
            </DropdownButton>
          </Nav>
        </CollapsibleNav>
      </Navbar>
        <section className="incident-container">
          <div className="incident-nav">
            <header>
              <Input type="search" placeholder='Search incidents' />
            </header>
            <Nav bsStyle='pills' stacked id="incident-list">
              {children}
            </Nav>
          </div>
          <IncidentPanel selected={this.state.selectedIncident} />
        </section>
      </div>
    )
  }
});

const Dashboard = React.createClass({
  createIncident: function(incident) {
    return <Incident incident={incident} num={incident.num}  />
  },
  addIncident: function(incident) {
    var newState = this.state;
    newState.incidents.unshift(incident);
    this.setState(newState);
  },
  getInitialState: function() {
    /* incidents should be in reverse chronological */
    return {
      'incidents': [
        {
          'num': 2,
          'type': 'Fire',
          'datetime': '2015-06-22T21:02:36.845Z',
          'status': 'Urgent',
          'location': {
            'longitude': -75,
            'latitude': 40,
          },
          'personal': {
            'conditions': "Epilepsy",
            'allergies': "Penicillin",
            'medications': "Levitiracetam 1000mg",
            'blood': "AB +",
            'partner': "Taylor Swift +1 (347) 302 3735",
          }
        },
        {
          'num': 1,
          'type': 'Medical',
          'datetime': '2015-06-22T21:01:36.845Z',
          'status': 'Deployed',
          'location': {
            'longitude': -73.950,
            'latitude': 40.744,
          },
          'personal': {
            'conditions': "None",
            'allergies': "None",
            'medications': "None",
            'blood': "O -",
            'partner': "Bill +1 (347) 302 3735",
          }
        }],
      'selectedIncident': null
    }
  },
  selectIncident: function(incident) {
    this.setState({
        selectedIncident: incident
    });
  },
  componentDidMount: function() {
    var self = this;
    var socket = new SocketIO(document.location.protocol+'//'+document.location.host);
    socket.on('newIncident', function(data) {
      self.addIncident(data)
    })
  },
  render: function() {
    return <div id="dashboard">
    <IncidentComponent>
      {this.state.incidents.map(this.createIncident)}
    </IncidentComponent>
    </div>
  }
});

module.exports = Dashboard
