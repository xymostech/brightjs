Bright.forceblock = (function() {

var forceblock = Bright.animateblock.Extend({
    Init: function(x, y, initial_enabled) {
        var sprites = new ABXY.spritesheet2d("img/sheet_forceblock.png", 4, 3, 20, 20);

        this._super("forceblock", x, y, sprites);

        this.initial_enabled = initial_enabled;

        this.SetEnabled(this.initial_enabled);
    },

    SetEnabled: function(enabled) {
        this.enabled = enabled;
        this.lap = false;
        if (this.enabled) {
            this.SetAnimation(8, 3, 5);
        } else {
            this.SetAnimation(4, 3, 5);
        }
    },

    OnAnimateEnd: function() {
        if (!this.lap) {
            this.lap = true;
            if (this.enabled) {
                this.SetAnimation(0, 3, 5);
            } else {
                this.SetAnimation(-1, 1, 30);
            }
        }
    },

    ReceiveMessage: function(from, id, message) {
        if (id == "toggle") {
            this.SetEnabled(!this.enabled);
        } else if (id == "reset") {
            this.SetEnabled(this.initial_enabled);
        }
    },

    IsEnabled: function() { return this.enabled; },
});

return forceblock;

})();
