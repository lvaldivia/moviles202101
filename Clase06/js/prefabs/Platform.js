Platform = function(game,floorPool,numTiles,x,y,speed,coinsPool){
	Phaser.Group.call(this,game);
	this.tileSize = 40;
	this.game = game;
	this.enableBody =true;
	this.floorPool = floorPool;
	this.coinsPool = coinsPool;
	this.prepare(numTiles,x,y,speed);
}

Platform.prototype = Object.create(Phaser.Group.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.prepare = function(numTiles,x,y,speed){
	this.alive = true;
	let i = 0;
	while(i < numTiles){
		let floorTile = this.floorPool.getFirstDead();
		if(!floorTile){
			floorTile = new Phaser.Sprite(this.game,x+i*this.tileSize,y,'floor');
		}else{
			floorTile.reset(x+i*this.tileSize,y);
		}
		this.add(floorTile);
		i++;
	}
	this.setAll("body.immovable",true);
	this.setAll("body.allowGravity",false);
	this.setAll("body.velocity.x",speed);

	this.addCoins(speed);
}

Platform.prototype.kill = function(){
	this.alive = false;
	this.callAll("kill");

	let sprites = [];
	this.forEach(function(tile){
		sprites.push(tile);
	},this)

	sprites.forEach(function(tile){
		this.floorPool.add(tile);
	},this)
}

Platform.prototype.addCoins = function(speed){

}

