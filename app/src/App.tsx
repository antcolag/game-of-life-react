import React, {RefObject} from 'react';
import GameOfLife from './gameOfLife'
import './App.css';
import Board from './Board';


class App extends React.Component {
  board?: RefObject<Board>;
  speedSlider?: RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    console.log(this)
    this.board = React.createRef();
    this.speedSlider = React.createRef();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <input type="range"  ref={this.speedSlider} onChange={val => this.board?.current?.setSpeed(+val.target.value)}/>
        </header>
        <main>
          <Board game={new GameOfLife()} ref={this.board}/>
        </main>
      </div>
    );
  }
}

export default App;
