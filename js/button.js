Bright.button = (function() {

var button = Bright.stillblock.Extend({
    Init: function(x, y, initial_enabled) {
        var sprites = new ABXY.spritesheet2d("img/sheet_buttons.png", 4, 2, 20, 20);

        this._super("button", x, y, sprites);

        this.initial_enabled = initial_enabled;

        this.SetEnabled(this.initial_enabled);
    },

    SetEnabled: function(enabled) {
        this.enabled = enabled;

        if (this.enabled) {
            this.SetSprite(0);
        } else {
            this.SetSprite(4);
        }
    },

    ReceiveMessage: function(from, id, message) {
        if (id == "toggle") {
            this.SetEnabled(!this.enabled);
        } else {
            this.SetEnabled(this.initial_enabled);
        }
    },

    GetEnabled: function() { return this.enabled; },
});

return button;

})();
