const stone_r = 12;
let canv = document.querySelector('.board_cvs');
let html_coor = document.querySelector('.coordinate');
/*
    Global definition
        0 : empty
        1 : white
        2 : black
*/
let turn = 1;
let board_state = [];

init_board_state();

function init_board_state() {
    for (const index of Array(19 * 19).keys()) {
        board_state.push({
            coordinates: `${inv_flatten(index)}`,
            content: 0,
            eye: 0
        });
    }
}

function paint_stone(x, y, color) {
    let ctx = canv.getContext('2d');
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x * block_size + block_size, y * block_size + block_size, stone_r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.stroke();
}

function flatten(x, y) {
    // convert coordinates x and y into one dimension value
    return 19 * x + y;
}

function inv_flatten(index) {
    // inverse of flatten operation
    let x = Math.floor(index / 19);
    let y = index % 19;
    return `(${x}, ${y})`;
}


function change_turn() {
    // decide who is sente
    let normal = document.querySelector(".select_sente input[id='normal']");
    let black = document.querySelector(".select_sente input[id='black']");
    if (normal.checked) {
        turn = (turn == 1) ? 2 : 1;
    } else {
        turn = black.checked ? 2 : 1;
    }
}

function cal_pos(x, y) {
    // transform offset into coordinate of board
    return [Math.round((x - block_offsetX) / block_size), Math.round((y - block_offsetY) / block_size)];
}

function repeat_handler(x, y) {
    // check next move whether valid
    return board_state[flatten(x, y)].content == 0 ? 1 : -1;
}

canv.addEventListener('mousemove', e => {
    let [x, y] = cal_pos(e.offsetX, e.offsetY);
    html_coor.innerHTML = `(${x + 1} ,${y + 1})`;
});

canv.addEventListener('mousedown', e => {
    let [x, y] = cal_pos(e.offsetX, e.offsetY);

    if (repeat_handler(x, y) < 0) {
        console.log('invalid move');
        return;
    } else {
        board_state[flatten(x, y)].content = turn;
    }

    change_turn();
    let color = turn == 1 ? color_white : color_black;
    paint_stone(x, y, color);
})