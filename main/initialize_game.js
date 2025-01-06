let canvas = document.querySelector('.canvas');
let canvas_width = 1472;
let canvas_height = 704;
canvas.width = canvas_width;
canvas.height = canvas_height;
let draw = canvas.getContext('2d');
draw.imageSmoothingEnabled = false;


//gravity
let gravity_default = 0;
let gravity = 7;
let gravity_a = 1;
let gravity_a_default = 1;
let gravity_max = 30;


//init player
let p = new player();

//player attack radius
let attack_box_height = p.height;
let attack_box_width = 100; //attack radius
let attack = new attack_box(p.x - attack_box_width, p.y, attack_box_width, attack_box_height, false);

//map borders
let world_border_left = new border(-100, 0, 100, canvas_height);
let world_border_right = new border(canvas_width, 0, 100, canvas_height);
let world_borer_top = new border(0, -100, canvas_width, 100);
let wold_border_bottom = new border(0, canvas_height, canvas_width, 100);

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, calling init...');
    init();
});

function init(){
    console.log('init called');
    
    init_world_objects();
    init_enemies();
    
    let resources_loaded_count = 0;
    let resources_total = p.resources.length + horizontal_tile_nr ;//* vertical_tile_nr;
    if (world_enemies.length != 0) {
        resources_total += world_enemies.length * world_enemies[0].resources.length;
    }

    
    //player
    p.resources.forEach(element => {
        element.onload = ()=>{
            resources_loaded_count ++;
            start_game(resources_loaded_count, resources_total);
        }
    });
    
    //map
    world_map.forEach(element => {
        element.forEach(element => {
            if (element != null) {
                element.sprite.onload = ()=>{
                    resources_loaded_count ++;
                    start_game(resources_loaded_count, resources_total);
                }
            }
        });
    });
    
    
    //enemies
    world_enemies.forEach(element => {
        element.resources.forEach(element => {
            element.onload = () => {
                resources_loaded_count ++;
                start_game(resources_loaded_count, resources_total);
            }
        })
    })
    
}

let interval_id;
let timer_interval_id;
function start_game(resources_count, resources_total) {
    console.log(resources_count, resources_total);

    
    if (resources_count === resources_total) {
        start_timer();
        interval_id = setInterval(update, 1000/70);
    }
}

function pause_game() {
    if (interval_id != null && timer_interval_id != null) {
        clearInterval(interval_id);
        clearInterval(timer_interval_id);
    }
    else{
        console.log('interval not started yet');
    }
}

function end_game(){
    if (interval_id != null && timer_interval_id != null) {
        clearInterval(interval_id);
        clearInterval(timer_interval_id);
        show_endgame_screen();
    }
    else{
        console.log('interval not started yet');
    }
}

function reload(){
    window.location.reload();
}