Preload = function(game){}


Preload.prototype = {
	preload:function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;

		this.game.load.image("background","assets/images/background-texture.png");
		this.game.load.image("wall","assets/images/wall.png");
		this.game.load.spritesheet("player","assets/images/player.png",48,48,4);
	},
	create:function(){
		this.game.state.start("Game");
	}
}