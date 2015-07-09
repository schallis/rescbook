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
const FormControls = Bootstrap.FormControls;

const IncidentPanel = React.createClass({
  render: function() {
    if (this.props.selected == null) {
      return <Panel bsStyle='info' header='No item selected'><span>Select an incident from the left</span></Panel>
    }
    else {
      var incident = this.props.selected.props.incident;
      var title = 'Incident #' + incident.num;
      return <Panel id="incident-panel">
        <MapComponent
          mapId='schallis.f1d44938'
          accessToken='pk.eyJ1Ijoic2NoYWxsaXMiLCJhIjoiYjQwNWVmNjVkOWZlMjE0MWE0OTY1ZWE2NzEyNjAwMzQifQ.h96lOzy4V0a8bEpUd3EC2Q' />
        <Grid fluid>
          <Row>
            <Col md={4}>
              <h3>Incident Information</h3>
                <form className="form-horizontal">
                  <FormControls.Static label="Number" labelClassName="col-xs-2" wrapperClassName="col-xs-10">{incident.label}</FormControls.Static>
                  <FormControls.Static label="Status" labelClassName="col-xs-2" wrapperClassName="col-xs-10">{incident.status}</FormControls.Static>
                  <FormControls.Static label="Type" labelClassName="col-xs-2" wrapperClassName="col-xs-10">{incident.type}</FormControls.Static>
                  <FormControls.Static label="Time" labelClassName="col-xs-2" wrapperClassName="col-xs-10">{incident.datetime}</FormControls.Static>
                  <FormControls.Static label="People" labelClassName="col-xs-2" wrapperClassName="col-xs-10">2</FormControls.Static>
                </form>
            </Col>
            <Col md={4}>
              <h3>Communications</h3>
              <p><strong>@schallis</strong> I can smell smoke on the corner of 48th</p>
              <p><strong>@jappleseed</strong> Flames on the 3rd floor</p>
              <form>
                <Input type='textarea' placeholder='Type your message...' />
                <ButtonInput value='Send' />
                <Input type='checkbox' label='Private' />
              </form>
            </Col>
            <Col md={4}>
              <h3>Media</h3>
              <Thumbnail src="http://placehold.it/150x150"><p>Description</p></Thumbnail>
              <Thumbnail src="http://placehold.it/150x150"><p>Description</p></Thumbnail>
              <Thumbnail src="http://placehold.it/150x150"><p>Description</p></Thumbnail>
            </Col>
          </Row>
        </Grid>
      </Panel>
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
      <Grid fluid>
      <Row>
      <Col md={12}>

      </Col>
      </Row>
      <Row>
      <Col md={3}>
      <Nav bsStyle='pills' stacked id="incident-list">
        {children}
      </Nav>
      </Col>
      <Col md={9}>
      <IncidentPanel selected={this.state.selectedIncident} />
      </Col>
      </Row>
      </Grid>
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
          'status': 'Urgent'
        },
        {
          'num': 1,
          'type': 'Medical',
          'datetime': '2015-06-22T21:01:36.845Z',
          'status': 'Deployed'
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
