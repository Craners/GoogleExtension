(function () {
    'use strict';
    // var dialogButton = document.querySelector('.dialog-button');
    if(GetLocal('name')){
        console.log('yes');
    }else{
        console.log('no');
    }
    var dialog = document.querySelector('#nameDialog');
    dialog.showModal();
    dialog.querySelector('button:not([disabled])')
        .addEventListener('click', function () {
            dialog.close();
        });
}());