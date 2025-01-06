class player{
    height;
    width;
    x;
    y;

    //collision box
    collidable;
    right_border;
    left_border;
    top_border;
    bottom_border;

    velocity_x;

    velocity_y;
    velocity_y_max;
    velocity_y_a;
    velocity_y_default;

    max_health;
    health;
    attack;
    got_attacked;
    attacked_default_time;
    attacked_elapsed_time;
    
    //i dont want to talk about it
    ignore_movement;

    //animation
    frame_time;
    time;
    sprite_offset_x;
    sprite_offset_top;
    sprite_offset_bottom;
    frame_count;
    frame_start_x;
    sprite_offset_left;

    //attack costum animation
    attack_frame_time;
    attack_anim_time;
    attack_sprite_offset_x;
    attack_sprite_offset_top;
    attack_sprite_offset_bottom;
    attack_frame_count;
    attack_frame_start_x;

    //player var
    direction;
    collisions;
    started_jumping;
    started_falling;
    last_direction_x;
    triggered_dash;
    triggered_attack;
    triggered_attack_animation;
    attack_cooldown;
    attack_cooldown_default;

    resources;
    sprite_width;
    sprite_height;
    sprite_count;
    run_sprite_sheet;
    run_sprite_sheet_left;
    idle_sprite_sheet;
    idle_sprite_sheet_left;
    crouch_sprite_sheet;
    jump_sprite_sheet;
    dash_sprite_sheet;
    dash_sprite_sheet_left;

    attack_animation_cycle_count;
    current_attack_animation_cycle;
    attack_sprite_sheet;
    attack_sprite_sheet_left;
    attack_sprite_sheet2;
    attack_sprite_sheet2_left;
    constructor() {
        this.height = 84;
        this.width = 30;
        this.collidable = true;

        this.velocity_x = 5;

        this.velocity_y = 20;
        this.velocity_y_default = 20;
        this.velocity_y_a = 1;

        this.x = 100;
        this.y = 0;

        this.max_health = 100;
        this.health = 100;
        this.attack = 30;

        this.ignore_movement = false;

        this.frame_time = 5;
        this.time = 0;
        this.sprite_offset_x = 0;
        this.sprite_offset_top = 16;
        this.sprite_offset_bottom = 16;
        this.frame_count = 1;
        this.frame_start_x = this.sprite_offset_x;
        this.sprite_offset_left = 130;

        //attack costum animation
        this.attack_frame_time = 2;
        this.attack_anim_time = 0;
        this.attack_sprite_offset_x = 0;
        this.attack_sprite_offset_top = 16;
        this.attack_sprite_offset_bottom = 16;
        this.attack_frame_count = 1;
        this.attack_frame_start_x = this.attack_sprite_offset_x;

        //player var
        this.direction = {
            w: false,  // Up
            a: false,  // Left
            s: false,  // Down
            d: false   // Right
        };
        this.collisions = {
            top: false, 
            left: false, 
            bottom: false,
            right: false,
            null:false
        };
        this.started_jumping = false;
        this.started_falling = false;
        this.last_direction_x = '';
        this.triggered_dash = false;
        this.triggered_attack = false;
        this.triggered_attack_animation = false;
        this.attack_cooldown = 0;
        this.attack_cooldown_default = 20;
        
        this.got_attacked = false;
        this.attacked_default_time = 10;
        this.attacked_elapsed_time = 0;

        this.resources = [];
        this.sprite_height = 47;//16 top 16 bottom
        this.sprite_width = 144;//52 px offset X for each image
        this.max_sprite_count = 8;
        this.run_sprite_sheet = new Image();
        this.run_sprite_sheet.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordRun.png';
        this.resources.push(this.run_sprite_sheet);
        this.run_sprite_sheet_left = new Image();
        this.run_sprite_sheet_left.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordRunLeft.png';
        this.resources.push(this.run_sprite_sheet_left);
        this.idle_sprite_sheet = new Image();
        this.idle_sprite_sheet.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordIdle.png';
        this.resources.push(this.idle_sprite_sheet);
        this.idle_sprite_sheet_left = new Image();
        this.idle_sprite_sheet_left.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordIdleLeft.png';
        this.resources.push(this.idle_sprite_sheet_left);
        this.crouch_sprite_sheet = new Image();
        this.crouch_sprite_sheet.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordCrouch.png';
        this.resources.push(this.crouch_sprite_sheet);
        this.jump_sprite_sheet = new Image();
        this.jump_sprite_sheet.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordJump.png';
        this.resources.push(this.jump_sprite_sheet);
        this.jump_sprite_sheet_left = new Image();
        this.jump_sprite_sheet_left.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordJumpLeft.png';
        this.resources.push(this.jump_sprite_sheet_left);
        this.fall_sprite_sheet = new Image();
        this.fall_sprite_sheet.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordJumpToFall.png';
        this.resources.push(this.fall_sprite_sheet);
        this.fall_sprite_sheet_left = new Image();
        this.fall_sprite_sheet_left.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordJumpToFallLeft.png';
        this.resources.push(this.fall_sprite_sheet_left);
        this.dash_sprite_sheet = new Image();
        this.dash_sprite_sheet.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordDash.png';
        this.resources.push(this.dash_sprite_sheet);
        this.dash_sprite_sheet_left = new Image();
        this.dash_sprite_sheet_left.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordDashLeft.png';
        this.resources.push(this.dash_sprite_sheet_left);

        this.attack_animation_cycle_count = 2;
        this.current_attack_animation_cycle = 1;
        this.attack_sprite_sheet = new Image();
        this.attack_sprite_sheet.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordAttack1.png';
        this.resources.push(this.attack_sprite_sheet);
        this.attack_sprite_sheet_left = new Image();
        this.attack_sprite_sheet_left.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordAttack1Left.png';
        this.resources.push(this.attack_sprite_sheet_left);
        this.attack_sprite_sheet2 = new Image();
        this.attack_sprite_sheet2.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordAttack2.png';
        this.resources.push(this.attack_sprite_sheet2);
        this.attack_sprite_sheet2_left = new Image();
        this.attack_sprite_sheet2_left.src = '../res/FW/Fire_Warrior_FireSword/Fire_Warrior_FireSwordAttack2Left.png';
        this.resources.push(this.attack_sprite_sheet2_left);
    }
}


class attack_box{
    height;
    width;
    x;
    y;
    collidable;
    right_border;
    left_border;
    top_border;
    bottom_border;
    ignore_movement;
    constructor(x, y, width, height, collidable) {
        this.height = height;
        this.width = width;
        this.y = y;
        this.x = x;
        this.collidable = collidable;
        this.ignore_movement = true;
    }
}