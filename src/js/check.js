// checkbox logic
function check(input, clas) {
    let checkboxes = document.querySelectorAll(`.${clas}`);
    // uncheck all
    checkboxes.forEach(ins => {
        ins.checked = ins.checked ? false : ins.checked;
    });

    //set checked of clicked object
    if (input.checked == true) {
        input.checked = false;
    } else {
        input.checked = true;
    }
}

function init_checkbox() {
    // configure default setting
    let sente = document.querySelector(".select_sente input[id='normal']");
    sente.checked = true;
    let mode = document.querySelector(".select_mode input[id='play_kifu']");
    mode.checked = true;
}

init_checkbox();