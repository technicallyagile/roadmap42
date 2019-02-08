import React, { Component } from 'react';

class TeamButton extends Component {

	goToTeam(teamId) {
		window.location = '/team/' + teamId;
	}

	render() {
		return (
			<div className="teamIcon" onClick={() => this.goToTeam(this.props.identifier)}>				
					<img src="/icons/teams/scrum.png" alt={this.props.name} style={{width:'25px', float:'left'}}/> {this.props.name}
			</div>
		);
	}

}

export default TeamButton;