var StateTitle = {

    preload: function () {

    },

    create: function () {

        this.title=game.add.sprite(game.world.centerX - 215, game.world.centerY - 200,"title");
        this.buttonStart = game.add.button(game.world.centerX, game.world.centerY + 115, "buttons", this.startGame, this, 6, 7, 6);
        this.buttonStart.anchor.set(0.5, 0.5);


    }

    , startGame: function () {
        game.state.start("StateInstructions");
    }
    , update: function () {

    },




    startGame: function () {
        game.state.start("StateInstructions");
    }
    , update: function () {

    }

}