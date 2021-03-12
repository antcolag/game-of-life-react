import React, {RefObject} from 'react';
import GameOfLife from './gameOfLife'
import './App.css';
import Board from './Board';


class App extends React.Component {
  board?: RefObject<Board>;
  speedSlider?: RefObject<HTMLInputElement>;
  sizeX?: RefObject<HTMLInputElement>;
  sizeY?: RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    console.log(this)
    this.board = React.createRef();
    this.speedSlider = React.createRef();
    this.sizeX = React.createRef();
    this.sizeY = React.createRef();
  }

  componentDidMount() {
    this.board?.current?.setSizeX(+(this.sizeX?.current?.value || '0'))
    this.board?.current?.setSizeY(+(this.sizeY?.current?.value || '0'))
    this.board?.current?.setSpeed(+(this.speedSlider?.current?.value || '0'))
    this.board?.current?.update()
    window.addEventListener('resize', (this.board?.current?.resize.bind(this.board?.current)) || function() {})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <label>
            <input type="range" ref={this.speedSlider} onChange={evt => this.board?.current?.setSpeed(+evt.target.value)}/>
            speed
          </label>
          <label>
            <input type="range" min={1} max={100} ref={this.sizeX} onChange={evt => this.board?.current?.setSizeX(+evt.target.value)}/>
            size x
          </label>
          <label>
            <input type="range" min={1} max={100} ref={this.sizeY} onChange={evt => this.board?.current?.setSizeY(+evt.target.value)}/>
            size y
          </label>
        </header>
        <main>
          <Board game={new GameOfLife()} ref={this.board} clearEdges={true}/>
        </main>
      </div>
    );
  }
}

export default App;
