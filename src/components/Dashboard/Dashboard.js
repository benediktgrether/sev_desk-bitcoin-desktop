import React, { Component } from "react";
import Card from "./../Card/Card";

// API https://blockchain.info/ticker

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  async componentDidMount() {
    const url = "https://blockchain.info/ticker";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      items: data
    });
  }

  render() {
    const { items } = this.state;
    console.log(items.USD);
    return (
      <>
        <div>Dashboard</div>
        <Card />
        <div>items.last</div>
        <ul>
          {items.map(item => (
            <li>{item}</li>
          ))}
        </ul>
      </>
    );
  }
}
