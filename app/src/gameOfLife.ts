export default class GameOfLife {
	tilemap: boolean[][] = [];

	size: Coords = {
		x: 8,
		y: 8
	}

	changeSizeX(x: number) {
		this.size.x = x
	}

	changeSizeY(y: number) {
		this.size.y = y
	}

	next(){
		const nextState: boolean[][] = [];
		for(let i = 0; i < this.size.x; i++){
			for(let j = 0; j < this.size.y; j++) {
				nextState[i][j] = this.cellWillLive(+i, +j)
			}
		}
	}

	private cellWillLive(i: number, j: number) {
		var neighborsCount: number = this.neighborhood(i, j).reduce(
			(prev, curr) => prev + (curr ? 1 : 0)
		, 0)
		if (this.tilemap[i][j]) {
			return neighborsCount === 3
		} else {
			return neighborsCount == 2 || neighborsCount == 3
		}

	}

	private neighborhood(i: number, j: number) {
		return [
			this.tilemap[i - 1][j - 1],
			this.tilemap[i - 1][j],
			this.tilemap[i - 1][j + 1],
			this.tilemap[i][j - 1],
			this.tilemap[i][j + 1],
			this.tilemap[i + 1][j - 1],
			this.tilemap[i + 1][j],
			this.tilemap[i + 1][j + 1],
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
