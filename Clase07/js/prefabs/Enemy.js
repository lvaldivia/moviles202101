Enemy = function(game,x,y,key,velocity,tilemap){
	Phaser.Sprite.call(this,game,x,y,key);
	this.game= game;
	this.tilemap = tilemap;
	this.anchor.setTo(0.5);

	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.bounce.set(1,0);
	if(!velocity){
		velocity = (40+ Math.random()*20) *(Math.random() < 0.5 ? 1 : - 1 );
	}
	this.body.velocity.x = velocity;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;


Enemy.prototype.update = function(){
	let direction;
	if(this.body.velocity.x > 0){
		this.scale.setTo(-1,1);
		direction = 1;
	}else{
		this.scale.setTo(1,1);
		direction = -1;
	}

	let nextX = this.x + direction * (Math.abs(this.width)/2+1);
	let nextY = this.bottom + 1;

	let nextTile = this.tilemap.getTileWorldXY(nextX,nextY,this.tilemap.tileWidth,this.tilemap.tileHeight,'collisionLayer');
	if(!nextTile && this.body.blocked.down){
		this.body.velocity.x *= -1;
	}

}


