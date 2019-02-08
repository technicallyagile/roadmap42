import React, { Component } from 'react';
import * as firebase from 'firebase';

class PracticeQuestion extends Component {

	constructor(props) {
		super(props);
		this.state = {'class': null};

		this.onAnswerChange = this.onAnswerChange.bind(this);
	}

	componentWillMount() {
		if (this.props.selectedAnswer === "1") {
			this.setState({'class': 'questionStyle_correct'});
		} else {
			this.setState({'class': 'questionStyle'});
		}
	}

	onAnswerChange(event) {

		var firestore = firebase.firestore();

		var questionRef = firestore.doc("teams/" + this.props.teamId + "/practiceInstances/" + this.props.practiceId + "/questions/" + this.props._id)
		questionRef.update({'answer':event.target.value}).then(result => {
			this.props.callbackMethod("question");
		});

      	if (event.target.value === '1') {
			this.setState({'class': 'questionStyle_correct'});
		} else {
			this.setState({'class': 'questionStyle'});
		}
	}

	render() {

		var answerList = this.props.answers;

		const selectedAnswer = this.props.selectedAnswer;

		return(
      		<div className={this.state.class}>
      			{this.props.text}&nbsp;&nbsp;&nbsp;
      			<select id={this.props._id} onChange={this.onAnswerChange} defaultValue={selectedAnswer}>
      				<option value='0'>[Select Answer]</option>
      				{
      					answerList.map(function(item, i){
             					return(<option key={i} value={i+1}>{item}</option>)
           				})
      				}
      			</select>
      		</div>
      	);
	}
}

export default PracticeQuestion;