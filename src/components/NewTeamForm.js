import React, { Component } from 'react';
import * as firebase from 'firebase';

class NewTeamForm extends Component {

	constructor(props)
	{
		super(props);
		this.state = {userId: this.props.userId, newTeamSteps: 0, newTeamFinished: 0, newTeamStatus: 'Creating new team.' }
	}

	cancelAdd() {
		window.location = "/";
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextState.newTeamFinished === nextState.newTeamSteps && nextState.newTeamSteps > 0) {
			setTimeout(function() {window.location = "/";}, 2000);
		}
	}

	addTeam() {
		var firestore = firebase.firestore();
		var teamColRef = firestore.collection("teams");
		var levels = [0,1];
		var teamName = document.getElementById('teamName').value;
		document.getElementById('form').style.display = 'none';
		document.getElementById('statusMessage').style.display = 'block';

		// Create new team in DB and get ID
		teamColRef.add({'name':teamName, 'levels':levels, 'type':'Scrum', 'userId':this.state.userId}).then(result => {
			var teamId = result.id;
			this.setState({newTeamStatus:'Team Added'});
			var practiceIds = [
				'CE6BSqLLAya7zQtE4nvY',
				'F3ww2cAG2zh94nsaEi36',
				'LBNMM8gvjg0S19pmbXGl',
				'ZHoRylYU0lrGRD54ogYK',
				'fB5gwRQM1exWTFFXvy82',
				'Tgf1lVBOXqiJu5yGIPSr',
				'yaRRYfFaXyufD2KmtKC1',
				'2mNGjLZO44zKSDyKy5UB',
			];

		   	this.setState({newTeamSteps: practiceIds.length});
			var practicesAdding =  practiceIds.map(pId => {
				var colRef = firestore.collection("teams/" + teamId + "/practiceInstances");
				colRef.get().then(querySnapshot => {
					var hasPractice = false;

					querySnapshot.docs.forEach(doc => {
						if (doc.data().practice === pId) hasPractice = true;
					}); 

					if (!hasPractice)
					{
						var practiceDocRef = firestore.doc('practices/' + pId);
						practiceDocRef.get().then(pDoc => {
							if (pDoc && pDoc.exists) {
								var pData = pDoc.data();
								var dateNow = new Date();
								colRef.add({'practice':pId,'complete':false, 'completed':null, 'icon':pData.icon, 'name':pData.name, 'created':dateNow, 'level':pData.level}).then(pReturn => {
									var practiceInstanceId = pReturn.id;
									var questionCollection = firestore.collection("questionTemplates");
									var QqueryRef = questionCollection.where("practiceId","==",pId);
									QqueryRef.get().then(QquerySnapshot => {
										// then add questions to the practice
										var QcolRef = firestore.collection("teams/" + teamId + "/practiceInstances/" + practiceInstanceId + "/questions");
										QquerySnapshot.docs.forEach(Qdoc => {
											var Qdata = Qdoc.data();
											QcolRef.add({'text':Qdata.text, 'answers':Qdata.Answers, 'questionTemplateId':Qdoc.id, 'answer':0});
										});
										
										this.setState({newTeamFinished: this.state.newTeamFinished+1});	
										this.setState({newTeamStatus:'Adding Practice ' + this.state.newTeamFinished + ' of ' + this.state.newTeamSteps + ' to team.'});				
									}).catch(function (error) { console.log("Error", "Unable to get question Templates: " + error)});					
								}).catch(function (error) {
									console.log("Error", "Unable to add practice: " + error);
								});
							} else {
								console.log("Error", "Unable to find specified practice template")
							}
						}).catch(function (error) {
							console.log("Error", "Error retrieving practice template: " + error);
						});
					}
				}).catch(function (error) {
					console.log("Got an error: ", error);
				});
			});

			return "complete";

		}).then(function (value) {
			//window.location="/";
		}).catch(function (error) {
			console.log("Got an error: ", error);
		});
	}

	render() {
		return (
			<div className="teamListDiv">
				<div id="form">
					<span className="formLabel">New Team Name</span><br/>
					<input type="text" id="teamName" className="newTeamEntry" /><br/>
					<br/>
					<span className="formLabel">Team Type</span><br/>
					<select className="newTeamEntry">
						<option value="scrum">Scrum</option>
						<option value="freestyle">Freestyle</option>
						<option value="kanban">Kanban</option>
					</select><br/>
					<div className='createTeamButton' style={{margin:'10px'}} onClick={() => {this.addTeam();}}>Create New Team</div>
					<div className='createTeamButton' style={{background:'lightgrey', margin:'10px'}} onClick={() => {this.cancelAdd();}}>Cancel</div>
				</div>
				<div id="statusMessage" style={{display: 'none'}}>
					{this.state.newTeamStatus}
				</div>
			</div>
		)
	}
}

export default NewTeamForm;