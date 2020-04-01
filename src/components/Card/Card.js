import React, { Component } from "react";

export default class Card extends Component {
  render() {
    const { getKey, getItem } = this.props
    return (
      <div className='card'>
        <div className='card-item'>
          <div className='card-item-info info-location'>
            {getKey}
            <div className='item-info'>Buy : {getItem.buy} {getItem.symbol}</div>
            <div className='item-info'>Sell : {getItem.sell} {getItem.symbol}</div>
          </div>
        </div>
      </div>
    );
  }
}