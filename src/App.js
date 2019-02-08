import React, { Component } from 'react';
import ActionBar from './components/ActionBar.js'
import TeamBoard from './components/TeamBoard.js'
import PracticesBoard from './components/PracticesBoard.js'
import PracticeDetails from './components/PracticeDetails.js'
import Congratulations from './components/Congratulations.js'
import FourOhFour from './components/FourOhFour.js'
import AddPractice from './components/AddPractice.js'
import AddTeam from './components/AddTeam'
import SignIn from './components/SignIn'
import AdminPracticeList from './components/AdminPracticeList.js'
import EditPractice from './components/EditPractice.js'
import SignOff from './components/SignOff.js'
import NewUser from './components/NewUser.js'
import './App.css';
//import * as firebase from 'firebase';


const PAGES = {
    '': TeamBoard,
    'team': PracticesBoard,
    'practice': PracticeDetails,
    'congrats': Congratulations,
    'addpractice': AddPractice,
    'addteam': AddTeam,
    'newuser': NewUser,
    'signin': SignIn,
    'signoff': SignOff,
    'adminpracticelist':AdminPracticeList,
    'editpractice':EditPractice,
};

class App extends Component {
  
  constructor()
  {
    super();
    this.state = {userId:null}
  }

  getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  render() {
  	var pathElems = window.location.pathname.split('/');
  	const Handler = PAGES[pathElems[1]] || FourOhFour;
  	const Arg = pathElems[2] || '';
    var Arg2 = null;

    if (pathElems[1] === 'practice' || pathElems[1] === 'addpractice')
      Arg2 = this.getParameterByName("teamId");

    return (
      <div className="App">
        <ActionBar />
        <Handler arg={Arg} arg2={Arg2}/>
      </div>
    );
  }
}

export default App;
