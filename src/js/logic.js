const stone_r = 12;
let canv = document.querySelector('.board_cvs');
let html_coor = document.querySelector('.coordinate');
/*
    Global definition
        0 : empty
        1 : white
        2 : black
*/
let turn = 2;
let board_state = [];
let global_flag = false;

init_board_state();

function init_board_state() {
    for (const index of Array(19 * 19).keys()) {
        board_state.push({
            coordinates: `${inv_flatten(index)}`,
            content: 0,
            eye: 0,
            visited: false /* used by `isEnclosed` */
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
    // return -1 if coordinates are out of bound
    return (x < 0 || y < 0 || x > 18 || y > 18) ? -1 : 19 * x + y;
}

function inv_flatten(index) {
    // inverse of flatten operation
    let x = Math.floor(index / 19);
    let y = index % 19;
    return [x, y];
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

function set_eye(x, y) {
    // set how many eyes did stone in (x, y) have
    let eyes = 0;
    let stone = board_state[flatten(x, y)];
    let neighbors = [flatten(x + 1, y), flatten(x - 1, y),
        flatten(x, y + 1), flatten(x, y - 1)
    ];
    neighbors.forEach(index => {
        eyes = (index < 0 || board_state[index].content > 0) ? eyes : eyes + 1;
        if (index >= 0)
            board_state[index].eye = board_state[index].content != 0 ?
            board_state[index].eye - 1 : board_state[index].eye;
    });
    stone.eye = eyes;
}

function capture(x, y) {
    // pass last stone as parameter
    let last = board_state[flatten(x, y)];
    let neighbors = [flatten(x + 1, y), flatten(x - 1, y),
        flatten(x, y + 1), flatten(x, y - 1)
    ];
    neighbors.forEach(index => {
        //console.log('try capture')
        if (index < 0 || board_state[index].content == 0) return;
        if (board_state[index].content != last.content) {
            //console.log('one dfs start');
            if (isEnclosed(index, board_state[index].content)) {
                console.log('Some stones will be captured');
                capturing(index, board_state[index].content);
            }
        }
        resetVisited();
    });
    resetVisited();
}

function isEnclosed(index, cap_color) {
    // cap_color is color which will be taken
    // if (board_state[index].visited) return true;
    let [x, y] = inv_flatten(index);
    let neighbors = [flatten(x + 1, y), flatten(x - 1, y),
        flatten(x, y + 1), flatten(x, y - 1)
    ];
    let ans = true;
    neighbors.forEach(cur => {
        if (cur >= 0 && board_state[cur].content == 0) {
            board_state[cur].visited = true;
            ans = ans && false;
        } else if (cur < 0 || (cur >= 0 && board_state[cur].content != cap_color)) {
            // board_state[cur].visited = true;
            ans = ans && true;
        } else if (!board_state[cur].visited) {
            board_state[cur].visited = true;
            ans = ans && isEnclosed(cur, cap_color);
        }
    });
    return ans;
}

function capturing(index, cap_color) {
    // there're some stones should be captured
    // feature of this funcion: clearing and update board state
    let [x, y] = inv_flatten(index);
    let neighbors = [flatten(x + 1, y), flatten(x - 1, y),
        flatten(x, y + 1), flatten(x, y - 1), index
    ];
    neighbors.forEach(cur => {
        if (cur >= 0 && board_state[cur].content == cap_color) {
            board_state[cur].content = 0;
            board_state[cur].eye = 0;
            if (index != cur) capturing(cur, cap_color);
        }
    });

}

function update_board() {
    // called after capturing
    clear_board();
    paint_board();
    board_state.forEach(obj => {
        let [x, y] = obj.coordinates.split(',');
        if (obj.content > 0) {
            paint_stone(x, y, obj.content == 1 ? color_white : color_black);
        }
    });
}

function resetVisited() {
    board_state.forEach(obj => obj.visited = false);
}

document.addEventListener('keydown', e => {
    // 87 : W (White)
    // 66 : B (Black)
    // 78 : N (Normal)
    let normal = document.querySelector(".select_sente input[id='normal']");
    let black = document.querySelector(".select_sente input[id='black']");
    let white = document.querySelector(".select_sente input[id='white']");
    if (e.keyCode != 87 && e.keyCode != 66 && e.keyCode != 78) return;
    white.checked = black.checked = normal.checked = false;
    switch (e.keyCode) {
        case 87:
            white.checked = true;
            break;
        case 66:
            black.checked = true;
            break;
        case 78:
            normal.checked = true;
            break;
        default:
            break;
    }
});

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
        if (document.querySelector(".select_sente input[id='normal']").checked) {
            board_state[flatten(x, y)].content = turn;
        } else {
            board_state[flatten(x, y)].content =
                document.querySelector(".select_sente input[id='black']").checked ?
                2 : 1;
        }
    }

    set_eye(x, y);
    capture(x, y);
    update_board();
    //let color = turn == 1 ? color_white : color_black;
    //paint_stone(x, y, color);
    change_turn();
})