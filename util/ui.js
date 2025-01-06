
function start_timer(){
    timer_interval_id = setInterval(update_timer, 1000);
}
function update_timer() {
    let timer = document.querySelector('.timer_value');
    let time = parseInt(timer.innerHTML);
    timer.innerHTML = time + 1;
}


function update_kills(){
    let kills = document.querySelector('.kill_value');
    let kill_count = parseInt(kills.innerHTML);
    kills.innerHTML = kill_count + 1;
}

function update_score(){
    let score = document.querySelector('.score_value');
    let score_count = parseInt(score.innerHTML);
    score.innerHTML = score_count + 100;
}

function update_healthbar(){
    let ui_health = document.querySelector('.health');
    let player_max_health = p.max_health;
    let player_health = p.health;

    ui_health.style = 'width :' + 100 * player_health/player_max_health + '%';
}

function show_endgame_screen() {
    let time = parseInt(document.querySelector('.timer_value').innerHTML);
    let kills = parseInt(document.querySelector('.kill_value').innerHTML);
    let score = parseInt(document.querySelector('.score_value').innerHTML);

    document.querySelector('.end_time').innerHTML = 'time : ' + time;
    document.querySelector('.end_kills').innerHTML = 'kills : ' + kills;
    document.querySelector('.end_score').innerHTML = 'score : ' + score;

    document.querySelector('.end_screen').style = 'visibility : visible';
}
