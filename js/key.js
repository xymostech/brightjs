Bright.key = (function() {

var key = Bright.animateblock.Extend({
    Init: function(x, y) {
        var sprites = new ABXY.spritesheet2d("img/sheet_pickups.png", 5, 3, 20, 20);

        this._super("key", x, y, sprites, 5, 5, 5);
        this.AddType("key");
    },
});

return key;

})();
