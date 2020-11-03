var selectedCell;

function toggleSelectedCell(e) {
  var temp = selectedCell;
  selectedCell = e.target;
  temp.style.border = "1px solid black";
  selectedCell.style.border = "3px solid black";
}

function moveOrMark(e) {
  var buttonId = e.target.id;

  if (buttonId === "mark") {
    selectedCell.style.backgroundColor = "yellow";
    return;
  }

  // Parse the IDs from the selected cell. The format is "2,1"
  //  where 2 is the row and 1 is the column
  var selectedCellRow = Number(selectedCell.id.split(",")[0]);
  var selectedCellCol = Number(selectedCell.id.split(",")[1]);

  // figure out if a valid move can be made depending on
  // the direction

  switch (buttonId) {
    case "up": {
      if (selectedCellRow > 1) {
        // restyle the previously-selected cell
        selectedCell.style.border = "1px solid black";
        // find the new selected cell
        selectedCell = document.getElementById(
          selectedCellRow - 1 + "," + selectedCellCol
        );
        // style the newly-selected cell
        selectedCell.style.border = "3px solid black";
      }
      break;
    }
    case "down": {
      if (selectedCellRow < 3) {
        selectedCell.style.border = "1px solid black";
        selectedCell = document.getElementById(
          selectedCellRow + 1 + "," + selectedCellCol
        );
        selectedCell.style.border = "3px solid black";
      }
      break;
    }
    case "left": {
      if (selectedCellCol > 1) {
        selectedCell.style.border = "1px solid black";
        selectedCell = document.getElementById(
          selectedCellRow + "," + (selectedCellCol - 1)
        );
        selectedCell.style.border = "3px solid black";
      }
      break;
    }
    case "right": {
      if (selectedCellCol < 4) {
        selectedCell.style.border = "1px solid black";
        selectedCell = document.getElementById(
          selectedCellRow + "," + (selectedCellCol + 1)
        );
        selectedCell.style.border = "3px solid black";
      }
      break;
    }
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");

  // create table and add event listener for event delegation
  var tableElement = document.createElement("table");
  tableElement.addEventListener("click", toggleSelectedCell);
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
        cell.style.border = "1px solid black";
      } else {
        cell = document.createElement("td");
        cell.innerHTML = row + ", " + (col + 1);
        // initialize the starting selected cell
        if (row === 1 && col === 0) {
          cell.style.border = "3px solid black";
          selectedCell = cell;
        } else {
          cell.style.border = "1px solid black";
        }
      }
      cell.id = row + "," + (col + 1);
      tableRowElement.appendChild(cell);
    }
    tableElement.appendChild(tableRowElement);
  }

  // create div for buttons and add event listener for event delegation
  var divElement = document.createElement("div");
  divElement.addEventListener("click", moveOrMark);
  // append div to body
  document.getElementsByTagName("body")[0].appendChild(divElement);
  // create directional buttons
  for (var i = 0; i < 5; i++) {
    var buttonElement = document.createElement("button");
    if (i === 0) {
      buttonElement.innerHTML = "Up";
      buttonElement.id = "up";
    } else if (i === 1) {
      buttonElement.innerHTML = "Down";
      buttonElement.id = "down";
    } else if (i === 2) {
      buttonElement.innerHTML = "Left";
      buttonElement.id = "left";
    } else if (i === 3) {
      buttonElement.innerHTML = "Right";
      buttonElement.id = "right";
    } else {
      buttonElement.innerHTML = "Mark Cell";
      buttonElement.id = "mark";
      buttonElement.style.marginLeft = "15px";
    }
    buttonElement.style.border = "2px solid black";
    buttonElement.style.marginRight = "5px";
    buttonElement.style.marginTop = "5px";
    // append each button to the div
    divElement.appendChild(buttonElement);
  }
});
