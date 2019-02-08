import React, { Component } from 'react';
import * as firebase from 'firebase';
import AddPractice from './AddPractice.js';

class AddTeam extends Component {
	constructor(props) {
		super(props);

		this.state = {practicesToAdd:null, result:null}
        var firestore = firebase.firestore();
		var teamColRef = firestore.collection("teams");
		var levels = [0,1];

		var teamName = decodeURI(this.props.arg);
		// Create new team in DB and get ID
		teamColRef.add({'name':teamName, 'levels':levels, 'type':'Scrum', 'userId':'fJqRYI8h3WVURIRdKHCr0mttgum2'}).then(result => {
			var teamId = result.id;

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

			var practicesAdding =  practiceIds.map(pId => {
				return <AddPractice arg={pId} arg2={teamId} />
			});

			this.setState({'practicesToAdd':practicesAdding, 'result':'Success'});
		}).catch(function (error) {
			this.setState('result':'Failed');
			console.log("Got an error: ", error);
		});

	}

	render() {
		return (
			<div>
				<h1>Creating new Team: {this.props.arg}</h1>
					{this.state.practicesToAdd}

				<h1>{this.state.result}</h1>
			</div>
		);
	}
}

export default AddTeam;
