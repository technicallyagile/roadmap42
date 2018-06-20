import React, { Component } from 'react';
import ActionBar from './components/ActionBar.js'
import PracticesBoard from './components/PracticesBoard.js'
import PracticeDetails from './components/PracticeDetails.js'
import Congratulations from './components/Congratulations.js'
import FourOhFour from './components/FourOhFour.js'
import './App.css';


const PAGES = {
    '': PracticesBoard,
    'team': PracticesBoard,
    'practice': PracticeDetails,
    'congrats': Congratulations,
};

class App extends Component {
  
  getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
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

    if (pathElems[1] === 'practice')
      Arg2 = this.getParameterByName("teamId");

    return (
      <div className="App">
        <ActionBar />
        <Handler arg={Arg} arg2={Arg2} />
      </div>
    );
  }
}

export default App;
