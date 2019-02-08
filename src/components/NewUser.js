import React, { Component } from 'react';
import * as firebase from 'firebase';

class NewUser extends Component {
  constructor()
  {
  	super();
    this.state = {'message':''};
  }

  createUser() {
  	var userName = document.getElementById('emailAddressName').value;
  	var pwd = document.getElementById('passwordText').value;
  	var pwdre = document.getElementById('passwordRetypeText').value;
  	var message = null;
  	if (pwd === pwdre) {
	  	firebase.auth().createUserWithEmailAndPassword(userName, pwd).then(function() {
	  		window.location = "/";
	  	}).catch(function(error) {
	      console.log('error code', error.code);
	      console.log('error Message', error.message);
	      message = 'Unable to Create User:' + error.message;
	    });
  	} else {
  		message = "Password and password retype are different."
  	}

    document.getElementById('message').innerHTML = message;

  }

  render() {
    return (
        <div>
          <span id="message" style={{'color':'red'}}>{this.state.message}</span><br/>
        	<br/>Create New User:
			<div className="teamListDiv" style={{width:'350px',margin: 'auto'}}>

				<span className="formLabel">Email Address</span><br/>
				<input type="text" id="emailAddressName" className="newTeamEntry" /><br/>
				<br/>
				<span className="formLabel">Password</span><br/>
				<input type="password" id="passwordText" className="newTeamEntry" /><br/>
				<br/>
				<span className="formLabel">Retype Password</span><br/>
				<input type="password" id="passwordRetypeText" className="newTeamEntry" /><br/>
				<br/>
				<div className='createTeamButton' style={{margin:'auto'}} onClick={this.createUser}>Create User</div><br/>
				<div className='createTeamButton' style={{background:'lightgrey', margin:'auto'}}>Cancel</div>
			</div>
        </div>
    );
  }
}

export default NewUser;