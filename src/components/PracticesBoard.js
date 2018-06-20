import React, { Component } from 'react';
import Level from './Level.js';

class PracticesBoard extends Component {

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
		this.state = {levels:[], teamName: null, }

		var firestore = this.initializeFirestore();

		const docRef = firestore.doc("teams/" + this.props.arg);

		docRef.get().then(doc => {
			if (doc && doc.exists) {
				const myData = doc.data();
				this.setState({teamName: myData.name, levels: myData.levels});
			}
		}).catch(function (error) {
			console.log("Got an error: ", error);
		});

	}

	render() {

		var levelList = this.state.levels.map(level => {
			return <Level key={level} num={level} teamId={this.props.arg} />
		})


		return (
			<div className="practiceBoard">
				<h1>{this.state.teamName}</h1>
				<ul>
					{levelList}
				</ul>
			</div>
        );
	}
}

export default PracticesBoard;
