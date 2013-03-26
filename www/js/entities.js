var PlayerEntity = me.ObjectEntity.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(3, 3);
        this.updateColRect(4, 24, 4, 24);
        this.gravity = 0;

        this.addAnimation("walk_down", [0, 1, 2]);        
        this.addAnimation("walk_right", [3, 4, 5]);
        this.addAnimation("walk_left", [6, 7, 8]);
        this.addAnimation("walk_up", [9, 10, 11]);        
        this.setCurrentAnimation("walk_down");
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },

    update: function () {

        if (me.input.isKeyPressed('insert')) {
            
        }

        if (me.input.isKeyPressed('left')) {
            this.doWalk(true);
            this.setCurrentAnimation("walk_left");
        } else if (me.input.isKeyPressed('right')) {            
            this.doWalk(false);
            this.setCurrentAnimation("walk_left");
        } else {
            this.vel.x = 0;
        }

        if (me.input.isKeyPressed('up')) {
            this.vel.y -= this.accel.y * me.timer.tick;
            this.setCurrentAnimation("walk_up");
        } else if (me.input.isKeyPressed('down')) {
            this.vel.y += this.accel.y * me.timer.tick;
            this.setCurrentAnimation("walk_down");
        } else {
            this.vel.y = 0;
        }

        if (me.input.isKeyPressed('space')) {            
            me.game.HUD.updateItemValue("score", 250);
            //me.entityPool.add("bomb", BombEntity);
        }
       
        if (me.input.isKeyPressed('esc')) {
            me.state.change(me.state.MENU);
        }

        this.updateMovement();

        var res = me.game.collide(this);

        if (this.vel.x != 0 || this.vel.y != 0) {
            this.parent(this);
            return true;
        }

        return false;
    }

});

var BombEntity = me.ObjectEntity.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        
    },

    update: function () {
        if (!this.visible)
            return false;
    }

});

var CoinEntity = me.CollectableEntity.extend( {

    init: function(x,y, settings) {
        this.parent(x,y,settings);
    },

    onCollision: function () {
        me.audio.play("cling");
        me.game.HUD.updateItemValue("score", 250);
        this.collidable = false;
        me.game.remove(this);
    }
});
