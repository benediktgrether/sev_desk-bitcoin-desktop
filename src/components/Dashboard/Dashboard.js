import React, { Component } from "react";
import Card from "../Card/CardDashboard";

// API https://blockchain.info/ticker

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
  }



  componentDidMount() {
    fetch("https://blockchain.info/ticker")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="row">
            {
              Object.entries(items).map(([key, item], i) => (
                <div key={i} className="col-sm-12">
                  < Card getKey={key} getItem={item} />
                </div>
              ))
            }
          </div>
        </div>
      );
    }
  }
}
