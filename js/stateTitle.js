var StateTitle = {

    preload: function () {

    },

    create: function () {

        var title = this.add.image(0, 0, "title");
        title.x = this.world.centerX;
        title.y = this.world.centerY;
        title.anchor.set(0.5, 0.5);


        this.buttonStart = game.add.button(game.world.centerX - 20, game.world.centerY + 155, "buttons", this.startGame, this, 6, 7, 6);
        this.buttonStart.anchor.set(0.5, 0.5);


    }

    , startGame: function () {
        game.state.start("StateMain");
    }

    , update: function () {

    }

}