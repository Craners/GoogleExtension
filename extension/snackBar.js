function ShowSnackBar(msg) {

    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = { message: msg };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}