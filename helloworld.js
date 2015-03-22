var Container = React.createClass({
    render: function() {
	return (
	    <div>
	    The container is now in
	    *** <span className="location">{this.props.location}</span> ***
	    </div>
	);
    }
});

var Log = React.createClass({

    render: function() {
	var log = this.props.log.map(function(event) {
	    return <li key={event.time}> {event.time.toTimeString()} => {event.location} </li>
	});
	return (
	    <ul className="log-entry">
	    {log}
	    </ul>
	)
    }
});

var EventSourcedContainers = React.createClass({
    getInitialState: function() {
	return {
	    log: [
		{
		    location: 'NYC',
		    time: this.now()
		}
	    ],
	    currentLocation: "NYC"
	}
    },

    now: function() {
	return new Date();
    },

    handleNewLocationChange: function (e) {
	this.setState({
	    userEnteredNewLoc: e.target.value
	});
    },

    updateLocation: function updateLocation(e) {

	this.setState({
	    currentLocation: this.state.userEnteredNewLoc,
	    log: this.state.log.concat([
		{
		    location: this.state.userEnteredNewLoc,
		    time: this.now()
		},
	    ]),
	    userEnteredNewLoc: ""
	});
    },

    render: function() {
	return (
	    <div>
	    <label>
	    Where is the container going next?
	    <input name="new-location" onChange={this.handleNewLocationChange}/>
	    </label>
	    <button onClick={this.updateLocation}>Move container!</button>
	    <Container location={this.state.currentLocation} />
	    <Log log={this.state.log} />
	    </div>
	)
    }
});

React.render(
    <EventSourcedContainers />,
    document.getElementById('main')
);
