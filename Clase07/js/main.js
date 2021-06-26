window.onload = function(){
	let game = new Phaser.Game(700,350,Phaser.AUTO);
	game.state.add("Preload",Preload);
	game.state.add("Game",Game);
	game.state.start("Preload");
}