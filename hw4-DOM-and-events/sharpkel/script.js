document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");

  // create table
  var tableElement = document.createElement("table");
  // append table to body
  document.getElementsByTagName("body")[0].appendChild(tableElement);
  // populate the table
  for (var row = 0; row < 4; row++) {
    var tableRowElement = document.createElement("tr");
    for (var col = 0; col < 4; col++) {
      var cell;
      if (row === 0) {
        cell = document.createElement("th");
        cell.innerHTML = "Header " + (col + 1);
      } else {
        cell = document.createElement("td");
        cell.innerHTML = row + ", " + (col + 1);
      }
      tableRowElement.appendChild(cell);
    }
    tableElement.appendChild(tableRowElement);
  }
});
