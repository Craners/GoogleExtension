function SaveLocal(section, data) {

  if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("data")) {

      var store = localStorage.getItem("data");
      var storeStr = JSON.parse(store);

      if (storeStr[section].indexOf(data) == -1) {

        storeStr[section].push(data);
        storeStr = JSON.stringify(storeStr);
        localStorage.setItem("data", storeStr);
      }

    } else {
      var store = { [section]: [data] };
      store = JSON.stringify(store);
      localStorage.setItem("data", store);
    }
  } else {

    console.log('local storage not supported');
  }
}
function GetLocal(section) {

  if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("data")) {

      var store = localStorage.getItem("data");
      var storeStr = JSON.parse(store);

      if (section in storeStr) { 

        return storeStr[section];
      }else{

        return '';
      }
    }
    else{
      return '';
    }
  }
}