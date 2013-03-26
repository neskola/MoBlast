var PlayerEntity = me.ObjectEntity.extend({
    
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(3, 3);
        this.updateColRect(4, 24, 4, 24);
        this.gravity = 0;
    
        this.direction = null;

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
            this.direction = 4;
        } else if (me.input.isKeyPressed('right')) {
            this.direction = 2;
        } /*else {
            this.vel.x = 0;
        }*/

        if (me.input.isKeyPressed('up')) {
            this.direction = 1;
        } else if (me.input.isKeyPressed('down')) {
            this.direction = 3;
        } /*else {
            this.vel.y = 0;
        }*/

        if (me.input.isKeyPressed('space')) {
            var touchInputs = me.input.touches;
            var mousePos = me.input.mouse.pos;
            if (touchInputs != null && touchInputs[0] != null && touchInputs[1] != null) {
                console.assert("touch " + touchInputs[0] + "," + touchInputs[1]);
                me.game.HUD.updateItemValue("score", 2000);
            } else if (mousePos != null) {
                var a = this.pos.x;
                var b = this.pos.y;
                var c = mousePos.x;
                var d = mousePos.y;
                var x = c - a;
                var y = d - b;
                var theta = Math.atan2(-y, x);
                if (theta < 0)
                    theta += 2 * Math.PI;
                var absoluteAngle = (theta * 180) / Math.PI;

                var angle = Math.round(absoluteAngle);
                
                if (angle >= 45 && angle < 135) {
                    this.direction = 1;
                } else if (angle >= 135 && angle < 225) {
                    this.direction = 4;
                } else if (angle >= 225 && angle < 315) {
                    this.direction = 3;
                } else {
                    this.direction = 2;
                }

                $('#debug-text').html("mouse x: " + mousePos.x + ", y:" + mousePos.y + "; player x: " + this.pos.x + ", y:" + this.pos.y + ", angle:" + angle + ", direction:" + this.direction);
            } else {
                $('#debug-text').html("me x: " + this.x + ", y:" + this.y);           
            }
            
            //me.entityPool.add("bomb", BombEntity);
        }
       
        if (me.input.isKeyPressed('esc')) {
            me.state.change(me.state.MENU);
        }
        this.checkDirection();
        this.updateMovement();

        var res = me.game.collide(this);

        if (this.vel.x != 0 || this.vel.y != 0) {
            this.parent(this);
            return true;
        }                

        return false;
    },

    checkDirection: function () {
        
        if (this.direction == 1) {
            this.vel.y -= this.accel.y * me.timer.tick;
            this.vel.x = 0;
            this.setCurrentAnimation("walk_up");
        } else if (this.direction == 2) {
            this.doWalk(false);
            this.vel.y = 0;
            this.setCurrentAnimation("walk_left");
        } else if (this.direction == 3) {
            this.vel.y += this.accel.y * me.timer.tick;
            this.vel.x = 0;
            this.setCurrentAnimation("walk_down");
        } else if (this.direction == 4) {
            this.doWalk(true);
            this.vel.y = 0;
            this.setCurrentAnimation("walk_left");
        } else {
            this.vel.y = 0;
            this.vel.x = 0;
        }
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
