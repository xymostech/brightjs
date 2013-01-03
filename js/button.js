Bright.button = (function() {

var button = Bright.stillblock.Extend({
    Init: function(x, y, channel, initial_enabled) {
        var sprites = new ABXY.spritesheet2d("img/sheet_buttons.png", 4, 2, 20, 20);

        this._super("button", x, y, sprites);
        this.AddType("button");

        this.initial_enabled = initial_enabled;

        this.channel = channel;

        if (this.channel === "blue") {
            this.sprite_offset = 0;
        } else if (this.channel === "pink") {
            this.sprite_offset = 1;
        } else if (this.channel === "green") {
            this.sprite_offset = 2;
        } else if (this.channel === "orange") {
            this.sprite_offset = 3;
        }

        this.SetEnabled(this.initial_enabled);
    },

    SetEnabled: function(enabled) {
        this.enabled = enabled;

        if (this.enabled) {
            this.SetSprite(0 + this.sprite_offset);
        } else {
            this.SetSprite(4 + this.sprite_offset);
        }
    },

    ReceiveMessage: function(from, id, message) {
        if (id === "toggle") {
            this.SetEnabled(!this.enabled);
        } else if (id === "reset") {
            this.SetEnabled(this.initial_enabled);
        }
    },

    Interact: function(from) {
        this.SendMessage("../forceblock", "toggle", this.channel);
        this.SendMessage("../generator", "toggle", this.channel);

        this.SetEnabled(!this.enabled);
    },

    GetEnabled: function() { return this.enabled; },
});

return button;

})();
