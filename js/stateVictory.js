var StateVictory = {

    preload: function () {
        game.load.image("DidIt", "images/ui/kalDidIt.png");
    },

    create: function () {
        //make nicer buttons for this play again
        this.buttonStart = game.add.button(game.world.centerX, game.world.centerY + 100, "buttons", this.startGame, this, 6, 7, 6);
        this.buttonStart.anchor.set(0.5, 0.5);

        var victory = this.add.image(game.world.centerX, game.world.centerY, "DidIt");


        //gamay
        //this.gamay = game.add.sprite(game.world.centerX, game.world.centerY, "gamay");
        //this.gamay.anchor.set(0.5, 0.5);
        //this.gamay.animations.add('fly', [0, 1, 2, 3], 12, true);
        //this.gamay.animations.play('fly');
        //game.stage.backgroundColor = "#26C9FF";

        //this.inText = game.add.text(game.world.centerX,30,"You did it!");
        //this.inText.fill="#000000";
        //this.inText.anchor.set(0.5, 0.5);

         //audio
         //record a happy message later
        //this.burp = game.add.audio("burp");
        //this.instructions = game.add.audio("instructions");
       // this.instructions.play();
        //this.instructions.volume = .75;
        //this.instructions.loop = false;
    }

    , startGame: function () {
        game.state.start("StateMain");
    }

    , update: function () {

    }
       // this.titleText.anchor.set(0.5, 0.5);

}



