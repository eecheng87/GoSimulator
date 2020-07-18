let screen = document.querySelector('body');
let play_pause = document.querySelector('.play_pause');
let play_pause_btn = document.querySelector('.play_pause i');
let forward_btn = document.querySelector('.step_forward');
let comment_btn = document.querySelector('.comment');
let comment_box = document.querySelector('.comment_box');
let kifu_is_playing = false;

comment_btn.addEventListener('click', (e) => {
    if (comment_btn.style.color === "rgb(204, 204, 204)") {
        comment_btn.style.color = "rgb(255, 195, 0)"
        display_cmt_box();
    } else {
        comment_btn.style.color = "rgb(204, 204, 204)";
        rmv_cmt_box();
    }
});

function rmv_cmt_box() {
    comment_box.style.display = "none";
}

function display_cmt_box() {
    comment_box.style.display = "inline";
}

forward_btn.addEventListener('click', (e) => {
    if (kifu_is_playing) {
        let limit = routine_index + 10;
        kifu_routine_ref = setInterval(() => paint_routine(
            kifu_global_obj, limit), 1);
    }
});

play_pause.addEventListener('click', play_cb);

screen.addEventListener('keydown', (e) => {
    // key code of space is 32, change proper keycode for ur computer
    if (e.keyCode == 32) {
        play_cb();
    }
});

function play_cb() {
    // call back function for trigger 'play'
    play_pause_btn.className = play_pause_btn.className === "fas fa-play" ? "fas fa-pause" : "fas fa-play";
    if (play_pause_btn.className === "fas fa-pause") {
        // try to play kifu or maybe re-start
        if (!kifu_is_playing) {
            fire();
            kifu_is_playing = true;
        } else {
            // re-start kifu video
            kifu_routine_ref = setInterval(() => paint_routine(kifu_global_obj), 500);
        }

    } else {
        clearInterval(kifu_routine_ref);
    }
}


function fire() {
    socket.emit('kifu_start', {
        message: 'mess from client'
    });
}