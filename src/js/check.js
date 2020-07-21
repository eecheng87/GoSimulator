// check kufi list logic
let ul_obj = document.querySelector('.kifu_list');

ul_obj.addEventListener('click', e => {
    if (e.target && e.target.nodeName == 'LI') {
        // console.log(e.target.id);
        target_kifu_file_name = document.querySelector(`.kifu_list #${e.target.id}`).textContent;
        let all_li = document.querySelectorAll('.kifu_list li');
        all_li.forEach(li => {
            li.className = li.getAttribute('id') === e.target.id ?
                'tiktok' : 'emp_box';
        });
        routine_index = 0;
        kifu_is_playing = false;
        clearInterval(kifu_routine_ref);
    }
});

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