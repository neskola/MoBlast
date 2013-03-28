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

        me.game.addHUD(0, 430, 640, 60);

        me.game.HUD.addItem("score", new ScoreObject(620, 20));

        me.game.sort();

        me.input.bindKey(me.input.KEY.ESC, "esc", true);
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.SPACE);
        me.input.bindTouch(me.input.KEY.SPACE);

        //me.audio.playTrack("runtothehills");

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
        this.scrollerfont = null;
        this.scrollertween = null;

        this.scroller = "ARROW KEYS TO MOVE, SPACE TO PLACE A BOMB (NOT FUNCTIONAL YET), ESC BACK TO MENU...";
        this.scrollerpos = 600;
        
    },

    onResetEvent: function () {
        if (this.title == null) {
            this.title = me.loader.getImage("title_screen");
            this.font = new me.BitmapFont("32x32_font", 32);
            this.font.set("center");

            this.scrollerfont = new me.BitmapFont("32x32_font", 32);
            this.scrollerfont.set("left");

        }

        this.scrollerpos = 640;

        this.scrollertween = new me.Tween(this).to({
            scrollerpos: -3200
        }, 10000).onComplete(this.scrollover.bind(this)).start();        

        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);
        me.input.bindTouch(me.input.KEY.ENTER);

        //me.audio.playTrack("toxicity");
    },

    scrollover: function () {
        this.scrollerpos = 640;
        this.scrollertween.to({
            scrollerpos: -3200
        }, 10000).onComplete(this.scrollover.bind(this)).start();

    },


    update: function () {

        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
        }

        var touchInputs = me.input.touches;
        if (touchInputs != null && touchInputs[0] != null && touchInputs[1] != null) {
            me.state.change(me.state.PLAY);
        }
    },

    draw: function (context) {
        context.drawImage(this.title, 0, 0);
        this.font.draw(context, "MOBLAST", 320, 160);        
        this.font.draw(context, "PRESS ENTER TO PLAY ", 320, 280);
        this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
        $('#debug-text').html("touch enabled: " + me.sys.touch + " touches: " + me.sys.touches);
        
    
    },

    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindMouse(me.input.mouse.LEFT);
        me.input.unbindTouch();

        me.audio.stopTrack();

        this.scrollertween.stop();
    }

});

