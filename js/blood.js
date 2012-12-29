Bright.blood = (function() {

var blood = Bright.particle.Extend({
    Init: function(x, y) {
        var sprites = new ABXY.spritesheet2d("img/sheet_particles.png", 5, 6, 20, 20);
        this._super(
            "blood", sprites, 25, 30, x, y,
            ABXY.util.random(-0.5, 0.5), ABXY.util.random(-0.5, 0.5), 1.2
        );
    },
});

return blood;

})();
