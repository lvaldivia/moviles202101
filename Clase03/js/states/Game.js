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
		this.fires = this.game.add.group();
		this.fires.enableBody = true;
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
		levelData.fireData.forEach(function(element){
			console.log(element);
			this.fires.create(element.x,element.y,'fire_spritesheet');
		},this);
		this.platforms.setAll("body.allowGravity",false);
		this.platforms.setAll("body.immovable",true);
		this.createPlayer();
		this.elapsed = 0;
		this.barrelFrequency = levelData.barrelFrequency * 1000;
		this.barrelSpeed = levelData.barrelSpeed;
		this.barrels = this.game.add.group();
		this.goalPosition = levelData.goal;
		this.gorila = this.game.add.sprite(this.goalPosition.x,this.goalPosition.y,'gorilla');
	},
	createPlayer:function(){
		this.player = this.game.add.sprite(levelData.playerStart.x,levelData.playerStart.y,'player');
		this.player.anchor.setTo(0.5);
		this.game.physics.arcade.enable(this.player);
		this.player.animations.add("walking",[0,1,2,1],10,true);
		this.keys = this.game.input.keyboard.createCursorKeys();
		this.player.body.collideWorldBounds = true;
	},
	
	update:function(){
		this.elapsed += this.game.time.elapsed;
		if(this.player.alive){
			if(this.elapsed >= this.barrelFrequency){
				this.elapsed = 0;
				this.generateBarrel();
			}	
		}
		
		this.barrels.forEachAlive(function(element){
			if(element.y>=600){
				element.kill();
			}
		},this);
		
		this.game.physics.arcade.collide(this.player,ground);
		this.game.physics.arcade.collide(this.fires,this.platforms);
		this.game.physics.arcade.collide(this.player,this.platforms);
		this.game.physics.arcade.collide(this.barrels,this.platforms);
		//this.game.physics.arcade.overlap(this.player,this.fires);
		this.game.physics.arcade.overlap(this.player,this.barrels,this.collisionBarrel,null,this);

		this.player.body.velocity.x = 0;
		if(this.keys.up.isDown && this.player.body.touching.down){
			this.player.body.velocity.y= -700;
		}
		if(this.keys.left.isDown){
			this.player.body.velocity.x = -100;
			this.player.animations.play("walking");
			this.player.scale.setTo(1);
		}
		else if(this.keys.right.isDown){
			this.player.body.velocity.x = 100;
			this.player.animations.play("walking");
			this.player.scale.setTo(-1,1);
		}else{
			this.player.animations.stop();
			this.player.frame = 3;
		}
	},
	collisionBarrel(sprite1,sprite2){
		sprite1.kill();
		this.barrels.callAll("kill");
		/*this.barrels.forEachAlive(function(element){
			element.kill();
		},this);*/
	},
	generateBarrel(){
		let barrel = this.barrels.getFirstDead();
		if(barrel){
			barrel.reset();
		}else{
			barrel = this.game.add.sprite(0,0,'barrel');
			this.barrels.add(barrel);
		}
		barrel.x = this.goalPosition.x;
		barrel.y = this.goalPosition.y;
		this.game.physics.arcade.enable(barrel);
		barrel.body.collideWorldBounds = true;
		barrel.body.velocity.x = this.barrelSpeed;
		barrel.body.bounce.set(1,0.5);
	}
}