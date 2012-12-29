Bright.mainstage = (function() {

var mainstage = ABXY.worldstage2d.Extend({
    Init: function() {
        this._super("mainstage");
    },

    OnLoad: function(game) {
        this._super(game);

        this.world.AddEntity(new Bright.block(0, 20, "wood"));
        this.world.AddEntity(new Bright.forceblock(20, 20, true));
        this.world.AddEntity(new Bright.door(40, 20, false));
        this.world.AddEntity(new Bright.beam(60, 20));
        this.world.AddEntity(new Bright.greenman(80, 20));
        this.world.AddEntity(new Bright.smoke(100, 20));
        this.world.AddEntity(new Bright.spikes(120, 20, "left"));
        this.world.AddEntity(new Bright.generator(140, 20, "right", true));
        this.world.AddEntity(new Bright.key(160, 20));
        this.world.AddEntity(new Bright.button(180, 20, true));
        this.world.AddEntity(new Bright.impact(200, 20));
        this.world.AddEntity(new Bright.deco(220, 20));
        this.world.AddEntity(new Bright.blood(240, 20));
        this.world.AddEntity(new Bright.blood(240, 20));
        this.world.AddEntity(new Bright.blood(240, 20));
        this.world.AddEntity(new Bright.blood(240, 20));
    },
});

return mainstage;

})();
