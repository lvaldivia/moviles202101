Game = function(game){}

Game.prototype = {
	create:function(){
		this.background = this.game.add.sprite(0,0,'background');
		this.createLand();
	},
	createLand:function(){
		this.patches = this.game.add.group();
		let rectangle = this.game.add.bitmapData(40,50);
		rectangle.ctx.fillStyle = "#000";
		rectangle.ctx.fillRect(0,0,40,50);

		let j, patch, alpha, 
			dark = false;

		for(let i=0;i < 10;i++){
			for(j=0;j<5;j++){
				//crear los patches
				patch = this.game.add.sprite(0,0,rectangle);
				this.patches.add(patch);
				patch.x = 64+i*40;
				patch.y = 24+j*50;
				patch.alpha = dark ? 0.5 : 0.1;
				dark = !dark;
			}
		}

	}
}