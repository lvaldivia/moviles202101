Plant = function(game,x,y,element){
	Phaser.Sprite.call(this,game,x,y,element.plantAsset);
	this.game = game;
	this.element = element;
	this.anchor.setTo(0.5);
	this.game.physics.arcade.enable(this);
	this.body.immovable = true;

	this.shootingTime = 1000;
	this.producingTime = 5000;
	this.shootingElapsed = 0;
	this.producingElapsed = 0;
	this.createSun = new Phaser.Signal();
	this.createBullet = new Phaser.Signal();
	this.reset(x,y,this.element);
}

Plant.prototype = Object.create(Phaser.Sprite.prototype);
Plant.prototype.constructor = Plant;

Plant.prototype.reset = function(x,y,data){
	Phaser.Sprite.prototype.reset.call(this,x,y); // super(x,y)
	this.loadTexture(data.plantAsset);
	if(data.animationFrames){

	}
	if(data.hasOwnProperty("animationFrames")){
		this.animationName = data.plantAsset+"Anim";
		this.animations.add(this.animationName,data.animationFrames,6,false);
	}
	this.isShooter = false;
	this.isSunProducer = false;
	if(data.hasOwnProperty("isSunProducer")){
		this.isSunProducer = data.isSunProducer;
	}

	if(data.hasOwnProperty("isShooter")){
		this.isShooter = data.isShooter;
	}
}

Plant.prototype.shoot = function(){
	if(!this.isShooter)return;
	if(this.animations.getAnimation(this.animationName)){
		this.animations.play(this.animationName);
	}
	this.createBullet.dispatch(this.x,this.y);
}

Plant.prototype.update = function(){
	this.shootingElapsed +=this.game.time.elapsed;
	this.producingElapsed += this.game.time.elapsed;

	if(this.shootingElapsed >= this.shootingTime){
		this.shootingElapsed = 0;
		this.shoot();
	}
	if(this.producingElapsed >= this.producingTime){
		this.producingElapsed = 0;
		this.generateSun();
	}
}

Plant.prototype.generateSun = function(){
	if(!this.isSunProducer)return;
	this.createSun.dispatch(this.x,this.y);
}