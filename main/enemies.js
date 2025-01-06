let canvas_w = 1472;
let canvas_h = 704;
let world_enemies = [];

function init_enemies(){
    spawn_enemy(300, canvas_h - 144, 50, 5);
    spawn_enemy(600, canvas_h - 144, 50, 5);
    spawn_enemy(900, canvas_h - 144, 50, 5);
    spawn_enemy(1100, canvas_h - 144, 50, 5);
}
function spawn_enemy(x, y, health, attack) {
    let e = new enemy(x, y, health, attack, true);
    
    //randomize direction
    let random = Math.random() * 10;
    if (random < 6) {
        e.direction.left = true;
        e.direction.right = false;
        e.velocity_x *= -1;
    }

    world_enemies.push(e);
}


function update_enemies(){
    world_enemies.forEach(element => {
        move_enemy(element);
        if (collides(element, world_border_right)) {
            element.velocity_x = 0;
            element.direction.left = true;
            element.direction.right = false;
        }
        else if (collides(element, world_border_left)) {
            element.velocity_x = 0;
            element.direction.left = false;
            element.direction.right = true;
        }
        else if (collides(element, p)) {
            attack_player(element);
        }

        if (element.attack_cooldown > 0) {
            element.attack_cooldown --;
        }
    });
}
function move_enemy(enemy) {
    if (enemy.velocity_x <= enemy.velocity_default_x) {
        enemy.velocity_x += enemy.a_x;
    }

    if (enemy.direction.left) {
        enemy.x -= enemy.velocity_x;
    }
    else if(enemy.direction.right){
        enemy.x += enemy.velocity_x;
    }

}

function attack_player(element) {
    if (element.attack_cooldown <= 0) {
        p.health -= element.attack;
        update_healthbar();
        p.got_attacked = true;
        //reset cooldown
        element.attack_cooldown = element.attack_cooldown_default;
    }
}

function respawn_enemies() {
    let enemy_number = 4;
    let enemy_position;
    if (world_enemies.length === 0) {
        for (let i = 0; i < enemy_number; i++) {
            let enemy_position = Math.random() * 1000;
            if(enemy_position < canvas_w){
                spawn_enemy(enemy_position, canvas_h - 144, 50, 5);
            }
        }
    }
}