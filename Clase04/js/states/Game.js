Game = function(game){}


Game.prototype = {
	create:function(){
		this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');
		this.background.autoScroll(-100,0);
		this.player = this.game.add.sprite(0,0,'player');
		this.player.anchor.setTo(0.5);
		this.player.x = this.game.world.centerX;
		this.player.y = this.game.world.centerY;
		this.player.scale.setTo(3);
		this.player.animations.add("fly",[0,1,2],10,true);
		this.player.animations.play("fly");

		this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.spaceBar.onDown.add(this.flap,this);
	},

	flap:function(){
		console.log("presione espaciadora :v");
	},
	
	update:function(){
		
	},
}