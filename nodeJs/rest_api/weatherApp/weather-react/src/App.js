import React from 'react';
import './App.css';
import Body from './Body.js';
import Header from './Header.js';
import Menu from './Menu.js';
import Footer from './Footer.js';

// More infos here: https://reactjs.org/

function App() {
  return (
    <div className="App">
      <Header/>
      <Menu/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
