import React, { Component } from 'react';
import EditQuestion from './EditQuestion.js';
import * as firebase from 'firebase';

class EditPractice extends Component {
	constructor(props) {
		super(props);
		this.state = {_id: '', name: '', icon: '', level: '', description: '', questions: null};
		this.textChanged= this.textChanged.bind(this);
	}

	componentDidMount()
	{
		firebase.auth().onAuthStateChanged( function(user) {
	      if (user) {
	        this.loadPractice();
	      } else {
	        console.log('state_change user logged out?');
	      }
	    }.bind(this));
	}

	loadPractice()
	{
		var firestore = firebase.firestore();
	    const fSettings = {timestampsInSnapshots: true};
	    firestore.settings(fSettings);
	    var docRef = firestore.doc("practices/" + this.props.arg);
	    
	    docRef.get().then(doc => {
	      if (doc && doc.exists) {
	        const myData = doc.data();
	        this.setState({ _id: this.props.arg });
	        this.setState({ name: myData.name });
	        this.setState({ description: myData.description });
	        this.setState({ icon: myData.icon });
	        this.setState({ level: myData.level });
	      }
	    }).catch(function (error) {
	      console.log("Got an error: ", error);
	    });

	    var colRef = firestore.collection("questionTemplates");
	    var queryRef = colRef.where("practiceId","==",this.props.arg);
	    queryRef.get().then(querySnapshot => {

				let questions = querySnapshot.docs.map (documentSnapshot => {
					if (documentSnapshot && documentSnapshot.exists)
					{

						var questionData = documentSnapshot.data();

						return <EditQuestion key={documentSnapshot.id} id={documentSnapshot.id} text={questionData.text} answers={questionData.Answers} />

					}
					else {return null;}
				});

		        this.setState({questions:questions});
		}).catch(function (error) {
			console.log("Got an error: ", error);
		});
	}

	returnToList() {
		window.location = '/adminpracticelist';
		return null;
	}

	saveChanges() {
		var name = document.getElementById('pName').value;
		var icon = document.getElementById('pIcon').value;
		var level = document.getElementById('pLevel').value;
		var desc = document.getElementById('pDesc').value;

		var firestore = firebase.firestore();
	    const fSettings = {timestampsInSnapshots: true};
	    firestore.settings(fSettings);
	    var docRef = firestore.doc("practices/" + this.props.arg);

	    docRef.update({'icon':icon,'description':desc, 'level':Number(level), 'name': name}).then(result => {
			console.log("saved");
		});
	}

	textChanged(event) {
		this.setState({'description':event.target.value});
	}

	saveQuestion(event) {
		var questionText = document.getElementById('nqText').value;
		var answers = [];
		var nqa1 = document.getElementById('nqa1').value;
		if (nqa1 && nqa1!==undefined) {answers.push(nqa1);}
		var nqa2 = document.getElementById('nqa2').value;
		if (nqa2 && nqa2!==undefined) {answers.push(nqa2);}
		var nqa3 = document.getElementById('nqa3').value;
		if (nqa3 && nqa3!==undefined) {answers.push(nqa3);}
		var nqa4 = document.getElementById('nqa4').value;
		if (nqa4 && nqa4!==undefined) {answers.push(nqa4);}
		var nqa5 = document.getElementById('nqa5').value;
		if (nqa5 && nqa5!==undefined) {answers.push(nqa5);}

		var firestore = firebase.firestore();
	    const fSettings = {timestampsInSnapshots: true};
	    firestore.settings(fSettings);
	    var colRef = firestore.collection("questionTemplates");
	    colRef.add({'practiceId':this.props.arg, 'text':questionText, 'Answers':answers}).then(() => {
	    	console.log("added");
	    	document.getElementById('nqText').value='';
	    	document.getElementById('nqa1').value='';
	    	document.getElementById('nqa2').value='';
	    	document.getElementById('nqa3').value='';
	    	document.getElementById('nqa4').value='';
	    	document.getElementById('nqa5').value='';
	    	return null;
	    });	


	    this.loadPractice();
	}

	render() {

		return (
			<div className="teamListDiv" style={{width:'500px', margin:'auto'}}>

				<span className="formLabel">Practice Name</span><br/>
				<input type="text" id="pName" className="newTeamEntry" defaultValue={this.state.name} /><br/>
				<br/>
				<span className="formLabel">Practice Type</span> &nbsp;&nbsp;
				<input type="text" id="pIcon" className="newTeamEntry" style={{width:'60%'}} defaultValue={this.state.icon} />
				  &nbsp;&nbsp;&nbsp;
				<span className="formLabel">Level</span> &nbsp;&nbsp;
				<input type="text" id="pLevel" className="newTeamEntry" style={{width:'10%'}} defaultValue={this.state.level} /><br/>
				<br/>
				<span className="formLabel">Practice Description</span><br/>
				<textarea id="pDesc" className="newTeamEntry" rows="8" style={{fontSize:'14px'}} value={this.state.description} onChange={this.textChanged} /><br/>
				<br/>
				<div className='createTeamButton' style={{margin:'auto'}} onClick={() => {this.saveChanges();}}>Save Changes</div>
				<br/><span className="formLabel">Questions</span><br/>
				{this.state.questions}
				<span className="formLabel">New Question</span><br/>
				<textarea id="nqText" className="newTeamEntry" rows="3" style={{fontSize:'12px'}} /><br/>
				 &nbsp;&nbsp;<input type="text" id="nqa1" className="newTeamEntry" style={{fontSize:'11px', width:'90%'}} /><br/>
				 &nbsp;&nbsp;<input type="text" id="nqa2" className="newTeamEntry" style={{fontSize:'11px', width:'90%'}} /><br/>
				 &nbsp;&nbsp;<input type="text" id="nqa3" className="newTeamEntry" style={{fontSize:'11px', width:'90%'}} /><br/>
				 &nbsp;&nbsp;<input type="text" id="nqa4" className="newTeamEntry" style={{fontSize:'11px', width:'90%'}} /><br/>
				 &nbsp;&nbsp;<input type="text" id="nqa5" className="newTeamEntry" style={{fontSize:'11px', width:'90%'}} /><br/>
				<br/>
				<div className='createTeamButton' style={{margin:'auto'}} onClick={() => {this.saveQuestion();}}>Add Question</div><br/>
				<div className='createTeamButton' style={{margin:'auto', background:'#c0c0c0'}} onClick={() => {this.returnToList();}}>Return to List</div>
			</div>
		)
	}

}

export default EditPractice