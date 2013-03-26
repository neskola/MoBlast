(function ($, undefined) {

    /**
       Offset class for polygon object. 
    */
    me.Offset2D = Object
        .extend(
        {
            x : null,
            y : null
        });


    me.Polygon2D = Object
        .extend({

            draw: function (context, color) {
                // draw the rectangle
                context.strokeStyle = color || "red";
                context.strokeLine(this.left - me.game.viewport.pos.x,
                        this.top - me.game.viewport.pos.y, this.width,
                        this.height);

            }
        });

})(window);