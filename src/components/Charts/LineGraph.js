import React, { Component } from 'react'
import Chart from "chart.js";
// import classes from "./LineGraph.module.css";

const data = [{
  x: 10,
  y: 20
}, {
  x: 15,
  y: 10
}]

export default class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
  }

  chartRef = React.createRef();

  componentDidMount() {

    this.fetchData();
    this.graph();
  }

  fetchData() {

    fetch("https://api.blockchain.info/charts/transactions-per-second", { mode: 'no-cors' })
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


  graph() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: ["Jan", "Feb", "March"],
        datasets: [
          {
            label: "Sales",
            data: [86, 67, 91],
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
  }
  render() {
    const { items } = this.state
    console.log(items)
    return (
      <div className="">
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}
