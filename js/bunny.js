Bright.bunny = (function() {

var bunny = ABXY.entity2d.Extend({
    Init: function(x, y) {
        this._super("bunny", x, y);

        this.sprites = new ABXY.spritesheet2d("img/sheet_bunny.png", 4, 6, 20, 20);

        this.settings = {
            gravity: 4,
            jump_height: 110,
            hit_x: 15,
            hit_y: 20,
            horiz_speed: 60,
        };

        this.on_ground = false;
        this.faceleft = false;
        this.walking = false;
        this.crouching = false;
        this.alive = true;
        this.usebutton = false;
        this.usebutton_cooldown = false;

        this.delay = 0;
        this.subimage = 1;
    },

    Die: function() {
        this.alive = false;
        this.on_ground = false;
        this.delay = 0;

        this.vel.x = 0;
        this.vel.y = 0.5;
    },

    Respawn: function() {
        var did_respawn = false;
        _.each(this.GetParentWorld().FilterEntities("door"), function(door) {
            if (!did_respawn) {
                this.GetParentWorld().AddEntity(new Bright.smoke(this.pos.x, this.pos.y));
                this.vel.x = 0;
                this.vel.y = 0;
                this.pos = door.pos.Add(new ABXY.vector2d(0, 0.1));
                this.alive = true;

                this.SendMessage("../forceblock", "reset");
                this.SendMessage("../generator", "reset");
                this.SendMessage("../button", "reset");
                this.SendMessage("../door", "open");

                did_respawn = true;
            }
        }, this);
    },

    Update: function(time, keys) {
        var old_pos = new ABXY.vector2d(this.pos.x, this.pos.y);

        if (this.alive) {
            if (keys.IsKeyPressed('A')) {
                this.pos.x -= time * this.settings.horiz_speed;
                this.faceleft = true;
                this.walking = true;
            } else if (keys.IsKeyPressed('D')) {
                this.pos.x += time * this.settings.horiz_speed;
                this.faceleft = false;
                this.walking = true;
            } else {
                this.walking = false;
            }

            if (keys.IsKeyPressed('W') && this.on_ground) {
                this.vel.y -= this.settings.jump_height;
                this.GetParentWorld().AddEntity(new Bright.smoke(this.pos.x, this.pos.y));
            }

            if (keys.IsKeyPressed('S') && this.on_ground) {
                if (!this.usebutton_cooldown) {
                    this.usebutton = true;
                    this.usebutton_cooldown = true;
                } else {
                    this.usebutton = false;
                }
                this.crouching = true;
            } else {
                this.crouching = false;
                this.usebutton = false;
                this.usebutton_cooldown = false;
            }

            _.each(this.GetParentWorld().FilterEntities("beam"), function(target) {
                if (this.pos.y - this.settings.hit_y < target.pos.y &&
                    this.pos.y + this.settings.hit_y > target.pos.y &&
                    this.pos.x - this.settings.hit_x < target.pos.x &&
                    this.pos.x + this.settings.hit_x > target.pos.x) {
                    this.Die();
                    this.GetParentWorld().AddEntity(new Bright.smoke(this.pos.x, this.pos.y));
                }
            }, this);

            _.each(this.GetParentWorld().FilterEntities("spikes"), function(target) {
                if (this.pos.y - 1 < target.pos.y &&
                    this.pos.y + 1 > target.pos.y &&
                    this.pos.x - this.settings.hit_x < target.pos.x &&
                    this.pos.x + this.settings.hit_x > target.pos.x)
                {
                    this.Die();
                    _.times(5, function() {
                        this.GetParentWorld().AddEntity(new Bright.blood(this.pos.x, this.pos.y));
                    }, this);
                    this.GetParentWorld().AddEntity(new Bright.impact(this.pos.x, this.pos.y));
                }
            }, this);

            _.each(this.GetParentWorld().FilterEntities("button"), function(target) {
                if (this.pos.y - this.settings.hit_y < target.pos.y &&
                    this.pos.y + this.settings.hit_y > target.pos.y &&
                    this.pos.x - this.settings.hit_x < target.pos.x &&
                    this.pos.x + this.settings.hit_x > target.pos.x &&
                    this.usebutton)
                {
                    this.SendMessage("../forceblock", "toggle");
                    this.SendMessage("../generator", "toggle");
                    this.SendMessage("../button", "toggle");
                }
            }, this);

            if (this.pos.y > 600) {
                this.Die();
            }

            this.delay = (this.delay + time * 60) % 20;
        } else {
            this.delay = (this.delay + time * 60) % 60;

            if (this.delay < time * 60) {
                this.Respawn();
            }
        }

        this.vel.y += this.settings.gravity;
        var old_on_ground = this.on_ground;
        this.on_ground = false;

        this._super(time, keys);

        _.each(
            this.GetParentWorld().FilterEntities(
                ["block", "forceblock", "generator", "caster"]
            ),
            function(block) {
                if (block.IsType("forceblock") && !block.IsEnabled()) {
                    return;
                }

                if (this.pos.y - this.settings.hit_y + 1 < block.pos.y &&
                    this.pos.y + this.settings.hit_y > block.pos.y &&
                    this.pos.x + this.settings.hit_x > block.pos.x &&
                    this.pos.x - this.settings.hit_x < block.pos.x)
                {
                    var old_top = old_pos.y - this.settings.hit_y + 1 < block.pos.y;
                    var old_bot = old_pos.y + this.settings.hit_y > block.pos.y;
                    var old_vert = old_top && old_bot;

                    var old_left = old_pos.x + this.settings.hit_x > block.pos.x;
                    var old_right = old_pos.x - this.settings.hit_x < block.pos.x;
                    var old_horiz = old_left && old_right;

                    if ((!old_horiz && old_vert) ||
                        (!old_horiz && !old_vert && !old_on_ground)) {
                        if (!old_right) {
                            this.pos.x = block.pos.x + this.settings.hit_x;
                        } else {
                            this.pos.x = block.pos.x - this.settings.hit_x;
                        }
                    } else {
                        this.vel.x = 0;
                        this.vel.y = 0;
                        this.on_ground = !old_bot || old_on_ground;
                        if (!old_top) {
                            this.pos.y = block.pos.y + this.settings.hit_y - 1;
                        } else {
                            this.pos.y = block.pos.y - this.settings.hit_y;
                        }
                    }
                }
            },
            this
        );
    },

    Draw: function(context) {
        context.save();

        this.Transform(context);

        var sprite;

        if (this.alive) {
            if (this.on_ground) {
                if (this.walking) {
                    sprite = 1 + Math.floor(this.delay / 5);
                } else if (this.crouching) {
                    sprite = 8;
                } else {
                    sprite = 0;
                }
            } else {
                if (this.vel.y < 0) {
                    sprite = 4;
                } else {
                    sprite = 5;
                }
            }
        } else {
            if (this.on_ground) {
                sprite = 7;
            } else {
                sprite = 6;
            }
        }

        if (this.faceleft) {
            sprite += 12;
        }

        this.sprites.Draw(context, sprite);

        context.restore();
    },
});

return bunny;

})();
