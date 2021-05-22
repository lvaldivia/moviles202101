Preload = function(game){}


Preload.prototype = {
	preload:function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;

		this.game.load.image("background","assets/images/background.png");
		this.game.load.image("chilliButton","assets/images/button_chilli.png");
		this.game.load.image("plantButton","assets/images/button_plant.png");
		this.game.load.image("sunflowerButton","assets/images/button_sunflower.png");
		this.game.load.image("blood","assets/images/blood.png");
		this.game.load.image("chilli","assets/images/chilli.png");
		this.game.load.image("sunflower","assets/images/sunflower.png");
		this.game.load.image("dead_zombie","assets/images/dead_zombie.png");
		this.game.load.spritesheet("chicken","assets/images/chicken_sheet.png",25,25,3);
		this.game.load.spritesheet("zombie","assets/images/zombie_sheet.png",31,50,3);
		this.game.load.spritesheet("plant","assets/images/plant_sheet.png",25,40,3);
		this.game.load.spritesheet("sun","assets/images/sun_sheet.png",30,30,2);

		this.game.load.text("buttons","assets/data/buttons.json?v=1");
		this.game.load.text("level1","assets/data/level1.json");
		this.game.load.text("level2","assets/data/level2.json");

		this.game.load.audio("hit",["assets/audio/hit.mp3","assets/audio/hit.ogg"]);

	},
	create:function(){
		this.game.state.start("Game");
	}
}