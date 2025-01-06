function update(image){
    
    draw.clearRect(0, 0, canvas_width, canvas_height);

    reset_collisions();
    check_collisions(p);

    check_is_player_alive();

    respawn_enemies();

    apply_gravity();

    update_enemies();

    update_player();
    
    draw_assets();
}


function draw_assets(){
 
    draw_map();

    draw_enemies();
    
    draw_player();
}


function draw_from_sprite_sheet(spritesheet, frames, o){
    draw.drawImage(spritesheet, o.frame_start_x, o.sprite_offset_top, o.sprite_width, o.sprite_height, o.x-o.sprite_offset_left, o.y-11,  o.sprite_width*2, o.sprite_height*2);
    if (o.time > o.frame_time) {
        o.frame_start_x += o.sprite_width;
        o.time = 0; 
        o.frame_count ++;
    }
    
    if (o.frame_count > frames) {
        o.frame_count = 1;
        o.frame_start_x = o.sprite_offset_x;
    }
    o.time ++;
}


function draw_attack(spritesheet, frames, o){
    draw.drawImage(spritesheet, o.attack_frame_start_x, o.attack_sprite_offset_top, o.sprite_width, o.sprite_height, o.x-130, o.y-11,  o.sprite_width*2, o.sprite_height*2);
    if (o.attack_anim_time > o.attack_frame_time) {
        o.attack_frame_start_x += o.sprite_width;
        o.attack_frame_count++;
        o.attack_anim_time = 0;
    }
    o.attack_anim_time ++;
    if (o.attack_frame_count > frames) {
        o.triggered_attack_animation = false;
        o.attack_frame_count = 1;
        o.attack_frame_start_x = o.attack_sprite_offset_x;

        if (o.current_attack_animation_cycle === p.attack_animation_cycle_count) {
            o.current_attack_animation_cycle = 1;
        }
        else{
            o.current_attack_animation_cycle ++; 
        }
    }
}

function draw_attack_cycle(direction, o){
    if (direction === 'right') {
        if (o.current_attack_animation_cycle === 1 ) {
            draw_attack(o.attack_sprite_sheet, 4, o);
        }
        else if (o.current_attack_animation_cycle === 2) {
            draw_attack(o.attack_sprite_sheet2, 4, o);
        }
    }
    else if(direction === 'left'){
        if (o.current_attack_animation_cycle === 1) {
            draw_attack(o.attack_sprite_sheet_left, 4, o);
        }
        else if (o.current_attack_animation_cycle === 2) {
            draw_attack(o.attack_sprite_sheet2_left, 4, o);
        }
    }
}

function draw_map() {
    for (let i = 0; i < vertical_tile_nr; i++) {
        for (let j = 0; j < horizontal_tile_nr; j++) {
            if (world_map[i][j] != null) {
                draw.drawImage(world_map[i][j].sprite, world_map[i][j].x, world_map[i][j].y);
            }
        }
    }
}


function update_player() {
    if (p.direction.w && p.collisions.bottom && !p.triggered_dash) {
        //start moving up  
        p.started_jumping = true;
    }
    if (p.direction.a && !p.collisions.left && !p.triggered_dash) {
        p.x -= p.velocity_x;
        p.last_direction_x = 'left';
    }
    if (p.direction.s && p.collisions.bottom && !p.triggered_dash) {
        //crouch by (TO DO :) making player hitbox small
    }
    if (p.direction.d && !p.collisions.right && !p.triggered_dash) {
        p.x += p.velocity_x;
        p.last_direction_x = 'right';
    }

    if (p.started_jumping && !p.triggered_dash) {
        apply_jump();
    }

    //dashing
    if (p.triggered_dash && dash_cooldown <= 0) {
        apply_dash();
    }
    else{
        p.triggered_dash = false;
    }
    if (dash_cooldown > 0) {
        dash_cooldown --;
    }

    //attacking
    if (p.triggered_attack && p.attack_cooldown <= 0) {
        p.triggered_attack_animation = true;
        apply_attack();
        p.triggered_attack = false;
        p.attack_cooldown = p.attack_cooldown_default;
    }
    else{
        p.triggered_attack = false;
    }
    if (p.attack_cooldown > 0 && p.attack_cooldown > -1) {
        p.attack_cooldown --;
    }
}


function draw_player(){

    if (p.got_attacked) {
        draw.globalCompositeOperation = 'overlay';
        draw_attacked(p);
    }

    if (p.last_direction_x === 'right') {
        if (p.triggered_attack_animation) {
            draw_attack_cycle('right', p);
        }
        else if (p.triggered_dash){
            draw_from_sprite_sheet(p.dash_sprite_sheet, 4, p);
        }
        else if (p.started_jumping){
            draw_from_sprite_sheet(p.jump_sprite_sheet, 3, p);
        }
        else if (p.direction.a) {
            draw_from_sprite_sheet(p.run_sprite_sheet_left, 8, p);
        }
        else if (p.direction.d) {
            draw_from_sprite_sheet(p.run_sprite_sheet, 8, p);
        }
        else if (p.direction.s) {
            draw_from_sprite_sheet(p.idle_sprite_sheet, 3, p);
        }
        else{
            draw_from_sprite_sheet(p.idle_sprite_sheet, 8, p);
        }
    }
    else if (p.last_direction_x === 'left') {
        if (p.triggered_attack_animation) {
            draw_attack_cycle('left', p);
        }
        else if (p.triggered_dash){
            draw_from_sprite_sheet(p.dash_sprite_sheet_left, 4, p);
        }
        else if (p.started_jumping){
            draw_from_sprite_sheet(p.jump_sprite_sheet_left, 3, p);
        }
        else if (p.direction.a) {
            draw_from_sprite_sheet(p.run_sprite_sheet_left, 8, p);
        }
        else if (p.direction.d) {
            draw_from_sprite_sheet(p.run_sprite_sheet, 8, p);
        }
        else if (p.direction.s) {
            draw_from_sprite_sheet(p.idle_sprite_sheet_left, 3, p);
        }
        else{
            draw_from_sprite_sheet(p.idle_sprite_sheet_left, 8, p);
        }
    }
    else{
        if (p.triggered_attack_animation) {
            draw_attack_cycle('right', p);
        }
        else if (p.triggered_dash){
            draw_from_sprite_sheet(p.dash_sprite_sheet, 4, p); 
        }
        else if (p.started_jumping){
            draw_from_sprite_sheet(p.jump_sprite_sheet_left, 3, p);
        }
        else{
            draw_from_sprite_sheet(p.idle_sprite_sheet, 8, p);
        }
    }

    //resets
    draw.globalCompositeOperation = 'source-over';
}

function draw_enemies(){
    world_enemies.forEach(element => {        
        if (element.got_attacked) {
            draw.globalCompositeOperation = 'lighter';
            draw_attacked(element);
        }

        if(element.direction.right){
            draw_from_sprite_sheet(element.idle_spritesheet, 8, element);
        }
        else if(element.direction.left){
            draw_from_sprite_sheet(element.idle_spritesheet_left, 8, element);
        }
        else{
            draw_from_sprite_sheet(element.idle_spritesheet, 8, element);
        }
        
        //reset
        draw.globalCompositeOperation = 'source-over';
    });
}

function draw_attacked(entity){
    if (entity.attacked_elapsed_time > entity.attacked_default_time) {
        entity.got_attacked = false;
        entity.attacked_elapsed_time = 0;
    }
    else{
        entity.attacked_elapsed_time ++;
    }
}