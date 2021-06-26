Preload = function(game){}


Preload.prototype = {
	preload:function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.load.image("platform","assets/images/platform.png");
		this.game.load.image("goal","assets/images/goal.png");
		this.game.load.image("slime","assets/images/slime.png");
		this.game.load.image("arrowButton","assets/images/arrowButton.png");
		this.game.load.image("actionButton","assets/images/actionButton.png");
		this.game.load.spritesheet("player","assets/images/player_spritesheet.png",28,30,5)
		this.game.load.spritesheet("fly","assets/images/fly_spritesheet.png",35,18,2);

		this.game.load.image("gamesTiles","assets/images/tiles_spritesheet.png");
		this.game.load.tilemap("level1","assets/levels/level1.json",null,Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap("level2","assets/levels/level2.json",null,Phaser.Tilemap.TILED_JSON);

	},
	create:function(){
		this.game.state.start("Game");
	}
}