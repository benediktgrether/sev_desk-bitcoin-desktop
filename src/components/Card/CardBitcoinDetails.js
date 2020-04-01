import React, { Component } from 'react'

export default class CardBitcoinDetails extends Component {
  render() {
    const { getKey } = this.props
    if (getKey.id != 6) {
      return (
        <div className="row">
          <div className="col-sm-6 card-bitcoindetails">
            <div className="">{getKey.name}</div>
          </div>
          <div className="col-sm-6 card-bitcoindetails">
            <div className="">{getKey.value}</div>
          </div>
        </div>
      )
    } else {
      return (<></>)
    }
  }
}