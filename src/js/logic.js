const stone_r = 12;
let canv = document.querySelector('.board_cvs');
let html_coor = document.querySelector('.coordinate');
/*
    0 : empty
    1 : white
    2 : black
*/
let turn = 1;
let board_state = Array(19).fill().map(() => Array(19).fill(0));


function paint_stone(x, y, color) {
    let ctx = canv.getContext('2d');
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x * block_size + block_size, y * block_size + block_size, stone_r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.stroke();
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

canv.addEventListener('mousemove', e => {
    let [x, y] = cal_pos(e.offsetX, e.offsetY);
    html_coor.innerHTML = `(${x + 1} ,${y + 1})`;
});

canv.addEventListener('mousedown', e => {
    let [x, y] = cal_pos(e.offsetX, e.offsetY);
    change_turn();
    let color = turn == 1 ? color_white : color_black;
    paint_stone(x, y, color);
})