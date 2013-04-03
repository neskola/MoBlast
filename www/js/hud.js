var ScoreObject = me.HUD_Item.extend({
    init: function (x, y) {
        this.parent(x, y);
        this.font = new me.BitmapFont("32x32_font", 32);
    },

    draw: function (context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
});

var PlayScreen = me.ScreenObject.extend({
    onResetEvent: function () {
        me.levelDirector.loadLevel("introduction_map");

        me.game.HUD.addItem("score", new ScoreObject(GAME_GLOBALS.getMapWidth() - GAME_GLOBALS.getBlockSize(),
            GAME_GLOBALS.getMapHeight() - GAME_GLOBALS.getBlockSize()));

        me.game.sort();

        me.input.bindKey(me.input.KEY.ESC, "esc", true);
        me.input.bindKey(me.input.KEY.SPACE, "space", true);
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.SPACE);
        me.input.bindTouch(me.input.KEY.SPACE);        

        me.audio.playTrack("level1");

    },

    update: function () {        
    },

    onDestroyEvent: function () {
        me.game.disableHUD();

        me.audio.stopTrack();
    }
});

var TitleScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);

        this.title = null;
        this.font = null;
        this.debugFont = null;
        this.scrollerfont = null;
        this.scrollertween = null;

        this.scroller = "ARROW KEYS TO MOVE, SPACE TO PLACE A BOMB (NOT FUNCTIONAL YET), ESC BACK TO MENU...";
        if (me.sys.touch) {
            this.scroller = "TAP MAP TO MOVE, TAP AVATAR TO PLACE A BOMB (NOT FUNCTIONAL YET)...";
        }
        this.scrollerpos = 600;

        me.game.addHUD(0, 0,
            GAME_GLOBALS.getMapWidth(), GAME_GLOBALS.getMapHeight());
        
    },

    onResetEvent: function () {
        if (this.title == null) {
            this.title = me.loader.getImage("title_screen");
            this.font = new me.BitmapFont("32x32_font", 32);
            this.font.set("center");            

            this.scrollerfont = new me.BitmapFont("32x32_font", 32);
            this.scrollerfont.set("left");

        }

        this.scrollerpos = GAME_GLOBALS.getMapWidth();

        this.scrollertween = new me.Tween(this).to({
            scrollerpos: -3200
        }, 10000).onComplete(this.scrollover.bind(this)).start();        

        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        //me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);
        me.input.bindTouch(me.input.KEY.ENTER);

        me.audio.playTrack("title");
    },

    scrollover: function () {
        this.scrollerpos = GAME_GLOBALS.getMapWidth();
        this.scrollertween.to({
            scrollerpos: -3200
        }, 10000).onComplete(this.scrollover.bind(this)).start();

    },


    update: function () {

        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
        }
    },

    draw: function (context) {
        context.drawImage(this.title, 0, 0);
        this.font.draw(context, "MOBLAST", GAME_GLOBALS.getMapWidth() / 2, GAME_GLOBALS.getMapHeight() / 4);
        var toPlayText = "PRESS ENTER TO PLAY";
        if (me.sys.touch) {
            toPlayText = "TOUCH SCREEN TO PLAY";
        } 
        this.font.draw(context, toPlayText, GAME_GLOBALS.getMapWidth() / 2, GAME_GLOBALS.getMapHeight() /2);
        this.scrollerfont.draw(context, this.scroller, this.scrollerpos, GAME_GLOBALS.getMapHeight() - GAME_GLOBALS.getBlockSize());
        GAME_GLOBALS.debugToContext(context, "touch: " + (me.sys.touch) + " touches: " + me.input.touches.length + " " + 
            + me.input.touches[0].x + ", " + me.input.touches[0].y + ", " + me.input.touches[0].id);
    
    },

    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindMouse(me.input.mouse.LEFT);
        me.input.unbindTouch();

        me.audio.stopTrack();

        this.scrollertween.stop();
    }

});

