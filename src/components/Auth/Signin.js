import React from 'react';
import Login from './Login';
import firebase from 'firebase/app';
import {firebaseApp} from '../../Base';

class SignIn extends React.Component{
  state = {
    user: ''
  }

componentDidMount(){
  firebase.auth().onAuthStateChanged(user =>{
    if(user){
      this.authHandler({user});
    }
  })
}

authHandler = async (authData) => {
  const {email} =authData.user;
  this.setState({user: email});
}

  aunthenticate=()=>{
    const authProvider = new firebase.auth['GithubAuthProvider']();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }
  render(){
    if(!this.state.user){
      return <Login aunthenticate={this.aunthenticate}/>
    }
    return this.props.children;// в children всё что внутри тега
  }
}

export default SignIn;