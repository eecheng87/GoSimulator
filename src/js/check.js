function check(input) {

    let checkboxes = document.querySelectorAll('.sente');
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