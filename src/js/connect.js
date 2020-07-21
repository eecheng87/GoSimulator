let socket = io.connect('http://localhost:4000');

let routine_index = 0;
let kifu_routine_ref;
let kifu_global_obj;
let kifu_len;

function paint_routine(obj, limit) {
    let kifu = obj['message'];
    let [x, y, color, cmt] = [kifu[routine_index].x,
        kifu[routine_index].y,
        kifu[routine_index].color,
        kifu[routine_index].comment
    ];

    comment_box.innerHTML = cmt ?
        cmt : "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\n \
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\n \
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\n \
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\n";
    turn = color == 'W' ? 1 : 2;
    if (board_state[flatten(x, y)].content > 0) console.log('invalid');
    board_state[flatten(x, y)].content = turn;
    set_eye(x, y);
    capture(x, y);
    update_board();

    routine_index += 1;

    if (routine_index >= kifu_len || routine_index >= limit)
        clearInterval(kifu_routine_ref);
}


// listen for event
socket.on('kifu_data', (obj) => {
    // this event happen when client click 'play'
    // and server sent back prepared data structure `obj`
    routine_index = 0;
    kifu_len = obj['message'].length;
    kifu_global_obj = obj;
    init_board_state();
    kifu_routine_ref = setInterval(() => paint_routine(obj), 300);

});