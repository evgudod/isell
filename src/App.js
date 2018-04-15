import React, { Component } from 'react';
import Search  from './Search/Search';
import Rubricator from "./Rubricator/Rubribator";
import Top from "./Top/Top";

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header"> </div>
        <Search />
        <Rubricator />


        <Top />
      </div>
    );
  }
}

export default App;
