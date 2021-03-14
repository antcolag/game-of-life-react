import React, {RefObject} from 'react';
import GameOfLife from './gameOfLife'
import './App.css';

class BoardProperties {
  game: GameOfLife = new GameOfLife()
  infinite:boolean = true
}

export default class Board extends React.Component<BoardProperties> {
  output?: RefObject<HTMLCanvasElement>;
  frameCount: number = 0;
  speed: number = 1000/60;
  stopped: boolean = false;
  constructor(props:BoardProperties) {
    super(props);
    this.output = React.createRef();
  }

  setSizeX(x: number) {
    this.props.game.size.maxx = x
    this.draw()
  }

  setSizeY(y: number) {
    this.props.game.size.maxy = y
    this.draw()
  }

  componentDidMount() {
    this.output?.current?.addEventListener("click", e => {
      const {height, width} = this.getTileSize()
      const rect = this.output?.current?.getBoundingClientRect();
      const x = (((e.clientX - (rect?.left || 0)) / width) >>> 0) + this.props.game.size.minx
      const y = (((e.clientY - (rect?.top || 0)) / height) >>> 0) + this.props.game.size.miny
      this.props.game.tilemap[y][x] = !this.props.game.tilemap[y][x]
      this.draw()
    });
    this.resize()
    this.draw()
  }

  resize() {
    if(this.output?.current) {
      this.output.current.width  = this.output.current.offsetWidth;
      this.output.current.height = this.output.current.offsetHeight;
    }
  }

  getTileSize() {
    return  {
      width: (this.output?.current?.width || 0) / (this.props.game.size.getSizeX()),
      height: (this.output?.current?.height || 0) / (this.props.game.size.getSizeY())
    }
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
    this.draw()
    if(this.speed === 100){
      requestAnimationFrame(this.next.bind(this))
      return
    } else if(this.speed === 0) {
      this.stopped = true
      return
    }
    this.stopped = false
    setTimeout(this.next.bind(this), this.mapPercValue())
  }

  next() {
    this.props.game.next()
    this.update()
  }

  draw() {
    const ctx = this.output?.current?.getContext("2d")
    if(!ctx) {
      return
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const {height, width } = this.getTileSize()
    for(let i = this.props.game.size.miny; i < this.props.game.size.maxy; i++) {
      for(let j = this.props.game.size.minx; j < this.props.game.size.maxx; j++) {
        ctx.fillStyle = this.props.game.isAlive(j, i) ? '#000000' : '#FFFFFF'
        ctx.fillRect(
          (i - this.props.game.size.miny) * width,
          (j - this.props.game.size.minx) * height,
          width + 1,
          height + 1
        );
      }
    }
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
