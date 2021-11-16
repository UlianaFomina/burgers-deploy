import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) =>{
  return(
    <div className='login-container'>
      <nav className='login'>
        <h2>Авторизация</h2>
        <p>Введите логин и пароль вашего аккаута Github</p>
        <button className='github'
          onClick={
          () => props.aunthenticate()}>          
          Войти</button>
      </nav>
    </div>
  )
}
Login.propTypes = {
  aunthenticate:PropTypes.func.isRequired
}
export default Login;