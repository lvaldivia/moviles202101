Button = function(game,x,y,element){
	Phaser.Button.call(this,game,x,y,element.btnAsset,this.clickButton);
	this.game = game;
	this.element = element;
	this.selected = false;
	this.createElement = new Phaser.Signal();
}

Button.prototype = Object.create(Phaser.Button.prototype);
Button.prototype.constructor = Button;

Button.prototype.clickButton = function(){
	//console.log("clickButton desde el Button");
	this.selected = true;
	this.alpha = 0.8;
	this.createElement.dispatch(this.element);
}

Button.prototype.unselected  = function(){
	console.log("unselected");
	this.selected = false;
	this.alpha = 1;
}
