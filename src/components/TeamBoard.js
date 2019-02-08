import React, { Component } from 'react';
import TeamButton from './TeamButton.js';
import NewTeamForm from './NewTeamForm.js';
import * as firebase from 'firebase';

class TeamBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {teams:[], userId: null, doRefreshTeams: false, showTeams: false};
	}

	componentDidMount()
	{
		firebase.auth().onAuthStateChanged( function(user) {
	      if (user) {
	        this.setState({userId:user.uid, doRefreshTeams: true, showTeams: true});
	      } else {
	        this.setState({userId: null, doRefreshTeams: true, showTeams: false});
	      }
	    }.bind(this));

	  	this.loadTeams(this.state.userId);
	}

	componentDidUpdate() {
		if (this.state.doRefreshTeams) {
			this.loadTeams(this.state.userId);
		}
	}

	loadTeams(uid) {
        var firestore = firebase.firestore();
        const fSettings = {timestampsInSnapshots: true};
        firestore.settings(fSettings);
		var colRef = firestore.collection("teams");
		var queryRef = colRef.where("userId","==",uid);
		queryRef.get().then(querySnapshot => {
			let teams = querySnapshot.docs.map (documentSnapshot => {
				if (documentSnapshot && documentSnapshot.exists)
				{
					var teamData = documentSnapshot.data();
					return <TeamButton key={documentSnapshot.id} identifier={documentSnapshot.id} name={teamData.name} type={teamData.type} icon='lin.jpg' />
				}
				else {
					return null;
				}
			});

	        this.setState({teams:teams, doRefreshTeams: false});
	        return null;
		}).catch(function (error) {
			console.log("Got an error: ", error);
		});
	}


	createNewTeam() {
		document.getElementById('createButton').style.display = 'none';
		document.getElementById('createForm').style.display = 'block';
	}

	render() {
		if (this.state.showTeams) {
			return (
				<div>
					<br/><br/>
					<div className="centerBox">
						<div className="teamListDiv">
							{this.state.teams}
						</div>
						<div className="teamButtonDiv">
						 or
						</div>
						<div className="teamButtonDiv">
							<div id="createButton" className='createTeamButton' onClick={() => this.createNewTeam()}>Create New Team</div>
							<div id="createForm" style={{display:'none'}}>
								<NewTeamForm userId={this.state.userId} />
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					
					<br/>Start Guiding Your Team to Continuous Improvement!<br/><br/>

					<div className="homeContent">
						<img className="screenImage" src="/images/screen1.png" alt="screenshot"/>
						<p>Focus on different Agile principles and practices with easy visual guides to key in on!</p>
						<div style={{'clear':'both'}}></div>
					</div> <br/>
					<div className="homeContent">
						<img className="screenImage" style={{'float':'right'}} src="/images/screen2.png" alt="screenshot"/>
						<p>Content drawn from Scrum Guide with questions to guide your improvement.</p>
						<div style={{'clear':'both'}}></div>
					</div>
				</div>
			);
		}
	}
}

export default TeamBoard;