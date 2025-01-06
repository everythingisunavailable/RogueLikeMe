function knocback(index){
    let distance = 20;
    if(p.last_direction_x === 'left'){
        world_enemies[index].x -= distance;
        world_enemies[index].velocity_x = 1;
    }
    else if (p.last_direction_x === 'right') {
        world_enemies[index].x += distance;
        world_enemies[index].velocity_x = 1;
    }
    else{
        world_enemies[index].x -= distance;
        world_enemies[index].velocity_x = 1;
    }
}