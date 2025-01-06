class tile{
    height;
    width;
    x;
    y;
    collidable;
    right_border;
    left_border;
    top_border;
    bottom_border;
    sprite;
    constructor( x, y, collidable, source) {
        this.height = 64;
        this.width = 64;
        this.y = y;
        this.x = x;
        this.collidable = collidable;
        this.sprite = new Image();
        this.sprite.src = source;
    }
}