var StateMain = {

    preload: function () {

        if (screen.width < 1500) {
            game.scale.forceOrientation(true, false);
        }

    },

    create: function () {

        //init vars
        score = 0;
        this.musicPlaying = false;
        this.lift=350;
        this.fall=500;
        this.delay=1;


        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor="#000000";

        this.top = 0;
        this.bottom = game.height - 120;

        //sounds

        this.backgroundMusic = game.add.audio("backgroundMusic");
        this.backgroundMusic.volume = .3;
        this.backgroundMusic.loop = true;

        //this.mangga = game.add.audio("mangga");
        //this.mangga.volume = .5;
        //this.backgroundMusic.loop = false;

        //this.kamatis = game.add.audio("kamatis");
        //this.kamatis.volume = .5;
        //this.backgroundMusic.loop = false;

        //this.balanghoy = game.add.audio("balanghoy");
        //this.balanghoy.volume = .5;
        //this.backgroundMusic.loop = false;

        //this.kalabasa = game.add.audio("kalabasa");
        //this.kalabasa.volume = .5;
        //this.backgroundMusic.loop = false;

        this.yummy = game.add.audio("yummy");
        this.yummy.volume = .5;
        this.yummy.loop = false;


        //gamay
        this.gamay = game.add.sprite(0, 0, "gamay");
        this.gamay.animations.add('fly', [0, 1, 2, 3], 12, true);
        this.gamay.animations.play('fly');

        //background
        this.background = game.add.tileSprite(0, game.height - 480, game.width, 480, 'background');

        //IPAD FIX
        if (screen.height > 764) {
            this.background.y = game.world.centerY - this.background.height / 2;
            this.top = this.background.y;
            this.bottom = this.background.y+360;
        }

        this.gamay.bringToTop();
        this.gamay.y = this.top;


        this.background.autoScroll(-100, 0);

        //veggies
        this.veggies = game.add.group();
        this.veggies.createMultiple(8, 'veggie');
        this.veggies.setAll('checkWorldBounds', true);
        this.veggies.setAll('outOfBoundsKill', true);

        //thought
        this.balloonGroup = game.add.group();
        this.balloon = game.add.sprite(0, 0, "balloon");
        this.think = game.add.sprite(36, 26, "veggie");
        this.balloonGroup.add(this.balloon);
        this.balloonGroup.add(this.think);
        this.balloonGroup.scale.x = .5;
        this.balloonGroup.scale.y = .5;
        this.balloonGroup.x = 50;

        //text
        this.scoreText = game.add.text(game.world.centerX, this.top+60, "0");
        this.scoreText.fill = "#000000";
        this.scoreText.fontSize = 64;
        this.scoreText.anchor.set(0.5, 0.5);

        this.scoreLabel = game.add.text(game.world.centerX, this.top+20, "SCORE");
        this.scoreLabel.fill = "#000000";
        this.scoreLabel.fontSize = 32;
        this.scoreLabel.anchor.set(0.5, 0.5);

        //sound buttons
        this.btnMusic = game.add.sprite(20, 20, "soundButtons");
        this.btnSound = game.add.sprite(70, 20, "soundButtons");
        this.btnMusic.frame = 2;

        game.physics.enable([this.gamay, this.veggies], Phaser.Physics.ARCADE);
        this.gamay.body.gravity.y = this.fall;
        this.gamay.body.immovable = true;

        this.setListeners();
        this.resetThink();
        this.updateButtons();
        this.updateMusic();
    }
    , setListeners: function () {
        if (screen.width < 1500) {
            game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
            game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
        }
        game.time.events.loop(Phaser.Timer.SECOND*this.delay, this.fireVeggie, this);
        this.btnSound.inputEnabled = true;
        this.btnSound.events.onInputDown.add(this.toggleSound, this);
        this.btnMusic.inputEnabled = true;
        this.btnMusic.events.onInputDown.add(this.toggleMusic, this);
    }
    , toggleSound: function () {
        soundOn = !soundOn;
        this.updateButtons();
    }
    , toggleMusic: function () {
        musicOn = !musicOn;
        this.updateButtons();
        this.updateMusic();
    }
    , updateMusic: function () {
        if (musicOn == true) {
            if (this.musicPlaying == false) {

                this.musicPlaying = true;
               this.backgroundMusic.play();
            }
        } else {
            this.musicPlaying = false;
            this.backgroundMusic.stop();
        }
    }
    , updateButtons: function () {
        if (soundOn == true) {
            this.btnSound.frame = 0;
        } else {
            this.btnSound.frame = 1;
        }
        if (musicOn == true) {
            this.btnMusic.frame = 2;
        } else {
            this.btnMusic.frame = 3;
        }
    }
    , fireVeggie: function () {
        var veggie = this.veggies.getFirstDead();
       var yy = game.rnd.integerInRange(this.top, this.bottom);
        var xx = game.width - 100;
        var type = game.rnd.integerInRange(0, 7);

       veggie.frame = type;
        veggie.reset(xx, yy);
        veggie.enabled = true;
        veggie.body.velocity.x = -200;
    }
    , wrongWay: function () {

        document.getElementById("wrongWay").style.display = "block";

    }
    , rightWay: function () {
        document.getElementById("wrongWay").style.display = "none";
    }
    , flap: function () {
        this.gamay.body.velocity.y = -this.lift;
    }

    , onEat: function (gamay, veggie) {
        if (this.think.frame == veggie.frame) {
            veggie.kill();
            this.resetThink();
            score++;
            this.scoreText.text = score;
            if(score === 5) {
                this.backgroundMusic.stop();
                game.state.start("StateVictory");
            }
            if (soundOn == true && veggie.frame == 0){
                this.yummy.play();
                this.manggaToast=game.add.sprite(game.world.centerX + 20,game.world.centerY - 100,"manggaToast");
                this.manggaToast.anchor.set(0.5,0.5);
                //this.manggaToast.alpha = 0;
                game.add.tween(this.manggaToast).to({y:0}),1500, Phaser.Easing.Linear.None,true;
                 game.add.tween(this.manggaToast).to({alpha:0}, 1500, Phaser.Easing.Linear.None,true);
            } else if (soundOn == false && veggie.frame == 0 ) {
                this.manggaToast=game.add.sprite(game.world.centerX + 20,game.world.centerY - 100,"manggaToast");
                this.manggaToast.anchor.set(0.5,0.5);
                //this.manggaToast.alpha = 0;
                game.add.tween(this.manggaToast).to({y:0}),1500, Phaser.Easing.Linear.None,true;
                game.add.tween(this.manggaToast).to({alpha:0}, 1500, Phaser.Easing.Linear.None,true);


            }
            if (soundOn == true && veggie.frame == 1){
                this.yummy.play();
                this.kamatisToast=game.add.sprite(game.world.centerX,game.world.centerY,"kamatisToast");
                this.kamatisToast.anchor.set(0.5,0.5);
                //this.kamatisToast.alpha = 0;
                //game.add.tween(this.kamatisToast).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
                game.add.tween(this.kamatisToast).to({y:0}),1500, Phaser.Easing.Linear.None,true;
                game.add.tween(this.kamatisToast).to({alpha:0}, 1500, Phaser.Easing.Linear.None,true);

            } else if (soundOn == false && veggie.frame == 1 ) {
                this.kamatisToast=game.add.sprite(game.world.centerX,game.world.centerY,"kamatisToast");
                this.kamatisToast.anchor.set(0.5,0.5);
                //this.manggaToast.alpha = 0;
                game.add.tween(this.kamatisToast).to({y:0}),1500, Phaser.Easing.Linear.None,true;
                game.add.tween(this.kamatisToast).to({alpha:0}, 1500, Phaser.Easing.Linear.None,true);

            }

            if (soundOn == true && veggie.frame == 2){
               this.yummy.play();
                this.petsayToast=game.add.sprite(game.world.centerX- 20 ,game.world.centerY + 100, "petsayToast");
                this.petsayToast.anchor.set(0.5,0.5);
                //this.balanghoyToast.alpha = 0;
                game.add.tween(this.petsayToast).to({y:0}),1500, Phaser.Easing.Linear.None,true;
                game.add.tween(this.petsayToast).to({alpha:0}, 1500, Phaser.Easing.Linear.None,true);

            } else if (soundOn == false && veggie.frame == 2 ) {
                this.petsayToast=game.add.sprite(game.world.centerX - 20,game.world.centerY + 100,"petsayToast");
                this.petsayToast.anchor.set(0.5,0.5);
                //this.manggaToast.alpha = 0;
                game.add.tween(this.petsayToast).to({y:0}),1500, Phaser.Easing.Linear.None,true;
                game.add.tween(this.petsayToast).to({alpha:0}, 1500, Phaser.Easing.Linear.None,true);

            }
            if (soundOn == true && veggie.frame == 3){
                this.yummy.play();
                this.kalabasaToast=game.add.sprite(game.world.centerX - 40,game.world.centerY - 45,"kalabasaToast");
                this.kalabasaToast.anchor.set(0.5,0.5);
                //this.kalabasaToast.alpha = 0;
                game.add.tween(this.kalabasaToast).to({y:0}),1500, Phaser.Easing.Linear.None,true;
                game.add.tween(this.kalabasaToast).to({alpha:0}, 1500, Phaser.Easing.Linear.None,true);

            } else if (soundOn == false && veggie.frame == 3 ) {
                this.kalabasaToast=game.add.sprite(game.world.centerX - 40,game.world.centerY - 45,"kalabasaToast");
                this.kalabasaToast.anchor.set(0.5,0.5);
                //this.manggaToast.alpha = 0;
                game.add.tween(this.kalabasaToast).to({y:0}),1500, Phaser.Easing.Linear.None,true;
                game.add.tween(this.kalabasaToast).to({alpha:0}, 1500, Phaser.Easing.Linear.None,true);

            }
        } else {
            //if (soundOn == true) {
              //this.yummy.play();
            //}
            veggie.kill();
            //this.backgroundMusic.stop();
            //game.state.start("StateOver");
        }
    }

    , resetThink: function () {
        var thinking = game.rnd.integerInRange(0, 8);
       this.think.frame = thinking;

    }
    , update: function () {
        game.physics.arcade.collide(this.gamay, this.veggies, null, this.onEat, this);

        this.balloonGroup.y = this.gamay.y - 60;

        if (game.input.activePointer.isDown) {
            this.flap();
        }
        if (this.gamay.y < this.top) {
            this.gamay.y = this.top;
            this.gamay.body.velocity.y = 0;
        }
        if (this.gamay.y > this.bottom) {
            this.gamay.y = this.bottom;
            this.gamay.body.gravity.y = 0;
        } else {
            this.gamay.body.gravity.y = 500;

        }
    }

}