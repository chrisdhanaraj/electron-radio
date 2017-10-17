import * as firebase from 'firebase';

const config = JSON.parse(process.env.REACT_APP_FIREBASE);
firebase.initializeApp(config);
const database = firebase.database();

export default database;
