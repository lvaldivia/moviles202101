window.onload = function(){
	let game = new Phaser.Game(360,640,Phaser.AUTO,"",{
		create  : create,
		preload : preload,
		update  : update
	});

	let options = [], option_selected = "", option_clone, pet, is_moving = false;

	function preload(){
		game.load.image("backyard","assets/backyard.png");
		game.load.image("apple","assets/apple.png");
		game.load.image("arrow","assets/arrow.png");
		game.load.image("bar","assets/bar.png");
		game.load.image("logo","assets/logo.png");
		game.load.spritesheet("pet","assets/pet.png",97,83,5);
		game.load.image("rotate","assets/rotate.png");
		game.load.image("rubber_duck","assets/rubber_duck.png");
		game.load.image("candy","assets/candy.png");
	}

	function create(){
		let backyard = game.add.sprite(0,0,'backyard');
		backyard.inputEnabled = true;
		backyard.events.onInputDown.add(clickBackyard);
		pet = game.add.sprite(0,0,'pet');
		pet.anchor.setTo(0.5);
		pet.x = game.world.centerX;
		pet.y = game.world.centerY;
		pet.animations.add("idle",[0,1,2],2);
		

		let keys = ["candy","rotate","rubber_duck"];
		for(let i=0;i<keys.length ;i++){
			option = game.add.sprite(0,0,keys[i]);
			option.anchor.setTo(0.5);
			option.x = ((option.width*2) * i)+80;
			option.y = pet.y + (option.height*2);
			option.inputEnabled = true;
			/*option.events.onInputDown.add(function(){

			});*/
			option.events.onInputDown.add(clickOption);
			options.push(option);
		}
		/*keys.forEach(function(element,index){
			option = game.add.sprite(0,0,element);
			option.anchor.setTo(0.5);
			option.x = ((option.width*2) * index)+80;
			option.y = pet.y + (option.height*2);
			options.push(pet);
			option.inputEnabled = true;
			option.events.onInputDown.add(clickOption);
		});*/
	}

	function clickBackyard(sprite,event){
		if(option_selected == ""){
			return;
		}
		is_moving = true;
		
		option_clone = game.add.sprite(event.position.x,event.position.y,option_selected);
		option_clone.anchor.setTo(0.5);
		option_selected = "";
		pet.bringToTop();
		let tween = game.add.tween(pet).to({
			x: option_clone.x,
			y: option_clone.y
		},1000);
		tween.onComplete.add(destroyClone);
		tween.start();
	}

	function destroyClone(){
		is_moving = false;
		pet.animations.play("idle");
		option_clone.destroy();
		option_clone = null;
	}

	function clickOption(sprite){
		if(is_moving){
			return;
		}
		if(sprite.alpha != 1){
			return;
		}
		options.forEach(function(element){
			element.alpha = element.alpha != 1 ? 1 : element.alpha;
		});
		option_selected = sprite.key;
		sprite.alpha = 0.8;
	}

	function update(){

	}
	
}