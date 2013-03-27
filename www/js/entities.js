var UP    = 1;
var RIGHT = 2;
var DOWN  = 3;
var LEFT = 4;

var BLOCK_SIZE = 48;

var PlayerEntity = me.ObjectEntity.extend({
    
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(3, 3);
        this.updateColRect(0, BLOCK_SIZE - 2, 0, BLOCK_SIZE -2);
        this.gravity = 0;
    
        this.direction = null;
        this.nextDirection = null;

        this.addAnimation("walk_down", [0, 1, 2]);        
        this.addAnimation("walk_right", [3, 4, 5]);
        this.addAnimation("walk_left", [6, 7, 8]);
        this.addAnimation("walk_up", [9, 10, 11]);        
        this.setCurrentAnimation("walk_down");
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        
    },

    update: function () {

        if (me.input.isKeyPressed('left')) {
            this.nextDirection = LEFT;
        } else if (me.input.isKeyPressed('right')) {
            this.nextDirection = RIGHT;
        } 
        if (me.input.isKeyPressed('up')) {
            this.nextDirection = UP;
        } else if (me.input.isKeyPressed('down')) {
            this.nextDirection = DOWN;
        } 

        if (me.input.isKeyPressed('space')) {
            var touchInputs = me.input.touches;
            var mousePos = me.input.mouse.pos;
            if (touchInputs != null && touchInputs[0] != null && touchInputs[1] != null) {
                /*console.assert("touch " + touchInputs[0] + "," + touchInputs[1]);
                me.game.HUD.updateItemValue("score", 2000);*/
            } else if (mousePos != null &&
                !this.checkMouseOnPlayer(mousePos.x, mousePos.y)) {
                var angle = this.calculateAngle(this.pos.x + (BLOCK_SIZE / 2), this.pos.y + (BLOCK_SIZE / 2), mousePos.x, mousePos.y);
                this.nextDirection = this.checkDirection(angle);

                $('#debug-text').html("mouse x: " + mousePos.x + ", y:" + mousePos.y + "; player x: "
                    + this.pos.x + ", y:" + this.pos.y + ", angle:" + angle + ", direction:"
                    + this.direction + ", nextDirection: " + this.nextDirection);
            } else {
                this.nextDirection = this.direction;
                $('#debug-text').html("set a bomb on x: " + this.x + ", y:" + this.y);           
            }
            
            //me.entityPool.add("bomb", BombEntity);
        }
       
        if (me.input.isKeyPressed('esc')) {
            me.state.change(me.state.MENU);
        }
        this.checkMovement();
        
        var res = me.game.collide(this);

        if (this.vel.x != 0 || this.vel.y != 0) {
            this.parent(this);
            return true;
        }                

        return false;
    },
    
    calculateAngle: function (originX, originY, targetX, targetY) {
        var x = targetX - originX;
        var y = targetY - originY;
        var theta = Math.atan2(-y, x);
        if (theta < 0)
            theta += 2 * Math.PI;
        var absoluteAngle = (theta * 180) / Math.PI;

        var angle = Math.round(absoluteAngle);
        return angle;
    },

    checkMouseOnPlayer: function (mouseX, mouseY) {
        if ((mouseX >= this.pos.x && mouseX <= this.pos.x + BLOCK_SIZE) &&
            (mouseY >= this.pos.y && mouseY <= this.pos.y + BLOCK_SIZE)) {
            return true;
        } else {
            return false;
        }
    },

    checkDirection: function (angle) {
        var direction;
        if (angle >= 45 && angle < 135) {
            direction = UP;
        } else if (angle >= 135 && angle < 225) {
            direction = LEFT;
        } else if (angle >= 225 && angle < 315) {
            direction = DOWN;
        } else {
            direction = RIGHT;
        }
        return direction;
    },

    checkMovement: function () {
        if (this.nextDirection != this.direction) {
            if (this.nextDirection == UP || this.nextDirection == DOWN
                && (this.pos.x % BLOCK_SIZE) == 0) {
                this.direction = this.nextDirection;
            }
            if (this.nextDirection == LEFT || this.nextDirection == RIGHT
                && (this.pos.y % BLOCK_SIZE) == 0) {
                this.direction = this.nextDirection;
            }
        }

        switch (this.direction) {
            case UP:
                this.vel.y -= this.accel.y * me.timer.tick;
                this.vel.x = 0;
                this.setCurrentAnimation("walk_up");
                break;
            case RIGHT:
                this.doWalk(false);
                this.vel.y = 0;
                this.setCurrentAnimation("walk_left");
                break;
            case DOWN:
                this.vel.y += this.accel.y * me.timer.tick;
                this.vel.x = 0;
                this.setCurrentAnimation("walk_down");
                break;
            case LEFT:
                this.doWalk(true);
                this.vel.y = 0;
                this.setCurrentAnimation("walk_left");
                break;
            default:
                this.vel.y = 0;
                this.vel.x = 0;
        }

        if (this.pos.x % BLOCK_SIZE <= 2) {
            this.pos.x = Math.floor(this.pos.x / BLOCK_SIZE) * BLOCK_SIZE;
        }

        if (this.pos.y % BLOCK_SIZE <= 2) {
            this.pos.y = Math.floor(this.pos.y / BLOCK_SIZE) * BLOCK_SIZE;
        }

        this.updateMovement();
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
