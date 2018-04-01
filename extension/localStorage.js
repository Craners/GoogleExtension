function SaveLocal(section, data) {

  if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("data")) {

      var store = localStorage.getItem("data");
      var storeStr = JSON.parse(store);

      if (!storeStr[section]) {

        storeStr[section] = [];
      }
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

function SaveOneOnly(section, data) {

  if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("data")) {

      var store = localStorage.getItem("data");
      var storeStr = JSON.parse(store);


      storeStr[section] = [];

      storeStr[section].push(data);
      storeStr = JSON.stringify(storeStr);
      localStorage.setItem("data", storeStr);

    } else {
      var store = { [section]: [data] };
      store = JSON.stringify(store);
      localStorage.setItem("data", store);
    }
  } else {

    console.log('local storage not supported');
  }
}

function RemoveFromLocal(section, data) {
  if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("data")) {

      var store = localStorage.getItem("data");
      var storeStr = JSON.parse(store);

      if (!storeStr[section]) {
        storeStr[section] = [];
      }
      var index = storeStr[section].indexOf(data);
      if (index != -1) {
        storeStr[section].splice(index, 1);
        storeStr = JSON.stringify(storeStr);
        localStorage.setItem("data", storeStr);
      }
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
      } else {

        return '';
      }
    }
    else {
      return '';
    }
  }
}