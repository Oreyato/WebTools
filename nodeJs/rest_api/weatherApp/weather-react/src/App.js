import React from 'react';
import axios from 'axios';
import './App.css';

import Body from './Body.js';
import Header from './Header.js';
import Menu from './Menu.js';
import Footer from './Footer.js';

// More infos here: https://reactjs.org/
// Interesting article on react: https://codeburst.io/binding-functions-in-react-b168d2d006cb

class App extends React.Component {
  constructor() { // will allow to setup the STATE VARIABLES
    super();
    this.state = { // this is the only time when it is possible to use "this.state = "
      summary: '',
      temperature: 0.0,
      precip: 0.0,
      cities: ['Montpellier', 'Montréal', 'Montgomery']
    }
    // Interesting when you don't want to run the function immediately (here: only when the "button" are clicked)
    this.changeCity = this.changeCity.bind(this);
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

  changeCity(city) {
    console.log(city);
    axios.get('/weather?city=' + city).then(response => {
      this.setState({
        summary: response.data.summary,
        temperature: response.data.temperature,
        precip: response.data.precipProbability
      })
    });
  }

  render() {
    // var weather = '';

    // if (this.state.summary !== '') {
    //   weather = <div>
    //     <p>Temps: {this.state.summary}</p>
    //     <p>Température: {this.state.temperature}</p>
    //     <p>Risque de précip.: {this.state.precip*100}%</p>
    //   </div>;
    // }

    // <Body <summ... --> we put three PROPS in the Body COMPONENT: summary, temperature, precip
    // it allows us to use them inside Body
    return (
      <div className="App">
        <Header/>
        <Menu cities={this.state.cities} changeCity={this.changeCity}/>
        <Body summary={this.state.summary} temperature={this.state.temperature} precip={this.state.precip} /> 
        <Footer/>
      </div>
    );
  }
}

export default App;
