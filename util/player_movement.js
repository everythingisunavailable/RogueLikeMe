function apply_gravity(params) {
    if (!p.collisions.bottom) {
        if (gravity < gravity_max) {
            gravity += gravity_a;
        }
        p.y += gravity;
    }
    else{
        gravity = gravity_default;
        p.velocity_y = p.velocity_y_default;
    }
}


function apply_jump(){
    gravity = 0;
    if (p.velocity_y > 0 && p.direction.w) {
        p.y -= p.velocity_y;
        p.velocity_y -= p.velocity_y_a;
    }
    else{
        //top of jump reached start falling
        p.velocity_y = 0;
        p.started_jumping = false;
        gravity = gravity_default;
    }
}


let dash_time_default = 20;//frame nr
let dash_speed_default = 25;
let dash_cooldown_default = 1 * 70;//1 sec cooldown

let dash_time = 20; 
let dash_speed = 25;
let dash_cooldown = 0;

function apply_dash(){
    if (p.last_direction_x === 'right' && !p.collisions.right){
        dash(1);
    }
    else if (p.last_direction_x === 'left' && !p.collisions.left) {
        dash(-1);
    }
    else if (p.last_direction_x === '' && !p.collisions.right) {
        dash(1);
    }
    
    if (dash_time > 0) {
        dash_time --;
    }
    else{
        //end dash resets
        dash_time = dash_time_default;
        dash_speed = dash_speed_default;
        p.triggered_dash = false;
        dash_cooldown = dash_cooldown_default;
        gravity = gravity_default;
    }
}
function dash(direction) {
    dash_speed = Math.abs(dash_speed) * direction;
    p.x += dash_speed;
    dash_time --;
    gravity = 0;
}


function apply_attack() {
    //spawn attack rect
    if (p.last_direction_x === 'left') {
        attack = new attack_box(p.x - attack_box_width + 10, p.y, attack_box_width, attack_box_height, true);
    }
    else{
        attack = new attack_box(p.x + 20,  p.y, attack_box_width, attack_box_height, true);
    }

    //check collision with each enemy
    for (let i = 0; i < world_enemies.length; i++) {
        if (collides(attack, world_enemies[i]) != null) {
            knocback(i);
            try_kill(i);
        }    
    }
}

function try_kill(index) {
    world_enemies[index].health -= p.attack;
    world_enemies[index].got_attacked = true; //triggers attack animation
    if (world_enemies[index].health <= 0) {
        world_enemies.splice(index, 1);
        update_kills();
        update_score();
    }
}

function check_is_player_alive(){
    if (p.health <= 0) {
        end_game();
    }
}