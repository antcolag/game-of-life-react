export default class GameOfLife {
	tilemap: boolean[][];
	size: Coords;
	clearEdges: boolean;

	constructor(
		tilemap: boolean[][] = [
			[false, true, false],
			[false, false, true],
			[true, true, true],
		],
		size: Coords = new Coords(tilemap.length, tilemap[0].length),
		clearEdges: boolean = true
	){
		this.size = size
		this.tilemap = tilemap
		this.clearEdges = clearEdges
	}

	next(){
		const nextState: boolean[][] = [];
		for(let i = 0; i < this.size.x; i++){
			nextState[i] = nextState[i] || []
			for(let j = 0; j < this.size.y; j++) {
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
		if(this.isEdge(i, j) && this.isAlive(i, j) && this.clearEdges){
			return false
		}
		if (!(this.tilemap[i] || [])[j]) {
			return neighborsCount === 3
		} else {
			return neighborsCount === 2 || neighborsCount === 3
		}
	}

	private isEdge(i:number, j:number) {
		return (i >= this.size.y - 1) || (j >= this.size.x - 1)
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
	x: number = 0
	y: number = 0
	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}
}
