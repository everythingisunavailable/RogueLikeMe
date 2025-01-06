//for the player
function check_collisions(first) {
    //check collisions by chunk
    let chunk_size = 4 * tile_size;

    let bottom_border = p.y + p.height;
    let top_border = p.y;
    let left_border = p.x ;
    let right_border = p.x + p.width;

    let min_y;
    let max_y;
    let min_x;
    let max_x;

    max_y = Math.floor(bottom_border / chunk_size) * 4 + 4;
    min_y = Math.floor(top_border / chunk_size) * 4;
    max_x = Math.floor(right_border / chunk_size) *  4 + 4;
    min_x = Math.floor(left_border / chunk_size) * 4;

    if(max_x > horizontal_tile_nr){
        max_x = horizontal_tile_nr;
    }
    if(max_y > vertical_tile_nr){
        max_y = vertical_tile_nr;
    }
    if (min_y < 0) {
        min_y = 0;
    }
    if (min_x < 0) {
        min_x = 0;
    }
    
    //check for map borders
    p.collisions[collides(p, world_border_left)] = true;
    p.collisions[collides(p, world_borer_top)] = true;
    p.collisions[collides(p, world_border_right)] = true;
    p.collisions[collides(p, wold_border_bottom)] = true;
    
    //check for map tiles
    for (let i = min_y; i < max_y; i++) {
        for (let j = min_x; j < max_x; j++) {
            if (world_map[i][j] != null && world_map[i][j].collidable) {
                p.collisions[collides(p, world_map[i][j])] = true;
            }
            
        }
        
    }

    
}

function reset_collisions() {
    p.collisions.bottom = false;
    p.collisions.top = false;
    p.collisions.left = false;
    p.collisions.right = false;
}


//collision
function collides(first, second) {
    //first object
    let f_bottom_border = first.y + first.height ;
    let f_top_border = first.y;
    let f_left_border = first.x;
    let f_right_border = first.x + first.width;
    //second object
    let s_bottom_border = second.y + second.height;
    let s_top_border = second.y;
    let s_left_border = second.x;
    let s_right_border = second.x + second.width;
    
    if (f_left_border < s_right_border &&
        f_bottom_border > s_top_border &&
        f_top_border < s_bottom_border &&
        f_right_border > s_left_border) {
        

        // Calculate overlap on each side
        let overlap_right = f_right_border - s_left_border;
        let overlap_left = s_right_border - f_left_border;
        let overlap_bottom = f_bottom_border - s_top_border;
        let overlap_top = s_bottom_border - f_top_border;

        // Determine the smallest overlap (direction of collision)
        let min_overlap = Math.min(overlap_left, overlap_right, overlap_top, overlap_bottom);

        if (min_overlap === overlap_left) {
            if (!first.ignore_movement ) {
                first.x = s_right_border -1;
            }
            return "left";
        }
        if (min_overlap === overlap_right){
            if(!first.ignore_movement){
                first.x = s_left_border - first.width +1;
            }
            return "right";
        } 
        if (min_overlap === overlap_top){
            if(!first.ignore_movement){
                first.y = s_bottom_border +1;
            }
            return "top";
        } 
        if (min_overlap === overlap_bottom){
            if(!first.ignore_movement){
                first.y = s_top_border - first.height;
            }
            return "bottom";
        }       
    }
    return null;
}