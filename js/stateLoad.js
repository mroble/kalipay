var StateLoad = {

    preload: function () {

        var empty = game.add.image(0, 0, "loadingEmpty");
        var full = game.add.image(0, 0, "loadingFull");

        empty.x = game.world.centerX;
        empty.y = game.world.centerY;
        empty.anchor.set(0.5, 0.5);
        full.anchor.set(0, 0.5);
        full.x = game.world.centerX - empty.width / 2;
        full.y = empty.y;

        game.load.setPreloadSprite(full);

        //PRELOAD EVERYTHING HERE
        game.load.spritesheet("gamay", "images/main/Gamay_Sprite.png", 120, 85, 4);
        game.load.image("background", "images/main/background.png");
        game.load.image("title", "images/ui/Kalipay_GameTitle.png");
        game.load.image("kamatisToast", "images/main/kamatis.png");
        game.load.image("manggaToast", "images/main/mangga.png");
        game.load.image("petsayToast", "images/main/petsay.png");
        game.load.image("kalabasaToast", "images/main/kalabasa.png");
        game.load.spritesheet("veggie", "images/main/veggie.png", 52, 50, 4);
        game.load.image("balloon", "images/main/thought.png");
        game.load.spritesheet("soundButtons", "images/ui/soundButtons.png", 44, 44, 4);

        //change this song
        game.load.audio("backgroundMusic", "sounds/naturesounds.mp3");
        //game.load.audio("balanghoy", "sounds/food/balanghoy.wav");
        //game.load.audio("mangga", "sounds/food/mangga.wav");
        //game.load.audio("kamatis", "sounds/food/kamatis.wav");
        //game.load.audio("kalabasa", "sounds/food/kalabasa.wav");
        //game.load.audio("yummy", "sounds/food/yummy.wav");
        //game.load.audio("instructions", "sounds/gamay_instructions.wav");
        game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);

    },

    create: function () {
        game.state.start("StateTitle");
    },

    update: function () {

    }

}