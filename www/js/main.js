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
    src: "img/titlescreen.png"
}, {
    name: "cling",
    type: "audio",
    src: "res/sounds/",
    channel: 2
}];

/*, {
    name: "runtothehills",
    type: "audio",
    src: "Assets/",
    channel: 2
}, {
    name: "toxicity",
    type: "audio",
    src: "Assets/",
    channel: 2
}*/
var mapObj = new Object();

var jsApp = {
    onload: function () {
							
		if ($(window).width() > 1279 ) {
			mapObj.blockSize = 64;
		} else if ($(window).width() > 640) {
			mapObj.blockSize = 48;
		} else {
			mapObj.blockSize = 32;
		}
		mapObj.blockSize = 48;
		
		$('div.debug').html(mapObj.blockSize);
	    
        if (!me.video.init('jsApp', 20 * mapObj.blockSize, 
        		15 * mapObj.blockSize, false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }

        //me.video.scale(me.video.getScreenFrameBuffer(), 1.5); 
        
        me.audio.init("mp3,ogg");

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
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.SPACE, "space");
        me.input.bindKey(me.input.KEY.ESC, "esc");
        me.debug.renderHitBox = true;
        //me.debug.renderCollisionMap = true;
        me.debug.displayFPS = true;          

        me.state.change(me.state.MENU);

    }
};

window.onReady(function () {
    jsApp.onload();
});

