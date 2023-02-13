

**Game classed**
```javascript
class GameTank2D {
	constructor() {
		this.players = [];
		this.turn = 0;
		this.grid = [];
	}

	addPlayer(player) {
		this.players.push(player);
	}

	nextTurn() {
		this.turn = (this.turn + 1) % this.players.length;
	}

	getCurrentPlayer() {
		return this.players[this.turn];
	}

	initializeGrid(width, height) {
		for (let i = 0; i < height; i++) {
			let row = [];
			for (let j = 0; j < width; j++) {
				row.push(null);
			}
			this.grid.push(row);
		}
	}

	placeTank(player, x, y) {
		if (this.grid[x][y] === null) {
			this.grid[x][y] = player;
		} else {
			console.error("This position is already occupied by another tank.");
		}
	}

	moveTank(player, x, y) {
		let currentPosition = this.findTank(player);
		if (currentPosition) {
			let [currX, currY] = currentPosition;
			if (this.grid[x][y] === null) {
				this.grid[x][y] = this.grid[currX][currY];
				this.grid[currX][currY] = null;
			} else {
				console.error("This position is already occupied by another tank.");
			}
		} else {
			console.error("Tank not found.");
		}
	}

	findTank(player) {
		for (let i = 0; i < this.grid.length; i++) {
			for (let j = 0; j < this.grid[i].length; j++) {
				if (this.grid[i][j] === player) {
					return [i, j];
				}
			}
		}
		return null;
	}
}
```

```javascript
class GameGeneric {
	constructor(players, mapSize) {
		this.players = players;
		this.mapSize = mapSize;
		this.currentPlayer = 0;
		this.gameOver = false;
		this.winner = null;
		this.map = this.generateMap(mapSize);
	}

	generateMap(size) {
		// logic to generate game map
		// ...
		return map;
	}

	nextTurn() {
		// logic to switch to the next player
		this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
		if (this.checkGameOver()) {
			this.gameOver = true;
			this.winner = this.players[this.currentPlayer];
		}
	}

	checkGameOver() {
		// logic to check if the game is over
		// ...
		return isOver;
	}

	moveUnit(unitId, x, y) {
		// logic to move unit on the map
		// ...
	}

	attack(attackerId, defenderId) {
		// logic to resolve attack between units
		// ...
	}
}
```
---

**Next turn send data logic**
In this example, a new websocket is created each time the nextTurn method is called 
and player data is sent to the server using the send method. You would need to 
replace the URL ws://example.com/game with the actual URL of your websocket server.

```javascript
nextTurn() {
  // logic to switch to the next player
  this.currentPlayer = (this.currentPlayer + 1) % this.players.length;

  if (this.checkGameOver()) {
    this.gameOver = true;
    this.winner = this.players[this.currentPlayer];
  } else {
    // send player data to websocket
    const playerData = {
      player: this.players[this.currentPlayer],
      map: this.map
    };
    const websocket = new WebSocket('ws://example.com/game');
    websocket.send(JSON.stringify(playerData));
  }
}
```