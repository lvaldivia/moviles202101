Game = function(game){}

Game.prototype = {
	create:function(){
		this.background = this.game.add.sprite(0,0,'background');
		this.currentLevel = 1;
		this.createLand();
		this.bullets = this.game.add.group();
		this.plants = this.game.add.group();
		this.zombies = this.game.add.group();
		this.suns = this.game.add.group();
		this.numSums = 100;
		this.hitSound = this.game.add.audio("hit");
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.sunElapsed = 0;
		this.sunFrequency = 5;
		this.sunVelocity = 50;
		this.zombieYPosition = [49,99,149,199,249];
		this.totalSunElapsed = this.sunFrequency * 1000;
		this.currentSelection = null;
		this.createGui();
		this.loadLevel();
	},
	loadLevel:function(){
		this.startGameElapsed = 0;
		this.levelName = "level"+this.currentLevel;
		this.levelData = JSON.parse(this.game.cache.getText(this.levelName));
		this.zombieElapsed = 0;
		this.currentZombie = 0;
		this.zombies = this.game.add.group();
		this.zombieData = this.levelData.zombies;
		this.totalZombies = this.zombieData.length - 1;
		this.zombieTotalTime = this.zombieData[this.currentZombie].time * 1000;
	},
	update:function(){
		this.startGameElapsed+=this.game.time.elapsed;
		this.sunElapsed += this.game.time.elapsed;
		if(this.sunElapsed >= this.totalSunElapsed){
			this.sunElapsed = 0;
			this.generateSun();
		}
		if(this.startGameElapsed>=20000){
			this.zombieElapsed+=this.game.time.elapsed;
			if(this.zombieElapsed>=this.zombieTotalTime){
				this.zombieElapsed = 0;
				this.generateZombie(this.zombieData[this.currentZombie]);
				this.currentZombie++;
				if(this.totalZombies<=this.currentZombie){
					this.currentZombie = 0;
				}
				this.zombieTotalTime = this.zombieData[this.currentZombie].time * 1000;
			}
			this.zombies.forEachAlive(function(zombie){
				if(zombie.x < 50){
					zombie.kill();
				}
			},this);

			this.game.physics.arcade.overlap(this.zombies,this.bullets,null,this.damageZombie,this);	
		}
		
	},
	damageZombie:function(zombie,bullet){
		bullet.kill();
		zombie.damage(2);
	},
	generateZombie:function(zombieData){
		let posY = this.game.rnd.integerInRange(0,this.zombieYPosition.length-1);
		let zombie = this.zombies.getFirstDead();
		if(zombie){
			zombie.reset(this.game.width - 50,this.zombieYPosition[posY],zombieData);
		}else{
			zombie = new Zombie(this.game,this.game.width - 50,this.zombieYPosition[posY],zombieData);
		}
		this.zombies.add(zombie);
	},
	generateSun:function(posX,posY){
		let newSun = this.suns.getFirstDead();
		let x =  posX ? posX : this.game.rnd.integerInRange(40,420);
		let y = posY ? posY : -20;
		let velocity = posX ? -this.sunVelocity : this.sunVelocity;
		//if(!newSun){
			newSun = new Sun(this.game,x,y,velocity);
			this.suns.add(newSun);
			newSun.increaseSun.add(this.updatePoints,this);
		//}
	},
	updatePoints:function(points){
		this.numSums+=points;
		this.updateStats();
	},
	createGui:function(){
		let sun = this.game.add.sprite(10,this.game.height - 20 ,'sun');
		sun.anchor.setTo(0.5);
		sun.scale.setTo(0.5);
		this.buttonData = 	JSON.parse(this.game.cache.getText("buttons"));
		this.buttons = this.game.add.group();
		let button;
		this.buttonData.forEach(function(element,index){
			button = new Button(this.game,80+index*40,this.game.height -35,element);
			this.buttons.add(button);
			button.createElement.add(this.clickedButton,this);
			
		},this);
		let style = {
			fill : "#fff",
			font : "14px Arial"
		};
		this.sunLabel = this.game.add.text(22,this.game.height-28,"",style);
		this.updateStats();
	},
	clickedButton:function(element){
		//console.log(element);
		this.currentSelection = element;
		//this.buttons.callAll("unselected");
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
				patch.inputEnabled = true;
				patch.events.onInputDown.add(this.putPlan,this);
				this.patches.add(patch);
				patch.x = 64+i*40;
				patch.y = 24+j*50;
				patch.alpha = dark ? 0.5 : 0.1;
				dark = !dark;
			}
		}

	},
	putPlan:function(sprite){
		if(this.currentSelection && this.currentSelection.cost <= this.numSums){
			let plant = new Plant(this.game,sprite.x + (sprite.width/2),sprite.y+(sprite.height/2),this.currentSelection);
			this.plants.add(plant);
			plant.createSun.add(this.generateSun,this);
			plant.createBullet.add(this.createBullet,this);
			this.numSums-= this.currentSelection.cost;
			this.updateStats();
			this.clearSelection();
		}
	},
	createBullet:function(posX,posY){
		let bullet = new Bullet(this.game,posX,posY);
		this.bullets.add(bullet);
		this.hitSound.play();
	},
	clearSelection:function(){
		this.currentSelection = null;
		this.buttons.forEach(function(element){
			element.unselected();
		},this);
	},
	updateStats:function(){
		this.sunLabel.text = this.numSums;
	}
}