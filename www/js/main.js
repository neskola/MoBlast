// testausta
// lisää kommenttia
var GAME_GLOBALS = GAME_GLOBALS || {};

var GAME_GLOBALS = {    

    setBlockSize: function (value) {
        GAME_GLOBALS.blockSize = value;
    },

    getBlockSize: function () {
        return GAME_GLOBALS.blockSize;
    },

    getMapWidth: function () {
        return GAME_GLOBALS.getBlockSize() * 20;
    },

    getMapHeight: function () {
        return GAME_GLOBALS.getBlockSize() * 15;
    },

    getMapBlock: function (value) {
        return Math.floor(value / GAME_GLOBALS.getBlockSize());
    },

    debugToContext: function (context, text) {
        if (context != null) {
            var debugFont = new me.Font("Arial", 20, "white");
            debugFont.draw(context, text, 20, 20);
        }        
    },

    debug: function (text) {
        console.log(text);
    }
};



// load these from backend server
var g_resources = [{
    name: "tile48x48",
    type: "image",
    src: "res/maps/tile48x48.jpg"
}, {
    name: "introduction_map",
    type: "tmx",
    src: "res/maps/level1_48x48.tmx"    
}, {
    name: "player",
    type: "image",
    src: "res/avatars/player48x48.png"
}, {
    name: "explosion",
    type: "image",
    src: "img/explosion.png"
}, {
    name: "spinning_coin_gold",
    type: "image",
    src: "img/spinning_coin_gold.png"
}, {
    name: "32x32_font",
    type: "image",
    src: "img/32x32_font.png"
}, {
    name: "title_screen",
    type: "image",
    src: "img/titlescreen48x48.png"
}, {
    name: "cling",
    type: "audio",
    src: "res/sounds/",
    channel: 2
}, {
    name: "title",
    type: "audio",
    src: "res/music/",
    channel: 2
}, {
    name: "level1",
    type: "audio",
    src: "res/music/",
    channel: 2
}];

var jsApp = {
    onload: function () {
							
        GAME_GLOBALS.setBlockSize(48);
	    
        if (!me.video.init('#jsApp', GAME_GLOBALS.getMapWidth(),
        GAME_GLOBALS.getMapHeight(), false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }
        
        me.audio.init("mp3");

        me.loader.onload = this.loaded.bind(this);

        me.loader.preload(g_resources);

        me.state.change(me.state.LOADING);
    },

    loaded: function () {
        me.state.set(me.state.MENU, new TitleScreen());

        me.state.set(me.state.PLAY, new PlayScreen());

        me.entityPool.add("mainPlayer", PlayerEntity);
        //me.entityPool.add("bomb", BombEntity);
        me.entityPool.add("CoinEntity", CoinEntity);
        /*me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.SPACE, "space");
        me.input.bindKey(me.input.KEY.ESC, "esc");*/
        //me.debug.renderHitBox = true;
        //me.debug.renderCollisionMap = true;        

        me.state.change(me.state.MENU);

    }
};

window.onReady(function () {
    jsApp.onload();
});

