var Bright = (function() {

var Bright = {
    dependencies: {
        "mainstage": [],
        "door": [],
        "stillblock": [],
        "spikes": ["stillblock"],
        "block": ["stillblock"],
        "button": ["stillblock"],
        "deco": ["stillblock"],
        "animateblock": [],
        "greenman": ["animateblock"],
        "forceblock": ["animateblock"],
        "beam": ["animateblock"],
        "smoke": ["animateblock"],
        "generator": ["animateblock"],
        "key": ["animateblock"],
        "impact": ["animateblock"],
        "particle": [],
        "blood": ["particle"],
    },

    MainLoop: function(game) {
        game.Update();
        game.Draw();

        var that = this;
        game.Sleep(function() { that.MainLoop(game); });
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

        var main_stage = new Bright.mainstage("stage");

        game.SetStage(main_stage);

        this.MainLoop(game);
    },
};

return Bright;

})();
