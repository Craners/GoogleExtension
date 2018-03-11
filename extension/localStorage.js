function SaveLocal(section,data) {

  if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("data")) {

      var store = localStorage.getItem("data");
      // store = jQuery.parseJSON(store);
      var storeStr = JSON.stringify(store);
      console.log(storeStr);
      
    } else {
      var store = `{${section}:[${data}]}`;
      var storeStr = "'"+store+"'";
      localStorage.setItem("data", storeStr);
    }
  } else {

    console.log('local storage not supported');
  }
}