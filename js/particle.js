Bright.particle = (function() {

var particle = ABXY.entity2d.Extend({
    Init: function(name, sprites, sprite, time, x, y, xvel, yvel, gravity) {
        this._super(name, x, y, xvel, yvel);

        this.sprites = sprites;
        this.sprite = sprite;

        this.time = time;

        this.gravity = ABXY.util.defarg(gravity, 0);

        this.count = 0;
    },

    Update: function() {
        this.vel.y += this.gravity / 60.0;

        this._super();

        this.count++;
        if (this.count > this.time) {
            this.world.RemoveEntity(this);
        }
    },

    Draw: function(context) {
        context.save();

        this.Transform(context);

        this.sprites.Draw(context, this.sprite);

        context.restore();
    },
});

return particle;

})();
