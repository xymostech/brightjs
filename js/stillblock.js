Bright.stillblock = (function() {

var stillblock = ABXY.entity2d.Extend({
    Init: function(name, x, y, sprites, offset) {
        this._super(name, x, y);
        this.AddType("stillblock");

        this.sprites = sprites;

        this.offset = ABXY.util.defarg(offset, 0);
    },

    SetSprite: function(sprite) {
        this.offset = sprite;
    },

    Draw: function(context) {
        context.save();

        this.Transform(context);

        this.sprites.Draw(context, this.offset);

        context.restore();
    },
});

return stillblock;

})();
