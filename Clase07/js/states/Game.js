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
		this.player.anchor.setTo(0.5);

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
}