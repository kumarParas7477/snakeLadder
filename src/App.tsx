import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Components/Board';

function App() {
  return (
    <div className="App">
     <Board noOfPlayers={3}/>
    </div>
  );
}

export default App;
