Bright.animateblock = (function() {

var animateblock = ABXY.entity2d.Extend({
    Init: function(name, x, y, sprites, offset, number, speed) {
        this._super(name, x, y);

        this.sprites = sprites;

        this.offset = ABXY.util.defarg(offset, 0);
        this.number = ABXY.util.defarg(number, 1);
        this.speed = ABXY.util.defarg(speed, 1);

        this.delay = 0;
    },

    SetAnimation: function(offset, number, speed) {
        this.offset = offset;
        this.number = number;
        this.speed = speed;

        this.delay = 0;
    },

    Update: function() {
        this.delay = (this.delay + 1) % (this.speed * this.number);

        if (this.delay == 0 && this.OnAnimateEnd) { this.OnAnimateEnd(); }

        this._super();
    },

    Draw: function(context) {
        context.save();

        this.Transform(context);

        this.sprites.Draw(context, this.offset + Math.floor(this.delay / this.speed));

        context.restore();
    },
});

return animateblock;

})();
