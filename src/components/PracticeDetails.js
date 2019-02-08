import React, { Component } from 'react';
import PracticeQuestion from './PracticeQuestion';
import CompleteModal from './CompleteModal';
import * as firebase from 'firebase';

class PracticeDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {_id: null, name: null,icon: null, iconalt: null, description: null, completed: null, questions: []};
    this.refreshQuestions = this.refreshQuestions.bind(this);

    var firestore = firebase.firestore();
    const fSettings = {timestampsInSnapshots: true};
    firestore.settings(fSettings);
    var docRef = firestore.doc("teams/" + this.props.arg2 + "/practiceInstances/" + this.props.arg);
    
    docRef.get().then(doc => {
      if (doc && doc.exists) {
        const myData = doc.data();
        this.setState({_id: this.props.arg});
        this.setState({ name: myData.name });
        this.setState({ iconalt: myData.icon });
        //if (myData.completed) {
        //  this.setState({iconalt:'/icons/' + myData.icon + '.jpg'});
        //} else {
        //  this.setState({iconalt:'/icons/' + myData.icon + '_grey.jpg'});
        //}

        var practiceTemplateRef = firestore.doc("practices/" + myData.practice);
        practiceTemplateRef.get().then(pDoc => {
          if (pDoc && pDoc.exists) {
            const pData = pDoc.data();
            this.setState({description: pData.description });
          }
        });
      }
    }).catch(function (error) {
      console.log("Got an error: ", error);
    });


    this.refreshQuestions("local");

	}

  refreshQuestions(source) {
    var isAllGood = true;

    var firestore = firebase.firestore();
    var colRef = firestore.collection("teams/" + this.props.arg2 + "/practiceInstances/" + this.props.arg + "/questions")
    colRef.get().then(querySnapshot => {

        let questions = querySnapshot.docs.map (docSnapshot => {
          if (docSnapshot && docSnapshot.exists)
          {
            var qData = docSnapshot.data();
            if (qData.answer !== "1") { isAllGood = false;}
            return(<PracticeQuestion key={docSnapshot.id} _id={docSnapshot.id} teamId={this.props.arg2} practiceId={this.props.arg} text={qData.text} answers={qData.answers} selectedAnswer={qData.answer} callbackMethod={this.refreshQuestions} />);
          } else { return null;}
        });

        this.setState({questions:questions});

    }).then(() => {
      var practiceReference = firestore.doc("teams/" + this.props.arg2 + "/practiceInstances/" + this.props.arg);
      practiceReference.update({'complete':isAllGood});
      if (isAllGood) { 
        this.setState({icon:'/icons/' + this.state.iconalt + '.jpg'});
        if (source === "question") { 
          var congrats = document.getElementById('modal');
          congrats.style.display = 'block';
      }
      } else {
        this.setState({icon:'/icons/' + this.state.iconalt + '_grey.jpg'});
      }
    }).catch(function (error) {
      console.log("Got an error: ", error);
    });



  }

	render() {

		return (
			<div className="detailArea">
				<img src={this.state.icon} alt={this.state.iconalt} className="detailIconImage" />
				<div className="detailTitle">
					{this.state.name}
				</div>
				<div className="levelClear" />
				<div className="detailDescription" dangerouslySetInnerHTML={{__html: this.state.description}} />

				Questions:<br/><br/>
				{this.state.questions}

        <CompleteModal teamId={this.props.arg2}/>
			</div>
		);
	}
}

export default PracticeDetails;