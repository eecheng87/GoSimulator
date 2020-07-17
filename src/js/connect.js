let socket = io.connect('http://localhost:4000');

let routine_index = 0;
let kifu_routine_ref;
let kifu_len;

function paint_routine(obj) {
    let kifu = obj['message'];
    let [x, y, color] = [kifu[routine_index].x,
        kifu[routine_index].y,
        kifu[routine_index].color
    ];
    // TODO: add update board routine
    paint_stone(x, y, color == 'W' ? color_white : color_black);

    routine_index += 1;
    if (routine_index >= kifu_len)
        clearInterval(kifu_routine_ref);
}


// listen for event
socket.on('kifu_data', (obj) => {
    // this event happen when client click 'play'
    // and server sent back prepared data structure `obj`
    routine_index = 0;
    kifu_len = obj['message'].length;
    kifu_routine_ref = setInterval(() => paint_routine(obj), 500);

});