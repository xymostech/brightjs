Bright.smoke = (function() {

var smoke = Bright.animateblock.Extend({
    Init: function(x, y) {
        var sprites = new ABXY.spritesheet2d("img/sheet_particles.png", 5, 6, 20, 20);
        this._super("smoke", x, y, sprites, 5, 5, 3);
    },

    OnAnimateEnd: function() {
        this.world.RemoveEntity(this);
    },
});

return smoke;

})();
