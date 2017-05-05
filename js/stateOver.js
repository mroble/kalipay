var StateOver = {

    preload: function () {

    },

    create: function () {
        this.buttonPlayAgain = game.add.button(game.world.centerX, game.world.centerY + 100, "buttons", this.replay, this, 0, 1, 0);
        this.buttonPlayAgain.anchor.set(0.5, 0.5);

         //gamay
        this.gamay = game.add.sprite(game.world.centerX, game.world.centerY, "gamay");
        this.gamay.anchor.set(0.5,0.5);
        this.gamay.animations.add('fly', [0, 1, 2, 3], 12, true);
        this.gamay.animations.play('fly');
        this.gamay.scale.x=-1;
        game.stage.backgroundColor="#45B5AA";

    }
    , replay: function () {
        game.state.start("StateMain");
    }
    , update: function () {

    }

}