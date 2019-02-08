import React, { Component } from 'react';
import * as firebase from 'firebase';

class SignIn extends Component {
  constructor()
  {
  	super();
    this.state = {'message':''};
    this.login = this.login.bind(this);
  }

  login() {
  	var userName = document.getElementById('emailAddressName').value;
  	var pwd = document.getElementById('passwordText').value;
    var message = null
  	firebase.auth().signInWithEmailAndPassword(userName, pwd).then(function() {
  		window.location = "/";
  	}).catch(function(error) {
      console.log('error code', error.code);
      console.log('error Message', error.message);
      message = 'Incorrect Username or Password';
    });

    document.getElementById('message').innerHTML = message;

  }

  render() {
    return (
        <div>
          <span id="message" style={{'color':'red'}}>{this.state.message}</span><br/>
        	<br/>Please Sign In:
			<div className="teamListDiv" style={{width:'350px',margin: 'auto'}}>

				<span className="formLabel">Email Address</span><br/>
				<input type="text" id="emailAddressName" className="newTeamEntry" /><br/>
				<br/>
				<span className="formLabel">Password</span><br/>
				<input type="password" id="passwordText" className="newTeamEntry" /><br/>
				<br/>
				<div className='createTeamButton' style={{margin:'auto'}} onClick={this.login}>Login</div><br/>
				<div className='createTeamButton' style={{background:'lightgrey', margin:'auto'}}>Cancel</div>
        <br/>
        <a href="/newuser">Create a New Account</a>
			</div>
        </div>
    );
  }
}

export default SignIn;