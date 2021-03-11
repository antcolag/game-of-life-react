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

	setSizeX(x: number) {
		this.props.game.size.x = x
    this.draw()
	}

	setSizeY(y: number) {
		this.props.game.size.y = y
    this.draw()
	}

  componentDidMount() {
    this.output?.current?.addEventListener("click", e => {
      const {height, width} = this.getTileSize()
      const rect = this.output?.current?.getBoundingClientRect();
      const x = ((e.clientX - (rect?.left || 0)) / width) >>> 0
      const y = ((e.clientY - (rect?.top || 0)) / height) >>> 0
      this.props.game.tilemap[y][x] = !this.props.game.tilemap[y][x]
      console.log(y, x)
      this.draw()
    });
    this.resize()
    this.update()
  }

  resize() {
    if(this.output?.current) {
      this.output.current.width  = this.output.current.offsetWidth;
      this.output.current.height = this.output.current.offsetHeight;
    }
  }

  getTileSize() {
    return  {
      width: (this.output?.current?.width || 0) / (this.props.game.size.x),
      height: (this.output?.current?.height || 0) / (this.props.game.size.y)
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

    this.props.game.next()

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

  draw() {
    const ctx = this.output?.current?.getContext("2d")
    if(!ctx) {
      return
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const {height, width } = this.getTileSize()
    for(let i=0; i < this.props.game.size.y; i++) {
      for(let j=0; j < this.props.game.size.x; j++) {
        ctx.fillStyle = this.props.game.isAlive(j, i) ? '#000000' : '#FFFFFF'
        ctx.fillRect(i * width, j * height, width + 1, height + 1);
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
