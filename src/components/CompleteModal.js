import React from 'react';

const completeModal = ({teamId}) => {

	const link= "/team/" + teamId;

	return (

			<div id="modal" className="lightbox">
				<br/><br/>
				Congrats! You've completed all of the items on this practice!
				<br/><br/>
				<a href={link}>See what's next!</a>
			</div>
	);
}

export default completeModal