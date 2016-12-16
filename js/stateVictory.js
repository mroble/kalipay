var StateVictory = {

    preload: function () {
        
    },

    create: function () {
        this.buttonPlayAgain = game.add.button(game.world.centerX, game.world.centerY + 100, "buttons", this.replay, this, 0, 1, 0);
        this.buttonPlayAgain.anchor.set(0.5, 0.5);
        
         //dragon
        this.dragon = game.add.sprite(game.world.centerX, game.world.centerY, "dragon");
        this.dragon.anchor.set(0.5,0.5);
        this.dragon.animations.add('fly', [0, 1, 2, 3], 12, true);
        this.dragon.animations.play('fly');
        this.dragon.scale.x=-1;
        game.stage.backgroundColor="#45B5AA";
        
    this.titleText = game.add.text(game.world.centerX, 60, "You Win!", {
            font: "50px Architects Daughter"
            , fill: "#ffcc00"
            , stroke: "#800000"
            , strokeThickness: 4
            , align: "center"
        });
        this.titleText.anchor.set(0.5, 0.5);
    }


    , replay: function () {
        game.state.start("StateMain");
    }
    , update: function () {

    }

}