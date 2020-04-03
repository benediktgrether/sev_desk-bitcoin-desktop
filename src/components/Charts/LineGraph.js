import React, { Component } from 'react'
import Chart from "chart.js";
// import classes from "./LineGraph.module.css";

let label = []
let dataBTC = []

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
  }

  fetchData() {

    fetch("https://api.blockchain.info/charts/transactions-per-second?timespan=1days&rollingAverage=24hours&format=json&cors=true&cors=true")
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
        labels: label,
        datasets: [
          {
            label: "Bitcoin",
            data: dataBTC,
            borderColor: [
              '#4C6EDD'
            ],
            backgroundColor: ['rgba(192, 201, 229, 0.2)'],
          }
        ]
      },
      options: {
        //Customize chart options

      }
    });
  }

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month;
    label.push(time)
    return time;
  }


  render() {
    const { items } = this.state
    console.log(items.values)
    if (items.values !== undefined) {
      Object.entries(items.values).map(([key, item], i) => {
        this.timeConverter(item.x);
        dataBTC.push(item.y)
        console.log(key, item.x)
      })
      this.graph();
    }
    return (
      <div className="card">
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}
