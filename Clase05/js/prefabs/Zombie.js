Zombie = function(game,x,y,element){
	Phaser.Sprite.call(this,game,x,y,element.asset);
	this.game = game;
	this.element = element;
	this.anchor.setTo(0.5);
	this.game.physics.arcade.enable(this);
	this.reset(x,y,element);
}

Zombie.prototype = Object.create(Phaser.Sprite.prototype);
Zombie.prototype.constructor = Zombie;

Zombie.prototype.reset = function(x,y,data){
	Phaser.Sprite.prototype.reset.call(this,x,y);
	this.loadTexture(data.asset);
	if(data.hasOwnProperty("animationFrames")){
		this.animationName = data.asset+"Anim";
		this.animations.add(this.animationName,data.animationFrames,4,true);
		this.animations.play(this.animationName);
	}
	this.attack = data.attack;
	this.health = data.health;
	this.defaultVelocity = data.velocity;
	this.body.velocity.x = this.defaultVelocity;
}

Zombie.prototype.damage = function(amount){
	Phaser.Sprite.prototype.damage.call(this,amount);
	console.log(this.health);
	let emitter = this.game.add.emitter(this.x,this.y,50);
	emitter.makeParticles('blood');
	emitter.minParticleSpeed.setTo(-100,-100);
	emitter.maxParticleSpeed.setTo(100,100);
	emitter.gravity = 300;
	emitter.start(true,200,null,100);
	if(this.health<=0){
		this.kill();
		let body = this.game.add.sprite(this.x,this.bottom,'dead_zombie');	
		body.anchor.setTo(0.5);

	}
	
}