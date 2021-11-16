import React from 'react';
import PropTypes from "prop-types";
import Shipment from './Shipment'

class Order extends React.Component{

  static propTypes = {
    burgers: PropTypes.object,
    order: PropTypes.object,
    deleteFromOrder : PropTypes.func
  }

  renderOrder = (key) => {
      const burger = this.props.burgers[key];
      const count = this.props.order[key];

      if(!burger) return null;

      const isAvailable = burger && burger.status === 'available';
      if(!isAvailable){
        return <li className='unavailable' key={key}>Извините, {burger ? burger.name : 'burger'} временно недоступен</li>
      }
      return <li key={key}>
        <span>
          <span>{count}</span>
          шт. {burger.name}
          <span>  {count * burger.price}  ₽</span>
          <button onClick={() => {this.props.deleteFromOrder(key)}} className="cancellItem">&times;</button>
        </span>
      </li>
  }

   render(){
    const orderIds = Object.keys(this.props.order);// массив из ключей бургеров, которые мы заказываем
    const total = orderIds.reduce((prevTotal, key)=> {
      const burger = this.props.burgers[key];
      const count = this.props.order[key];

      const isAvailable = burger && burger.status === 'available';
      if(isAvailable){
         return prevTotal + burger.price * count;
      }
      return prevTotal;
    }, 0)

    return(
      <div className="order-wrap">
        <h2>Your order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
        </ul>
        
        {total > 0 ? (
          <Shipment  total={total}/> ):
          (<div className="nothingSelected">Выберете блюдо и добавьте к заказу</div>) 
        }
      </div>
    );
  }
}
export default Order;