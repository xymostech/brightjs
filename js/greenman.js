Bright.greenman = (function() {

var greenman = Bright.animateblock.Extend({
    Init: function(x, y) {
        var sprites = new ABXY.spritesheet2d("img/sheet_npcs.png", 4, 3, 20, 20);
        this._super("greenman", x, y, sprites, 2, 2, 10);
    },
});

return greenman;

})();
