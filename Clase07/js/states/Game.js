Game = function(game){}

Game.prototype = {
	init:function(level){
		this.currentLevel = level || 'level1';
		this.RUNNING_SPEED = 180;
		this.JUMPING_SPEED = 500;
		this.BOUNCING_SPEED = 150;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 1000;
		this.cursors = this.game.input.keyboard.createCursorKeys();

	},
	create:function(){
		this.loadLevel();
	},
	loadLevel:function(){
		this.map = this.game.add.tilemap(this.currentLevel);
		this.map.addTilesetImage("tiles_spritesheet","gamesTiles");

		this.backgroundLayer = this.map.createLayer("backgroundLayer");
		this.collisionLayer = this.map.createLayer("collisionLayer");
		this.game.world.sendToBack(this.backgroundLayer);

		this.map.setCollisionBetween(1,160,true,'collisionLayer');
		this.collisionLayer.resizeWorld();

		let playerArr = this.findObjectsByType("player",this.map,'objectsLayer');
		this.player = this.game.add.sprite(playerArr[0].x,playerArr[0].y,'player');
		this.game.physics.arcade.enable(this.player);
		this.player.animations.add('walking',[0,1,2,1],6,true);
		this.player.body.collideWorldBounds = true;
		this.player.anchor.setTo(0.5);
		this.enemies = this.game.add.group();
		this.createEnemies();

	},
	createEnemies:function(){
		let enemyArr = this.findObjectsByType("enemy",this.map,'objectsLayer');
		let enemy = {};
		enemyArr.forEach(function(element){
			enemy = new Enemy(this.game,element.x,element.y,'slime',element.properties.velocity,this.map);
			this.enemies.add(enemy);
		},this)
	},
	findObjectsByType: function(targetType, tilemap, layer){
	    var result = [];
	    tilemap.objects[layer].forEach(function(element){
	      if(element.properties.type == targetType) {
	        element.y -= tilemap.tileHeight;        
	        result.push(element);
	      }
	    }, this);
	    
	    return result;
  },

 	update:function(){
 		this.game.physics.arcade.collide(this.player,this.collisionLayer);
 		this.game.physics.arcade.collide(this.enemies,this.collisionLayer);
 		this.game.physics.arcade.collide(this.player,this.enemies,this.hitEnemy,null,this);

 		this.player.body.velocity.x = 0;
 		if(this.cursors.left.isDown){
 			this.player.body.velocity.x = -this.RUNNING_SPEED;
 			this.player.scale.setTo(1,1);
 			this.player.play("walking");
 		}else if(this.cursors.right.isDown){
 			this.player.body.velocity.x = this.RUNNING_SPEED;
 			this.player.scale.setTo(-1,1);
 			this.player.play("walking");
 		}else{
 			this.player.animations.stop();
 			this.player.frame = 3;
 		}
 		if(this.cursors.up.isDown && (this.player.body.touching.down || this.player.body.blocked.down)){
 			this.player.body.velocity.y = -this.JUMPING_SPEED;
 		}
 	},
 	hitEnemy:function(player,enemy){
 		if(enemy.body.touching.up){
 			enemy.kill();
 			player.body.velocity.y = -this.BOUNCING_SPEED;
 		}else{
 			this.gameOver();
 		}
 	},
 	gameOver:function(){
 		this.game.state.start("Game",true,false,this.currentLevel);
 	}
}