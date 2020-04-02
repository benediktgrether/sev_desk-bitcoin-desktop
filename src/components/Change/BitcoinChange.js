import React, { Component } from 'react';
import Select from 'react-select';

let output;
let outputSymbol;

const options = [
  { value: 'EUR', label: 'Euro' },
  { value: 'USD', label: 'US-Dollar' },
  { value: 'AUD', label: 'Australischer-Dollar' },
  { value: 'NZD', label: 'Neuseeland-Dollar ' },
  { value: 'GBP', label: 'Pfund Sterling' },
];

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: '100%',
    // borderBottom: '1px dotted pink',
    backgroundColor: '#242935',
    color: state.selectProps.menuColor,
    padding: 20,
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#242935',
    border: "1px solid #4c6edd"
  }),
  singleValue: (provided) => ({
    color: '4c6edd',
    // backgroundColor: '4c6edd',
  }),
  menuList: (provided) => ({
    color: "#4C6EDD",
  })
}

export default class BitcoinChange extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '', value: 'EUR', item: null, selectedOption: null, };

    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({ input: event.target.value });
  }

  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  handleSubmit(event) {
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
    event.preventDefault();
  }

  render() {
    const { items, isLoaded, input, selectedOption } = this.state
    if (items != null && selectedOption != null) {
      Object.entries(items).map(([key, item], i) => {
        if (key === selectedOption.value) {
          output = input * item.sell
          outputSymbol = item.symbol
        }
      })
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-input">
                <form onSubmit={this.handleSubmit}>
                  <div className="col-sm-12">
                    <div className="input-field">
                      <label>
                        <div className="input-label">
                          Bitte geben Sie einen Betrag ein, den Sie umgerechnet haben möchten:
                        </div>
                        <input type="text" pattern="[0-9.]*" value={this.state.input} onChange={this.handleInput} />
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="input-field">
                      <label>
                        <div className="input-label">
                          Wählen Sie eine Währung aus:
                        </div>
                        <Select
                          className="input-select"
                          styles={customStyles}
                          menuColor='white'
                          value={selectedOption}
                          onChange={this.handleChange}
                          options={options}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="card-btn">
                      <input type="submit" value="Submit" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-output">
                <div className="row">
                  <div className="col-sm-2">
                    <div className="output-btc">BTC</div>
                  </div>
                  <div className="col-sm-10">
                    <div className="output-value">{output} {outputSymbol}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
