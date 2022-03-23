import React from 'react';
import axios from 'axios';
import './App.css';

import Body from './Body.js';
import Header from './Header.js';
import Menu from './Menu.js';
import Footer from './Footer.js';

// More infos here: https://reactjs.org/

// function App() {
//   return (
//     <div className="App">
//       <Header/>
//       <Menu/>
//       <Body/>
//       <Footer/>
//     </div>
//   );
// }

class App extends React.Component {
  constructor() { // will allow to setup the state variables
    super();
    this.state = { // this is the only time when it is possible to use "this.state = "
      summary: '',
      temperature: 0.0,
      precip: 0.0
    }
  }

  componentDidMount() {
    console.log("Just loaded");
    axios.get('/weather').then(response => {
      this.setState({ // we use this.setState() with a js object argument that will update the state
                      // it is important that the variable names (fields) are the same as in the state
        summary: response.data.summary,
        temperature: response.data.temperature,
        precip: response.data.precipProbability
      })
    });
  }

  render() {
    var weather = '';

    if (this.state.summary !== '') {
      weather = <div>
        <p>Temps: {this.state.summary}</p>
        <p>Température: {this.state.temperature}</p>
        <p>Risque de précip.: {this.state.precip*100}%</p>
      </div>
    }

    return (
      <div className="App">
        <Header/>
        <Menu/>
        {weather}
        <Body/>
        <Footer/>
      </div>
    );
  }
}

export default App;
