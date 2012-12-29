Bright.beam = (function() {

var beam = Bright.animateblock.Extend({
    Init: function(x, y) {
        var sprites = new ABXY.spritesheet2d("img/sheet_beam.png", 4, 1, 20, 20);
        this._super("beam", x, y, sprites, 0, 4, 5);
    },
});

return beam;

})();
