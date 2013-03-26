// load these from backend server
var g_resources = [{
    name: "TileA4",
    type: "image",
    src: "Assets/TileA4.png"
}, {
    name: "introduction_map",
    type: "tmx",
    src: "Assets/introduction_map.tmx"
}, {
    name: "player",
    type: "image",
    src: "Assets/player.png"
}, {
    name: "explosion",
    type: "image",
    src: "Assets/explosion.png"
}, {
    name: "spinning_coin_gold",
    type: "image",
    src: "Assets/spinning_coin_gold.png"
}, {
    name: "32x32_font",
    type: "image",
    src: "Assets/32x32_font.png"
}, {
    name: "title_screen",
    type: "image",
    src: "Assets/titlescreen.png"
}, {
    name: "cling",
    type: "audio",
    src: "Assets/",
    channel: 2
}, {
    name: "runtothehills",
    type: "audio",
    src: "Assets/",
    channel: 2
}, {
    name: "toxicity",
    type: "audio",
    src: "Assets/",
    channel: 2
}];

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
		
		$(debug).text(mapObj.blockSize);
	    
        if (!me.video.init('jsApp', 20 * mapObj.blockSize, 
        		12 * mapObj.blockSize, false, 1.0)) {
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
        //me.debug.renderHitBox = true;        
        //me.input.bindMouse(me.input.mouse.RIGHT, "rightbutton");        

        me.state.change(me.state.MENU);

    }
};

window.onReady(function () {
    jsApp.onload();
});

