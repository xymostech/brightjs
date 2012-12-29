var Bright = (function() {

var Bright = {
    dependencies: {
    },

    MainLoop: function(game) {
        game.Update();
        game.Draw();

        setTimeout(this.MainLoop.bind(this, game), 1000.0 / 60.0);
    },

    Startup: function() {
        ABXY.loader.LoadDependencies("js", this.dependencies, this.OnLoad.bind(this));
    },

    OnLoad: function() {
        var canvas = $("#canvas")[0];
        var game = new ABXY.game("game", canvas, {
            width: 800,
            height: 600,
        });

        this.MainLoop(game);
    },
};

return Bright;

})();
