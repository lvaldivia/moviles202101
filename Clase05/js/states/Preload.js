Preload = function(game){}


Preload.prototype = {
	preload:function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;

		this.game.load.image("background","assets/images/background.png");
		this.game.load.image("button_chilli","assets/images/button_chilli.png");
		this.game.load.image("button_plan","assets/images/button_plan.png");
		this.game.load.image("button_sunflower","assets/images/button_sunflower.png");
		this.game.load.image("blood","assets/images/blood.png");
		this.game.load.image("chilli","assets/images/chilli.png");
		this.game.load.image("sunflower","assets/images/sunflower.png");
		this.game.load.image("dead_zombie","assets/images/dead_zombie.png");
		this.game.load.spritesheet("chicken_sheet","assets/images/chicken_sheet.png",25,25,3);
		this.game.load.spritesheet("zombie_sheet","assets/images/zombie_sheet.png",31,50,3);
		this.game.load.spritesheet("plant_sheet","assets/images/plant_sheet.png",25,40,3);
		this.game.load.spritesheet("sun_sheet","assets/images/sun_sheet.png",30,30,3);

	},
	create:function(){
		this.game.state.start("Game");
	}
}