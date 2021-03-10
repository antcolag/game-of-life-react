import React from 'react';
import logo from './logo.svg';
import GameOfLife from './gameOfLife'
import './App.css';


class App extends React.Component {
  game: GameOfLife = new GameOfLife();
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <main>
          <canvas></canvas>
        </main>
      </div>
    );
  }
}

export default App;
