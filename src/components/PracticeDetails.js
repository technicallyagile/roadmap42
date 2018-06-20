import React, { Component } from 'react';
import PracticeQuestion from './PracticeQuestion';
import CompleteModal from './CompleteModal';
import axios from 'axios';

class PracticeDetails extends Component {

    initializeFirestore() {
    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");

    var config = {
      apiKey: "AIzaSyDbWMv3XXasGcyt2POIRUkIdNQ9DEwg3JQ",
      authDomain: "roadmap42.firebaseapp.com",
      databaseURL: "https://roadmap42.firebaseio.com",
      projectId: "roadmap42",
      storageBucket: "roadmap42.appspot.com",
      messagingSenderId: "132990042285"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    return firebase.firestore();
  }

	constructor(props) {
		super(props);
		this.state = {_id: null, name: null,icon: null, iconalt: null, description: null, completed: null, questions: []};
    this.refreshQuestions = this.refreshQuestions.bind(this);

    var firestore = this.initializeFirestore();
    var docRef = firestore.doc("teams/" + this.props.arg2 + "/practiceInstances/" + this.props.arg);
    
    docRef.get().then(doc => {
      if (doc && doc.exists) {
        const myData = doc.data();
        console.log("data", myData);
        this.setState({_id: this.props.arg});
        this.setState({ name: myData.name });
        this.setState({ icon: myData.icon });
        if (myData.completed) {
          this.setState({icon:'/icons/' + myData.icon + '.jpg'});
        } else {
          this.setState({icon:'/icons/' + myData.icon + '_grey.jpg'});
        }

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

    //axios.get('http://localhost:3000/practices/' + this.props.arg)
    //  		.then(results => {
    //   		return results.data;
    //  		}).then(data => {
    //        this.setState({_id: this.props.arg});
    //  			this.setState({name:data.name});
    //  			if (data.completed) {
    //  				this.setState({icon:'/icons/' + data.icon + '.jpg'});
    //  			} else {
    //  				this.setState({icon:'/icons/' + data.icon + '_grey.jpg'});
    //  			}
    //  			this.setState({iconalt:data.icon});
    //  			this.setState({description:data.description});
    //    	});
    //this.refreshQuestions("local");

	}

  refreshQuestions(source) {
    var isAllGood = true;

    axios.get('http://localhost:3000/questions/' + this.props.arg)
          .then(results => {
            return results.data;
          }).then(data =>{
            let questions = data.map((fra) => {
              if (fra.Selected_answer !== 1) { isAllGood = false;}
              return(<PracticeQuestion key={fra._id} _id={fra._id} text={fra.text} answers={fra.answers} selectedAnswer={fra.Selected_answer} callbackMethod={this.refreshQuestions} />);
            })
            this.setState({questions:questions});
          }).then(() => {

              const options = {
                method: 'PUT',
                headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
                body: 'completed=' + isAllGood
              }

              fetch('http://localhost:3000/practices/' + this.props.arg, options)
                .catch(function(error) {
                  console.log('Looks like there was a problem: \n', error);
                })

              if (isAllGood) { 
                this.setState({icon:'/icons/' + this.state.iconalt + '.jpg'});
                if (source === "question") { 
                    var congrats = document.getElementById('modal');
                    congrats.style.display = 'block';
                }
              } else {
                this.setState({icon:'/icons/' + this.state.iconalt + '_grey.jpg'});
              }

          }).catch(function(error) {
              console.log('Looks like there was a problem: \n', error);
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

        <CompleteModal />
			</div>
		);
	}
}

export default PracticeDetails;