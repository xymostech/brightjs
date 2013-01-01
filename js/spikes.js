Bright.spikes = (function() {

var spikes = Bright.stillblock.Extend({
    Init: function(x, y, variety) {
        var variety;
        if (variety == "up") {
            variety = 0;
        } else if (variety == "down") {
            variety = 3;
        } else if (variety == "left") {
            variety = 1;
        } else if (variety == "right") {
            variety = 2;
        }
        var sprites = new ABXY.spritesheet2d("img/sheet_spikes.png", 4, 1, 20, 20);

        this._super("spikes", x, y, sprites, variety);
        this.AddType("spikes");
    },
});

return spikes;

})();
