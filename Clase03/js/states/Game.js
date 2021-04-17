Game = function(game){}


Game.prototype = {
	create:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 1000;
		ground = this.game.add.sprite(0,0,'ground');
		ground.y = this.game.height - ground.height;
		this.game.physics.arcade.enable(ground);
		ground.body.allowGravity = false;
		ground.body.immovable = true;
		this.platforms = this.game.add.group();
		this.platforms.enableBody = true;
		levelData = JSON.parse(this.game.cache.getText("level"));
		levelData.platformData.forEach(function(element){
			//primera forma
			/*let platform = this.game.add.sprite(element.x,element.y,'platform');
			//this.platforms.push(platform);
			this.platforms.add(platform);*/
			//segunda forma
			this.platforms.create(element.x,element.y,'platform');
			//tercera form
			/*let platform = new Phaser.Sprite(this,element.x,element.y,"platform");
			this.platforms.add(platform);*/
		},this);
		this.platforms.setAll("body.allowGravity",false);
		this.platforms.setAll("body.immovable",true);
		this.createPlayer();
	},
	createPlayer:function(){
		this.player = this.game.add.sprite(levelData.playerStart.x,levelData.playerStart.y,'player');
		this.player.anchor.setTo(0.5);
		this.game.physics.arcade.enable(this.player);
		this.player.animations.add("walking",[0,1,2,1],10,true);
		this.keys = this.game.input.keyboard.createCursorKeys();
		this.player.body.collideWorldBounds = true;
	},
	render:function(){
		this.game.debug.body(this.player);
	},
	update:function(){
		this.game.physics.arcade.collide(this.player,ground);
		this.game.physics.arcade.collide(this.player,this.platforms);
		this.player.body.velocity.x = 0;
		if(this.keys.up.isDown && this.player.body.touching.down){
			//console.log("debo saltar");
			this.player.body.velocity.y= -700;
		}
		if(this.keys.left.isDown){
			this.player.body.velocity.x = -100;
			this.player.animations.play("walking");
			this.player.scale.setTo(1);
			//console.log("debo ir izquierda");
		}
		else if(this.keys.right.isDown){
			this.player.body.velocity.x = 100;
			this.player.animations.play("walking");
			this.player.scale.setTo(-1,1);
			//console.log("debo ir derecha");
		}else{
			this.player.animations.stop();
			this.player.frame = 3;
		}
	}
}