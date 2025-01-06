window.addEventListener('keypress', (event)=>{
    if (event.key === 'w' || event.key === 'W') {
        p.direction.w = true;
        p.direction.s = false;
    }    
    if (event.key === 's' || event.key === 'S') {
        p.direction.w = false;
        p.direction.s = true;
    }
    if (event.key === 'a' || event.key === 'A') {
        p.direction.a = true;
        p.direction.d = false;
    }
    if (event.key === 'd' || event.key === 'D') {
        p.direction.d = true;
        p.direction.a = false;
    }
    if (event.key === 'f' || event.key === 'F' || event.key === 'q' || event.key === 'Q') {
        p.triggered_dash = true;
    }
    if (event.key === 'Enter') {
        p.triggered_attack = true;
    }
});


window.addEventListener('keyup', (event)=>{
    if (event.key === 'w' || event.key === 'W') {
        p.direction.w = false;
    }
    if (event.key === 's' || event.key === 'S') {
        
        p.direction.s = false;
    }
    if (event.key === 'a' || event.key === 'A') {
        p.direction.a = false;
        
    }
    if (event.key === 'd' || event.key === 'D') {
        p.direction.d = false;
    }
});
