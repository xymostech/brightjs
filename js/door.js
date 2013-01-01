Bright.door = (function() {

var door = ABXY.entity2d.Extend({
    Init: function(x, y, locked) {
        this._super("door", x, y);

        this.sprites = new ABXY.spritesheet2d("img/sheet_door.png", 4, 1, 20, 20);

        this.closed = locked;
        this.locked = locked;
        this.delay = 0;
    },

    ReceiveMessage: function(from, id, message) {
        if (id == "open") {
            if (!this.locked) {
                this.closed = false;
            }
        }
    },

    Update: function(time) {
        this._super(time);

        if (!this.closed) {
            this.delay += time;
            if (this.delay > 30) {
                this.closed = true;
                this.delay = 0;
            }
        }
    },

    Draw: function(context) {
        context.save();

        this.Transform(context);

        var sprite = this.locked ? 1 : (this.closed ? 0 : 2);
        this.sprites.Draw(context, sprite);

        context.restore();
    },
});

return door;

})();
