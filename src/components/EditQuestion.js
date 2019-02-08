import React, { Component } from 'react';
//import * as firebase from 'firebase';

class EditQuestion extends Component {
	constructor(props) {
		super(props);
		this.state = {_id:props.id, text:props.text, answers:null}
	}

	componentDidMount() {
		this.parseAnswers();
	}

	parseAnswers() {
		var count = 0;
		let answers = this.props.answers.map (answer => {
			count++;
			return (<input type="text" key={count} className="newTeamEntry" style={{fontSize:'12px'}} defaultValue={answer} />);
		});
		this.setState({answers:answers});
	}

	loadQuestion() {

	}

	render() {
		return (
			<div>
				<textarea id="qText" className="newTeamEntry" rows="3" style={{fontSize:'14px'}} defaultValue={this.state.text} /><br/>
				{this.state.answers}<br/><br/>
			</div>
		);
	}
}

export default EditQuestion