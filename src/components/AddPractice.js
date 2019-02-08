import React, { Component } from 'react';
import * as firebase from 'firebase';

class AddPractice extends Component {

	constructor(props) {
		super(props);
		this.state = { responseMessage: null, };

		// pull practices for the team
		var firestore = firebase.firestore();
    	var colRef = firestore.collection("teams/" + this.props.arg2 + "/practiceInstances");
		colRef.get().then(querySnapshot => {
			var hasPractice = false;

			querySnapshot.docs.forEach(doc => {
				if (doc.data().practice === this.props.arg) hasPractice = true;
			}); 

			if (hasPractice)
				this.setState({responseMessage: 'Practice ' + this.props.arg + 'already exists for team ' + this.props.arg2});
			else
			{
				var practiceDocRef = firestore.doc('practices/' + this.props.arg);
				practiceDocRef.get().then(pDoc => {
					if (pDoc && pDoc.exists) {
						var pData = pDoc.data();
						var dateNow = new Date();
						colRef.add({'practice':this.props.arg,'complete':false, 'completed':null, 'icon':pData.icon, 'name':pData.name, 'created':dateNow, 'level':pData.level}).then(pReturn => {
							var practiceInstanceId = pReturn.id;
							var questionCollection = firestore.collection("questionTemplates");
							var QqueryRef = questionCollection.where("practiceId","==",this.props.arg);
							QqueryRef.get().then(QquerySnapshot => {
								// then add questions to the practice
								var QcolRef = firestore.collection("teams/" + this.props.arg2 + "/practiceInstances/" + practiceInstanceId + "/questions");
								QquerySnapshot.docs.forEach(Qdoc => {
									var Qdata = Qdoc.data();
									QcolRef.add({'text':Qdata.text, 'answers':Qdata.Answers, 'questionTemplateId':Qdoc.id, 'answer':0});
								});
								
								this.setState({responseMessage: 'Adding Practice ' + this.props.arg + 'to team ' + this.props.arg2});					
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

		//this.setState({responseMessage: 'Adding Practice ' + this.props.arg + ' to team ' + this.props.arg2});
	}

	render() {
		return (<div>{ this.state.responseMessage }</div>);
	}
};

export default AddPractice;