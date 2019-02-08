import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
	apiKey: "AIzaSyDbWMv3XXasGcyt2POIRUkIdNQ9DEwg3JQ",
	authDomain: "roadmap42.firebaseapp.com",
	databaseURL: "https://roadmap42.firebaseio.com",
	projectId: "roadmap42",
	storageBucket: "roadmap42.appspot.com",
	messagingSenderId: "132990042285"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
