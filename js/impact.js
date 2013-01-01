Bright.impact = (function() {

var impact = Bright.animateblock.Extend({
    Init: function(x, y) {
        var sprites = new ABXY.spritesheet2d("img/sheet_particles.png", 5, 6, 20, 20);

        this._super("impact", x, y, sprites, 0, 3, 3);
        this.AddType("impact");
    },

    OnAnimateEnd: function() {
        this.world.RemoveEntity(this);
    },
});

return impact;

})();
