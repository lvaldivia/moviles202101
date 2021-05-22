Sun = function(game,x,y,velocity){
	Phaser.Sprite.call(this,game,x,y,'sun');
	this.game = game;
	this.velocity = velocity;
	this.game.physics.arcade.enable(this);
	this.body.velocity.y = velocity;
	this.anchor.setTo(0.5);
	this.inputEnabled = true;
	this.events.onInputDown.add(this.killSun,this);
	this.increaseSun = new Phaser.Signal();
	this.timerElapsed = 0;
	this.points = 25;
	this.totalSunElapsed = 2000;
}

Sun.prototype = Object.create(Phaser.Sprite.prototype);
Sun.prototype.constructor = Sun;

Sun.prototype.update= function(){
	this.timerElapsed += this.game.time.elapsed;
	if(this.timerElapsed>= this.totalSunElapsed){
		let tween = this.game.add.tween(this).to({alpha:0});
		tween.start();
		tween.onComplete.add(this.kill,this);
		this.totalSunElapsed = 0;
	}
}

Sun.prototype.killSum = function(){
	this.increaseSun.dispatch(this.points);
	this.kill();
}

Sun.prototype.reset = function(x,y,velocity){
	Phaser.Sprite.prototype.reset.call(this,x,y);
	this.body.velocity.y = velocity;
}