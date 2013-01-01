Bright.deco = (function() {

var deco = Bright.stillblock.Extend({
    Init: function(x, y, type) {
        var sprites = new ABXY.spritesheet2d("img/sheet_deco.png", 4, 4, 20, 20);

        var sprite;
        if (type == "chain") {
            sprite = 0;
        }

        this._super("deco", x, y, sprites, sprite);
        this.AddType("deco");
    },
});

return deco;

})();
