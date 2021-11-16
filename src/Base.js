import Rebase from 're-base';
import firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBrlvtdmV3m5gNx3bO26HZrfFeJUW2HiTk",
  authDomain: "hot-burgers-de5cf.firebaseapp.com",
  databaseURL: "https://hot-burgers-de5cf-default-rtdb.firebaseio.com/",
  projectId: "hot-burgers-de5cf",
  storageBucket: "hot-burgers-de5cf.appspot.com",
  messagingSenderId: "1057410782329",
  appId: "1:1057410782329:web:2e5a201299c4f1cc0470a8"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;