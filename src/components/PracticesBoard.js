import React, { Component } from 'react';
import Level from './Level.js';
import * as firebase from 'firebase';

class PracticesBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {levels:[], teamName: null, }

		var firestore = firebase.firestore();
        const fSettings = {timestampsInSnapshots: true};
        firestore.settings(fSettings);
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
