Preload = function(game){}


Preload.prototype = {
	preload:function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.load.image("background","assets/images/background.png");
		this.game.load.image("coin","assets/images/coin.png");
		this.game.load.image("floor","assets/images/floor.png");
		this.game.load.image("player_dead","assets/images/player_dead.png");
		this.game.load.spritesheet("player_spritesheet","assets/images/player_spritesheet.png",51,67,5,1,1);
		this.game.load.image("water","assets/images/water.png");
		this.game.load.audio("coin",['assets/audio/coin.mp3','assets/audio/coin.ogg']);
	},
	create:function(){
		this.game.state.start("Game",true,false,1,'ella no me ama :v',true);
	}
}