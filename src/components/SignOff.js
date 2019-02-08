import React, { Component } from 'react';
import * as firebase from 'firebase';

class SignOff extends Component {
	constructor()
	{
		super();
		this.state = {loggedIn:''};
	}

	componentDidMount()
	{
		firebase.auth().onAuthStateChanged( function(user) {
	      if (!user) {
	      	this.setState({'loggedIn':'You have been successfully logged out.'});
	      }
	    }.bind(this));

	    firebase.auth().signOut();
	}

	render() {
		return (<div>{this.state.loggedIn}</div>);
	}
}

export default SignOff;