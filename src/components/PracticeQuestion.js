import React, { Component } from 'react';

class PracticeQuestion extends Component {

	constructor(props) {
		super(props);
		this.state = {'class': null};

		this.onAnswerChange = this.onAnswerChange.bind(this);
	}

	componentWillMount() {
		if (this.props.selectedAnswer === 1) {
			this.setState({'class': 'questionStyle_correct'});
		} else {
			this.setState({'class': 'questionStyle'});
		}
	}

	onAnswerChange(event) {

		const options = {
      		method: 'PUT',
      		headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
      		body: 'Selected_answer=' + event.target.value
    	}

    	fetch('http://localhost:3000/question/' + event.target.id, options)
    		.then(results => {
    			this.props.callbackMethod("question");
    		})
      		.catch(function(error) {
        		console.log('Looks like there was a problem: \n', error);
      		})

      	if (event.target.value === '1') {
			this.setState({'class': 'questionStyle_correct'});
		} else {
			this.setState({'class': 'questionStyle'});
		}
	}

	render() {

		var answerList = this.props.answers.split('|');

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