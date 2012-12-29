Bright.block = (function() {

var block = Bright.stillblock.Extend({
    Init: function(x, y, type) {
        var variety;
        if (type == "pink") {
            variety = 0;
        } else if (type == "wood") {
            variety = 2;
        }

        var sprites = new ABXY.spritesheet2d("img/sheet_blocks.png", 4, 1, 20, 20);
        this._super("block", x, y, sprites, variety);
    },
});

return block;

})();
