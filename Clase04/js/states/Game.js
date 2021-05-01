Game = function(game){}

Game.prototype = {
	create:function(){
		this.gravity = 500;
		this.flapForce = -400;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');
		this.background.autoScroll(-100,0);
		this.player = this.game.add.sprite(0,0,'player');
		this.player.anchor.setTo(0.5);
		this.player.x = this.game.world.centerX;
		this.player.y = this.game.world.centerY;
		//this.player.scale.setTo(3);
		this.player.animations.add("fly",[0,1,2],10,true);
		this.player.frame = 1;
		
		this.game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = this.gravity;
		this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.spaceBar.onDown.add(this.flap,this);
		this.game.input.onDown.add(this.flap,this);

		this.score = 0;
		this.scoreText = this.game.add.text(100,50,'Score :'+this.score);
		this.scoreText.fill = "#FFFFFF";

		this.maxScore = this.game.add.text(this.game.width-250,50,'Max Score');
		this.maxScore.fill = "#FFFFFF";

		this.gameOver = this.game.add.text(this.game.world.centerX,this.game.world.centerY,'Game Over');;
		this.gameOver.fill = "#FFFFFF";
		this.gameOver.inputEnabled = true;
		this.gameOver.events.onInputDown.add(this.restartGame,this);
		this.gameOver.anchor.setTo(0.5);
		//this.gameOver.alpha = 0;
		this.gameOver.visible = false;
		this.walls = this.game.add.group();
		this.spawnWall = 0;
	},

	restartGame:function(){
		if(!this.gameOver.visible){
			return;
		}
		this.game.state.start("Game");
	},

	flap:function(){
		this.player.animations.play("fly");
		this.player.body.velocity.y = this.flapForce;
	},
	
	update:function(){
		if(!this.player.alive){
			return;
		}
		this.spawnWall += this.game.time.elapsed;
		if(this.spawnWall >=3000){
			this.spawnWall = 0;
			this.createWalls();
		}
		this.game.physics.arcade.overlap(this.player,this.walls,this.collision,null,this);
		this.walls.forEachAlive(function(element){
			if(element.x < -element.width){
				element.kill();
			}
			if(this.player.x > element.x && !element.scored){
				element.scored = true;
				this.score += 0.5;
				this.scoreText.text = "Score : "+this.score;
			}
		},this);
	},
	collision:function(sprite1,sprite2){
		sprite1.kill();
		this.walls.callAll("kill");
		this.gameOver.visible = true;
	},

	createWalls:function(){
		let wallY = this.game.rnd.integerInRange(this.game.height*0.3,this.game.height*0.7);
		this.generateWall(wallY,false);
		this.generateWall(wallY,true);
	},
	generateWall:function(wallY,flipped){
		let posY = 0;
		let opening = 400;
		if(flipped){
			wallY = wallY - (opening/2);
		}else{
			wallY = wallY + (opening/2);
		}
		let wall = this.walls.getFirstDead();
		if(wall){
			wall.reset(this.game.width,wallY);
		}else{
			wall = this.game.add.sprite(this.game.width,wallY,'wall');
		}
		//wall.anchor.setTo(0.5);
		wall.scored = false;
		this.game.physics.arcade.enable(wall);
		wall.body.velocity.x = -200;
		wall.body.immovable = true;
		wall.body.allowGravity = false;
		this.walls.add(wall);
		wall.scale.y = flipped ? - 1 : 1;
	}
}