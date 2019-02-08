import React, { Component } from 'react';

class PracticeIcon extends Component {

	goToPractice(pId) {
		window.location = '/practice/' + pId + '?teamId=' + this.props.teamId;
	}

	render() {

		var iconStyle = {}

		if (this.props.break === 'true')
		{
			iconStyle= {
				float:'left',
				margin: '30px',
				clear: 'both'
			}
		}
		else {
			iconStyle= {
				float: 'left',
				margin: '30px'
			}
		}

		var iconURL = "";
		if (this.props.completed) {
			iconURL = "/icons/" + this.props.icon + ".jpg";
		} else {
			iconURL = "/icons/" + this.props.icon + "_grey.jpg";
		}

		return (
			<span style={iconStyle}>
				<img src={iconURL} alt="{this.props.icon}" className="iconImage" onClick={() => {this.goToPractice(this.props.identifier)}} /><br/>
				{this.props.name}
			</span>
		);
	}
}

export default PracticeIcon;