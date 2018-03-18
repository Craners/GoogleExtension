function SaveLocal(section,data) {

  if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("data")) {

      var store = localStorage.getItem("data");
      var storeStr = JSON.parse(store);
      if(storeStr.section)
      console.log(storeStr.section);
      
    } else {
      var store = {section: [data]};
      store = JSON.stringify(store);
      localStorage.setItem("data", store);
    }
  } else {

    console.log('local storage not supported');
  }
}