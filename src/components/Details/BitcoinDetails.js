import React, { Component } from "react";

import CardBitcoinDetails from "./../Card/CardBitcoinDetails"
const URL = "https://blockchain.info/q/"

const getData = [{
  "id": 0, "name": "Marktkapitalisierung", "trade": "marketcap", "value": ""
}, {
  "id": 1, "name": "Anzahl aller Bitcoins im Umlauf", "trade": "totalbc", "value": ""
}, {
  "id": 2, "name": "Anzahl der Transaktionen in den letzten 24h", "trade": "24hrtransactioncount", "value": ""
}, {
  "id": 3, "name": "Anzahl der gesendeter Bitcoin in den letzten 24h", "trade": "24hrbtcsent", "value": ""
}, {
  "id": 4, "name": "Aktuelle Hahsrate", "trade": "hashrate", "value": ""
}, {
  "id": 5, "name": "Aktueller Schwierigkeitsgrad", "trade": "getdifficulty", "value": ""
}, {
  "id": 6, "name": "test", "trade": "getdifficulty", "value": ""
}]

console.log(getData)

export default class BitcoinDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  async componentDidMount() {
    getData.map((data) => {
      fetch(URL + data.trade)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
            data.value = this.state.items
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    })
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                {getData.map((data, i) => (
                  console.log(data, i),
                  <CardBitcoinDetails key={i} getKey={getData[i]} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
