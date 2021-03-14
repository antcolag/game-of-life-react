export default class GameOfLife {
	tilemap: boolean[][];
	size: Coords;
	infinite: boolean;

	constructor(
		tilemap: boolean[][] = [
			[false, true, false],
			[false, false, true],
			[true, true, true],
		],
		size: Coords = new Coords(tilemap.length, tilemap[0].length),
		infinite: boolean = true
	){
		this.size = size
		this.tilemap = tilemap
		this.infinite = infinite
	}

	next(){
		const nextState: boolean[][] = [];
		for(let i = this.size.minx; i < this.size.maxx; i++){
			nextState[i] = nextState[i] || []
			for(let j = this.size.miny; j < this.size.maxy; j++) {
				nextState[i][j] = this.cellWillLive(+i, +j)
			}
		}
		this.tilemap = nextState
	}

	isAlive(i: number, j: number) {
		return this.tilemap[i] ? this.tilemap[i][j] : false
	}

	private cellWillLive(i: number, j: number) {
		const neighborsCount: number = this.neighborhood(i, j).reduce(
			(prev, curr) => prev + (curr ? 1 : 0)
		, 0)
		if(this.isEdge(i, j) && this.isAlive(i, j) && this.infinite){
			const minY = Object.keys(this.tilemap).reduce(
				(prev, curr) => Math.min(prev, +curr)
			, 0)
			const minX = Object.keys(this.tilemap[i]).reduce(
				(prev, curr) => Math.min(prev, +curr)
			, 0)
			const maxY = Object.keys(this.tilemap).reduce(
				(prev, curr) => Math.max(prev, +curr)
			, 0)
			const maxX = Object.keys(this.tilemap[i]).reduce(
				(prev, curr) => Math.max(prev, +curr)
			, 0)

			if(minY === i) {
				this.size.miny--
			}

			if(maxY === i) {
				this.size.maxy++
			}

			if(minX === i) {
				this.size.minx--
			}

			if(maxX === i) {
				this.size.maxx++
			}
		}
		if (!(this.tilemap[i] || [])[j]) {
			return neighborsCount === 3
		} else {
			return neighborsCount === 2 || neighborsCount === 3
		}
	}

	private isEdge(i:number, j:number) {
		return (i >= this.size.maxy - 1) || (j >= this.size.maxx - 1) || i === this.size.miny || j === this.size.minx
	}

	private neighborhood(i: number, j: number) {
		return [
			(this.tilemap[i - 1] || [])[j - 1],
			(this.tilemap[i - 1] || [])[j],
			(this.tilemap[i - 1] || [])[j + 1],
			(this.tilemap[i] || [])[j - 1],
			(this.tilemap[i] || [])[j + 1],
			(this.tilemap[i + 1] || [])[j - 1],
			(this.tilemap[i + 1] || [])[j],
			(this.tilemap[i + 1] || [])[j + 1],
		];
	}
}

class Coords {
	minx: number = 0
	miny: number = 0
	maxx: number = 0
	maxy: number = 0
	constructor(maxx: number, maxy: number) {
		this.maxx = maxx
		this.maxy = maxy
	}

	getSizeX() {
		return this.maxx - this.minx
	}

	getSizeY() {
		return this.maxy - this.miny
	}
}
