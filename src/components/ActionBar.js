import React, { Component } from 'react';
import * as firebase from 'firebase';

class ActionBar extends Component {
  constructor()
  {
  	super();
  	this.state = {userLink:'/signin',userText:'Sign In'}
  }

	componentDidMount()
	{
		firebase.auth().onAuthStateChanged( function(user) {
	      if (user) {
	      	var userDisplayName = user.email;
	      	if (user.displayName)
	      		userDisplayName = user.displayName;
	        this.setState({userLink:'/', userText: userDisplayName});
	      }
	    }.bind(this));
	}


  render() {

    if (this.state.userText === 'Sign In')
    {
      return (
        <header className="App-header">
          <img src="/ontheroad.png" className="App-logo" alt="logo" />
          <span className="App-title">Agile Practices Roadmap</span>
          <div className="sign-in">
            <a href={this.state.userLink}>{this.state.userText}</a>&nbsp;&nbsp;
          </div>
        </header>
      );
    } else {
      return (
        <header className="App-header">
          <img src="/ontheroad.png" className="App-logo" alt="logo" />
          <span className="App-title">Agile Practices Roadmap</span>
          <div className="sign-in">
            <a href={this.state.userLink}>{this.state.userText}</a> | <a href="/signoff">Sign-Off</a>&nbsp;&nbsp;
          </div>
        </header>
      );      
    }
  }
}

export default ActionBar;