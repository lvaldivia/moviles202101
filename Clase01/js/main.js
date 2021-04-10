window.onload = function(){
	let game = new Phaser.Game(640,360,Phaser.AUTO,"game_container",{
		create  : creation,
		preload : loadAssets,
		//update  : loop
	});
	let background, arrow, direction = "", is_moving = false,
			animals = ["sheep","horse","pig","chicken"], current_animal = {};

	function loadAssets(){
		//console.log("preload");
		game.load.image("background","assets/background.png");
		game.load.image("arrow","assets/arrow.png");
		game.load.spritesheet("chicken","assets/chicken_spritesheet.png",131,200,3);
		game.load.spritesheet("horse","assets/horse_spritesheet.png",212,200,3);
		game.load.spritesheet("pig","assets/pig_spritesheet.png",297,200,3);
		game.load.spritesheet("sheep","assets/sheep_spritesheet.png",244,200,3);
	}
	//arrow.scale.setTo(1.5);
	//arrow.alpha = 0.8;
	//arrow.y = game.height *0.5;
	//arrow.angle = 90;
	//background.anchor.setTo(0.5,0.5)

	function creation(){
		background = game.add.sprite(0,0,"background");	
		left = game.add.sprite(0,0,"arrow");	
		left.anchor.setTo(0.5);
		left.direction = "left";
		left.x = left.width / 2;
		left.y = game.world.centerY;
		left.scale.setTo(-1,1);
		left.inputEnabled = true;
		left.events.onInputDown.add(clickArrow);
		right = game.add.sprite(0,0,"arrow");	
		right.anchor.setTo(0.5);
		right.x = game.width  -  (right.width/2);
		right.direction = "right";
		right.y = game.world.centerY;
		right.inputEnabled = true;
		right.events.onInputDown.add(clickArrow);
		index = game.rnd.integerInRange(0,animals.length-1);
		current_animal = game.add.sprite(0,0,animals[index]);
		current_animal.anchor.setTo(0.5);
		current_animal.x = game.world.centerX;
		current_animal.y = game.world.centerY;
		current_animal.animations.add('animate',[0,1,2,1,0,1],3,true);
		current_animal.animations.play("animate");
	}

	function clickArrow(sprite){
		if(is_moving){
			return;
		}
		sprite.alpha = 0.8;
		is_moving = true;
		direction = sprite.direction;
		if(sprite.direction == "left"){
			index = index ==0 ? animals.length-1 : index - 1;
		}else{
			index = index == animals.length-1 ? 0 : index + 1;
		}
		generateAnimal(sprite.direction);
	}


	function generateAnimal(direction){
		new_animal = game.add.sprite(0,game.world.centerY,animals[index]);
		new_animal.x = direction == "left" ? game.width + new_animal.width  : -new_animal.width;
		new_animal.anchor.setTo(0.5);
		new_animal.y = game.world.centerY;
		if(direction == "left"){
			let tween_current_animal = game.add.tween(current_animal).to({
				x: -current_animal.width
			},1000);
			tween_current_animal.start();
		}else{
			let tween_current_animal = game.add.tween(current_animal).to({
				x: current_animal.width + game.width
			},1000);
			tween_current_animal.start();
		}
		let tween_new_animal = game.add.tween(new_animal).to({
			x: game.world.centerX
		},1000);
		tween_new_animal.start();
		tween_new_animal.onComplete.add(setNewAnimal);
	}

	function setNewAnimal(){
		if(direction == "left"){
			left.alpha = 1;	
		}else{
			right.alpha = 1;	
		}
		is_moving=false;
		current_animal.destroy();
		current_animal = new_animal;
		current_animal.animations.add('animate',[0,1,2,1,0,1],3,true);
		current_animal.animations.play("animate");
	}
}