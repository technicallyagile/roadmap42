import React, { Component } from 'react';
import * as firebase from 'firebase';

class AdminPracticeList extends Component {
	constructor(props) {
		super(props);
		this.state = {practices:[]};
	}

	componentDidMount()
	{
		firebase.auth().onAuthStateChanged( function(user) {
	      if (user) {
	        this.loadPractices();
	      } else {
	        console.log('state_change user logged out?');
	      }
	    }.bind(this));
	}

	loadPractices()
	{
       	var firestore = firebase.firestore();
        const fSettings = {timestampsInSnapshots: true};
        firestore.settings(fSettings);
		var colRef = firestore.collection("practices");
		colRef.get().then(collectionSnapshot => {
			let practices = collectionSnapshot.docs.map (documentSnapshot => {
				if (documentSnapshot && documentSnapshot.exists)
				{
					var practiceData = documentSnapshot.data();
					var targetURL = "editpractice/" + documentSnapshot.id;
					var icon = "/icons/" + practiceData.icon + ".jpg";
					return (
						<div className="teamListDiv" key={documentSnapshot.id} style={{width:'400px', margin:'auto', marginTop:'10px'}}>
							<img alt={practiceData.icon} src={icon} style={{float: 'left', width:'25px'}} />
							<a href={targetURL}>{practiceData.name} [{practiceData.level}]</a>
							<div style={{clear: 'both'}}></div>
						</div>
					);
				}
				else {
					return null;
				}
			});

			this.setState({practices:practices});
        	return null;
		});
	}

	addNewPractice() {
		var firestore = firebase.firestore();
        const fSettings = {timestampsInSnapshots: true};
        firestore.settings(fSettings);

		var newPracticeName = document.getElementById('practiceName').value;

		var practiceColRef = firestore.collection("practices");
		// Create new team in DB and get ID
		practiceColRef.add({'name':newPracticeName, 'level':0, 'icon':'dontpanic', 'description':''}).then(result => {
			this.loadPractices();
		}).catch(function (error) {
			console.log("Got an error: ", error);
		});

	}

	render() {
		return (
			<div>
				<div className="teamListDiv" style={{width:'400px', margin:'auto'}}>

					<span className="formLabel">New Practice</span><br/>
					<input type="text" id="practiceName" className="newTeamEntry" style={{width:'90%'}}/><br/>
					<div className='createTeamButton' style={{margin:'auto'}} onClick={() => {this.addNewPractice();}}>Create New</div>

				</div>
				{this.state.practices}
			</div>
		);
	}
}

export default AdminPracticeList