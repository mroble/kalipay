var game;
var score;
var soundOn = true;
var musicOn = true;

var useLandscape = true;


window.onload = function () {
    if (screen.width > 1500) {
        //desktop laptop
        if (useLandscape == true) {
            game = new Phaser.Game(800, 600, Phaser.AUTO, "ph_game");
        } else {

            game = new Phaser.Game(600, 800, Phaser.AUTO, "ph_game");
        }

    } else {
        //mobile device
        game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "ph_game");
    }
    if (screen.width < 1500) {
        if (useLandscape == true) {
            wrongTag = "wrongWayLandscape";
        } else {
            wrongTag = "wrongWayPortrait";
        }
    }

    //add a state or screen to the game
    game.state.add("StateMain", StateMain);
    game.state.add("StateTitle", StateTitle);
    //game.state.add("StateOver", StateOver);
    game.state.add("StateInit", StateInit);
    game.state.add("StateLoad", StateLoad);
    //game.state.add("StateInstructions", StateInstructions);
    game.state.add("StateVictory", StateVictory);
    game.state.start("StateInit");
}