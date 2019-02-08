import React, { Component } from 'react';
import PracticeIcon from './PracticeIcon.js';
import * as firebase from 'firebase';

class Level extends Component {

	constructor(props) {
		super(props);
		this.state = {practices:[],}
        var firestore = firebase.firestore();
		var colRef = firestore.collection("teams/" + this.props.teamId + "/practiceInstances");
		var queryRef = colRef.where("level","==",this.props.num);
		queryRef.get().then(querySnapshot => {

				var column = -1;
				let practices = querySnapshot.docs.map (documentSnapshot => {
					if (documentSnapshot && documentSnapshot.exists)
					{
						column++;
						var practiceData = documentSnapshot.data();

						if (column === 3) {
							column = 0;
							return <PracticeIcon key={documentSnapshot.id} identifier={documentSnapshot.id} name={practiceData.name} completed={practiceData.complete} icon={practiceData.icon} teamId={this.props.teamId} break='true' />
						} else {
							return <PracticeIcon key={documentSnapshot.id} identifier={documentSnapshot.id} name={practiceData.name} completed={practiceData.complete} icon={practiceData.icon} teamId={this.props.teamId} break='false' />
						}
					}
					else {return null;}
				});

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
					<div className="levelClear"></div>
				</div>
			</div>
		)

	}

}

export default Level;