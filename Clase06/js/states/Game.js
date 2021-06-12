Game = function(game){}

Game.prototype = {
	init:function(param1,param2,param3){
		/*console.log(param1);
		console.log(param2);
		console.log(param3);*/
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.levelSpeed = 200;
		this.game.physics.arcade.gravity.y = 1000;
		this.maxJumpDistance = 120;
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.myCoins = 0;
	},
	create:function(){
		this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');
		this.background.tileScale.y = 2;
		this.background.autoScroll(-this.levelSpeed/6,0);
		this.player = this.game.add.sprite(50,140,'player_spritesheet');
		this.player.anchor.setTo(0.5);
		this.player.animations.add('running',[0,1,2,3,2,1],15,true);
		this.player.animations.play("running");
		this.water = this.game.add.tileSprite(0,this.game.height - 30,this.game.width,30,'water');
		this.water.autoScroll(-this.levelSpeed/2,0);

		this.platformPool = this.game.add.group();
		this.floorPool = this.game.add.group();
		this.coinsPool = this.game.add.group();
		this.coinsPool.enableBody = true;
		this.currentPlatform = new Platform(this.game,this.floorPool,11,0,200,-this.levelSpeed,this.coinsPool);
		this.platformPool.add(this.currentPlatform);

		let style = {font: '30px Arial', fill : "#fff"};
		this.coinsCountLabel = this.game.add.text(10,20,'0',style);
		this.loadLevel();
	},
	loadLevel: function(){
		this.createPlatform();
	},
	createPlatform:function(){
		let nextPlatformData = this.generateRandomPlatform();
		if(nextPlatformData){
			this.currentPlatform =this.platformPool.getFirstDead();
			if(!this.currentPlatform){
				this.currentPlatform = new Platform(this.game,this.floorPool,
									nextPlatformData.numTiles,
									this.game.width + nextPlatformData.separation,
									nextPlatformData.y,
									-this.levelSpeed,
									this.coinsPool);
			}else{
				this.currentPlatform.prepare(
					this.game.width + nextPlatformData.separation,
					nextPlatformData.y,
					-this.levelSpeed,
				);
			}
			this.platformPool.add(this.currentPlatform);
		}
	},
	generateRandomPlatform:function(){
		let data = {};

		let minSeparation = 60;
		let maxSeparation = 200;
		data.separation = minSeparation + Math.random() *(maxSeparation - minSeparation);
		let minDifY = -120;
		let maxDifY = 120;

		data.y = this.currentPlatform.children[0].y + minDifY + Math.random() * (maxDifY - minDifY);
		data.y = Math.max(150,data.y);
		data.y = Math.min(this.game.height - 50,data.y);

		let minTiles = 1;
		let maxTiles  = 5;
		data.numTiles = minTiles + Math.random() * (maxTiles - minTiles);

		return data;
	},
	update:function(){
		if(this.currentPlatform.length && this.currentPlatform.children[this.currentPlatform.length -1].right < this.game.width){
			this.createPlatform();
		}
	}
}