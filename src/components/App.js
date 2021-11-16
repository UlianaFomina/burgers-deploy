import React from 'react';
import Header from './Header';
import Order from './Order';
import MenuAdmin from './MenuAdmin';
import sampleBurgers from "../sample-burgers";
import Burger from './Burger';
import base from '../Base';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import Signin from './Auth/Signin';
import SignIn from './Auth/Signin';

class App extends React.Component{

  static propTypes = {
    match: PropTypes.object
  }

  state = {
    burgers: {},
    order: {}
  };
  //при каждой загрузке страницы связываемся с базой данных и производим сихронизацию
  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.restaurantId);
    if(localStorageRef){
      this.setState({order:JSON.parse(localStorageRef)})//переводим обратно в обьект
    }
    //ref-для ссылки на нужный обьект внутри базы данных 
    //в state пишем то,что будем синхронизировать
    this.ref = base.syncState(`${params.restaurantId}/burgers`, {
      context: this,
      state: 'burgers'
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
  }
  //при переходе на другую страницу компонетн удаляется
  //чистка, закрываем пакеты по которым работает база 
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  addToOrder = (key) => {
    // 1 копия
    const order = { ...this.state.order };
    //2 берём ключ бургера и добавляем в ордкр
    order[key] = order[key] + 1 || 1;
    //3 записываем в state
    this.setState({order});
    
  };

  addBurger = burger => {
    // 1. Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // 2. Добавить новый бургер в переменную burgers
    burgers[`burger${Date.now()}`] = burger;
    // 3. Записать наш новый объект burgers в state
    this.setState({ burgers });
  };

  updateBurger = (key, updateBurger) => {
    // 1. Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // 2. Обновляем нужный бургер
    burgers[key] = updateBurger;
    // 3. запись в state
    this.setState({ burgers });
  };

  deleteBurger = key => {
    // 1. Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // 2. Удаляем burger
    burgers[key] = null;
    // 3. запись в state
    this.setState({ burgers });
  };

  deleteFromOrder = key => {
    // 1. Делаем копию объекта state
    const order = { ...this.state.order };
    // 2. 
    delete order[key];
    //3 записываем в state
    this.setState({order});

  }

  loadSampleBurgers = () =>{
    this.setState({burgers:sampleBurgers});
  };

  handleLogout = async() => {
    await firebase.auth().signOut();
    window.location.reload();
  }

  render(){
    return(
      <SignIn>
      <div className="burger-paradise">
        <div className="menu">
          <Header title="Hot Burger"/>
          <ul className="burgers">
            {Object.keys(this.state.burgers).map(key => {
                  return <Burger
                  addToOrder = {this.addToOrder} 
                  key={key} 
                  index={key}
                  details = {this.state.burgers[key]}
                  />
                }
              )
            }
          </ul>
        </div>
        <Order 
        burgers={this.state.burgers}
         order={this.state.order}
         deleteFromOrder={this.deleteFromOrder}/> 
        <MenuAdmin 
        deleteBurger = {this.deleteBurger}
        addBurger={this.addBurger} 
        burgers={this.state.burgers}
        LoadSampleBurgers={this.loadSampleBurgers} 
        updateBurger={this.updateBurger}
        handleLogout={this.handleLogout}
        />
      </div>
      </SignIn>
    );
  }
}
export default App;
