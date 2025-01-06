class enemy {ignore_movement
    height;
    width;
    x;
    y;
    collidable;
    right_border;
    left_border;
    top_border;
    bottom_border;

    
    velocity_x;
    velocity_default_x;
    a_x;
    velocity_y;

    direction;
    
    ignore_movement;
    health;
    attack;
    attack_cooldown;
    attack_cooldown_default;
    got_attacked;

    //animation
    frame_time;
    time;
    sprite_offset_x;
    sprite_offset_top;
    sprite_offset_bottom;
    frame_count;
    frame_start_x;
    sprite_offset_left;

    //effects
    knockback_timer;
    attacked_default_time;
    attacked_elapsed_time;

    resources;
    sprite_height;
    sprite_width;
    idle_spritesheet;
    idle_spritesheet_left;
    constructor( x, y, health, attack, collidable) {
        this.height = 84;
        this.width = 30;
        this.y = y;
        this.x = x;
        this.collidable = collidable;
        this.ignore_movement = true;
        this.health = health;
        this.attack = attack;
        this.got_attacked = false;

        this.attack_cooldown = 0;
        this.attack_cooldown_default = 35;

        this.velocity_x = 1;
        this.a_x = 0.1;
        this.velocity_default_x = 5;
        this.velocity_y = 0;

        this.direction = {
            up: false,  // Up
            left: false,  // Left
            right: true,  // Down
            down: false   // Right
        };

        this.frame_time = 5;
        this.time = 0;
        this.sprite_offset_x = 0;
        this.sprite_offset_top = 16;
        this.sprite_offset_bottom = 16;
        this.frame_count = 1;
        this.frame_start_x = this.sprite_offset_x;
        this.sprite_offset_left = 125;

        //effects
        this.knockback_timer = 3;
        this.attacked_default_time = 10;
        this.attacked_elapsed_time = 0;

        this.resources = [];
        this.sprite_height = 47;//16 top 16 bottom
        this.sprite_width = 144;//52 px offset X for each image
        this.idle_spritesheet = new Image();
        this.idle_spritesheet.src = 'res/enemy/enemy_on_fire.png';
        this.resources.push(this.idle_spritesheet);
        this.idle_spritesheet_left = new Image();
        this.idle_spritesheet_left.src = 'res/enemy/enemy_on_fire_left.png';
        this.resources.push(this.idle_spritesheet_left);
    }
}

class border{
    height;
    width;
    x;
    y;
    collidable;
    right_border;
    left_border;
    top_border;
    bottom_border;
    constructor(x, y, width, height) {
        this.height = height;
        this.width = width;
        this.y = y;
        this.x = x;
        this.collidable = true;
    }
}

class spawn_indicator{
    height;
    width;
    x;
    y;
    constructor (x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}