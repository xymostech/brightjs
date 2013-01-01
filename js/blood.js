Bright.blood = (function() {

var blood = Bright.particle.Extend({
    Init: function(x, y) {
        var sprites = new ABXY.spritesheet2d("img/sheet_particles.png", 5, 6, 20, 20);
        this._super(
            "blood", sprites, 25, 0.5, x, y,
            ABXY.util.random(-40, 40), ABXY.util.random(-40, 40), 90
        );
        this.AddType("blood");
    },
});

return blood;

})();
