import React from "react";
import { Switch, Route } from "react-router-dom";
import BitcoinDetails from "./../Details/BitcoinDetails";
import Dashboard from "./../Dashboard/Dashboard";
import BitcoinChange from "./../Change/BitcoinChange"
import Menu from "./Menu";

export default function Layout() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-3'>
          <div className='sidebar'>
            <Menu />
          </div>
        </div>
        <main className='col-sm-9'>
          <div className='content'>
            <Switch>
              <Route path='/bitcoin-change' component={BitcoinChange} />
              <Route path='/bitcoin-details' component={BitcoinDetails} />
              <Route path='/' component={Dashboard} />
            </Switch>
          </div>
        </main>
      </div>
    </div>
  );
}
