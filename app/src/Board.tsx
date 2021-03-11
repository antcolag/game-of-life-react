import React, {RefObject} from 'react';
import GameOfLife from './gameOfLife'
import './App.css';

export default class Board extends React.Component<{game: GameOfLife}> {
  output?: RefObject<HTMLCanvasElement>;
  frameCount: number = 0;
  speed: number = 1/60;
  stopped: boolean = false;
  constructor(props: {game: GameOfLife}) {
    super(props);
    console.log(this)
    this.output = React.createRef();
  }

  componentDidMount() {
    this.update()
  }

  setSpeed(speed: number){
    if(speed > 100 || speed < 0){
      throw new Error("wrong value")
    }
    this.speed = speed
    if(this.stopped){
      this.update()
    }
  }

  update() {
    const canvas = this.output?.current
    if(!canvas) {
      throw new Error("canvas is not defined")
    }

    const ctx = canvas.getContext("2d")

    if(!ctx) {
      throw new Error("ctx is not defined")
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(this.frameCount++*0.05)**2, 0, 2*Math.PI)
    ctx.fill()


    if(this.speed === 100){
      requestAnimationFrame(this.update.bind(this))
      return
    } else if(this.speed === 0) {
      this.stopped = true
      return
    }
    this.stopped = false
    setTimeout(this.update.bind(this), this.mapPercValue())
  }

  render() {
    return (
      <canvas ref={this.output}></canvas>
    );
  }

  private mapPercValue() {
    return 1000 - (this.speed - 1) * (1000 - 1000/60) / (100 - 1) + 1000/60
  }
}
