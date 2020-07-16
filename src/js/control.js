let play_pause = document.querySelector('.play_pause');
let play_pause_btn = document.querySelector('.play_pause i');

play_pause.addEventListener('click', (e) => {
    let parent = e.target;
    play_pause_btn.className = play_pause_btn.className === "fas fa-play" ? "fas fa-pause" : "fas fa-play";
    if (play_pause_btn.className === "fas fa-pause") {
        // try to play kifu
        fire();
    }
});

function fire() {
    socket.emit('kifu_start', {
        message: 'mess from client'
    });
}