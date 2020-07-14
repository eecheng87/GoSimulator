let play_pause = document.querySelector('.play_pause');
let play_pause_btn = document.querySelector('.play_pause i');

play_pause.addEventListener('click', (e) => {
    let parent = e.target;
    play_pause_btn.className = play_pause_btn.className === "fas fa-play" ? "fas fa-pause" : "fas fa-play";
});