import React, { Component } from "react";

export default class CardDashboard extends Component {
  render() {
    const { getKey, getItem } = this.props
    return (
      <div className="card">
        <div className="row">
          <div className="card-item col-sm-4">
            <div className="item-title">
              {getKey}
            </div>
          </div>
          <div className="card-item col-sm-4">
            <div className="item-trade">Buy</div>
            <div className="trade-value">{getItem.symbol} {getItem.buy}</div>
          </div>
          <div className="card-item col-sm-4">
            <div className="item-trade">Sell</div>
            <div className="trade-value">{getItem.symbol} {getItem.sell}</div>
          </div>
        </div>
      </div>

    );
  }
}