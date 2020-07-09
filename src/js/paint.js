const board_offsetX = 0;
const board_offsetY = 0;
const board_width = 600;
const board_height = 600;
const block_size = 30;
const block_offsetX = 30;
const block_offsetY = 30;
const starpoint_r = 4;
const board_color = '#DEB886';
const color_black = '#0B0B0B';
const color_white = '#FFFFFF';

function paint_board() {
    let canv = document.querySelector('.board_cvs');
    if (canv.getContext) {
        let ctx = canv.getContext('2d');
        canv.width = board_height + 10;
        canv.height = board_height + 10;
        // paint base
        ctx.fillStyle = board_color;
        ctx.fillRect(board_offsetX, board_offsetY, board_width, board_height);
        // draw line
        ctx.fillStyle = color_black;
        for (const x of Array(19).keys()) {
            ctx.beginPath();
            ctx.moveTo(x * block_size + block_offsetX, block_offsetY);
            ctx.lineTo(x * block_size + block_offsetX, board_height - block_offsetY);
            ctx.stroke();
        }
        for (const y of Array(19).keys()) {
            ctx.beginPath();
            ctx.moveTo(block_offsetX, y * block_size + block_offsetY);
            ctx.lineTo(board_width - block_offsetX, y * block_size + block_offsetY);
            ctx.stroke();
        }
        // draw star point
        let star_pnt = [4, 10, 16];
        star_pnt.forEach((val1) => {
            star_pnt.forEach((val2) => {
                ctx.beginPath();
                ctx.arc(val1 * block_size, val2 * block_size, starpoint_r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.stroke();
            })
        })
    }
}

function clear_board() {
    let canv = document.querySelector('.board_cvs');
    if (canv.getContext) {
        let ctx = canv.getContext('2d');
        ctx.clearRect(board_offsetX, board_offsetY, board_width, board_height);
    }
}


paint_board();