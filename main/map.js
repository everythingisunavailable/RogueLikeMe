let tile_size = 64;
let horizontal_tile_nr = 23;
let vertical_tile_nr = 11;

let world_map = [];

for (let i = 0; i < vertical_tile_nr; i++) {
    world_map[i] = []; 
    for (let j = 0; j < horizontal_tile_nr; j++) {
        world_map[i][j] = null; 
    }
}


function init_world_objects() {
    //draw the map 
    let world_map_model = [
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    ['path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path','path']
    ];

    
    let tile_x = 0;
    let tile_y = 0;
    //init the objects
    for (let i = 0; i < vertical_tile_nr; i++) {
        for (let j = 0; j < horizontal_tile_nr; j++){
            if (world_map_model[i][j] === 'path') {
                let path = 'res/tiles/path.png';
                world_map[i][j] = new tile(tile_x, tile_y, true, path);
            }
            else if (world_map_model[i][j] === 'sky') {
                let path = 'res/tiles/sky.png';
                world_map[i][j] = new tile(tile_x, tile_y, false, path);
            }
            else if (world_map_model[i][j] === 'platform') {
                let path = 'res/tiles/platform.png';
                world_map[i][j] = new tile(tile_x, tile_y, true, path);
            }
            else if (world_map_model[i][j] === 'leaf') {
                let path = 'res/tiles/ugly_leaf.png';
                world_map[i][j] = new tile(tile_x, tile_y, false, path);
            }
            else if (world_map_model[i][j] === 'trunk') {
                let path = 'res/tiles/trunk.png';
                world_map[i][j] = new tile(tile_x, tile_y, false, path);
            }
            else{
                world_map[i][j] = null;
            }
            tile_x += tile_size;
        }

        tile_x = 0;
        tile_y += tile_size;
    }
    tile_y = 0;

}