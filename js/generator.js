Bright.generator = (function() {

var generator = Bright.animateblock.Extend({
    Init: function(x, y, facing, initial_enabled) {
        if (facing == "up") {
            this.main_offset = 0;
        } else if (facing == "left") {
            this.main_offset = 6;
        } else if (facing == "right") {
            this.main_offset = 12;
        } else if (facing == "down") {
            this.main_offset = 18;
        }

        var sprites = new ABXY.spritesheet2d("img/sheet_generator.png", 6, 4, 20, 20);

        this._super("generator", x, y, sprites);
        this.AddType("generator");

        this.initial_enabled = initial_enabled;
        this.SetEnabled(this.initial_enabled);
    },

    SetEnabled: function(enabled) {
        this.enabled = enabled;
        if (this.enabled) {
            this.SetAnimation(this.main_offset, 5, 6);
        } else {
            this.SetAnimation(this.main_offset + 5, 1, 30);
        }
    },

    ReceiveMessage: function(from, id, message) {
        if (id == "toggle") {
            this.SetEnabled(!this.enabled);
        } else if (id == "reset") {
            this.SetEnabled(this.initial_enabled);
        }
    },
});

return generator;

})();
