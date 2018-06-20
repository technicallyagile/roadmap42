import React, { Component } from 'react';
import PracticeIcon from './PracticeIcon.js';

class Level extends Component {

	initializeFirestore() {
		const firebase = require("firebase");
		// Required for side-effects
		require("firebase/firestore");

		var config = {
			apiKey: "AIzaSyDbWMv3XXasGcyt2POIRUkIdNQ9DEwg3JQ",
			authDomain: "roadmap42.firebaseapp.com",
			databaseURL: "https://roadmap42.firebaseio.com",
			projectId: "roadmap42",
			storageBucket: "roadmap42.appspot.com",
			messagingSenderId: "132990042285"
		};

		if (!firebase.apps.length) {
			firebase.initializeApp(config);
		}

		return firebase.firestore();
	}

	constructor(props) {
		super(props);
		this.state = {practices:[],}
        var firestore = this.initializeFirestore();
		var colRef = firestore.collection("teams/" + this.props.teamId + "/practiceInstances");
		var queryRef = colRef.where("level","==",this.props.num);
		queryRef.get().then(querySnapshot => {

				var column = -1;
				let practices = querySnapshot.docs.map (documentSnapshot => {
					if (documentSnapshot && documentSnapshot.exists)
					{
						var practiceData = documentSnapshot.data();
						return <PracticeIcon key={documentSnapshot.id} identifier={documentSnapshot.id} name={practiceData.name} completed={practiceData.complete} icon={practiceData.icon} teamId={this.props.teamId} break='false' />
					}
				});


      			//let practices = data.map((obs) => {
      			//	column++;
      			//	if (column % 3 === 0) {
		        //  		return <PracticeIcon key={obs._id} identifier={obs._id} name={obs.name} completed={obs.completed} icon={obs.icon} break='true' />
      			//	} else {
      			//		return <PracticeIcon key={obs._id} identifier={obs._id} name={obs.name} completed={obs.completed} icon={obs.icon} break='false' />
      			//	}
		          	
		        //});

		        this.setState({practices:practices});
		}).catch(function (error) {
			console.log("Got an error: ", error);
		});

    }

	render() {

		return (
			<div className="levelClear">
				<h1>Level {this.props.num}</h1>
				<div className="centered">
					{this.state.practices}
				</div>
			</div>
		)

	}

}

export default Level;