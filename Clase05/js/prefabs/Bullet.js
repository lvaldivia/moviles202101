Bullet = function(game,x,y){
	Phaser.Sprite.call(this,game,x,y,'bullet');
	this.game =  game;
	this.game.physics.arcade.enable(this);
	this.body.velocity.x = 100;
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function(){
	if(this.x >=this.game.width){
		this.kill();
	}
}