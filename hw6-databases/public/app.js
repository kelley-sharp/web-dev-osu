document.addEventListener("DOMContentLoaded", function () {
  console.log("loaded");
  const nameInput = document.querySelector(`input[name="name"]`);
  const dateInput = document.querySelector(`input[name="date"]`);
  const repsInput = document.querySelector(`input[name="reps"]`);
  const weightInput = document.querySelector(`input[name="weight"]`);
  const unitSelect = document.querySelector(`[name="unit"]`);

  const workoutIdHiddenInput = document.querySelector(
    `input[name="workout-id"]`
  );

  document.querySelector("table").addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const workoutId = event.target.parentNode.parentNode.id;
      if (event.target.classList.contains("edit")) {
        const workoutRow = document.getElementById(workoutId);
        workoutRow.childNodes.forEach((child) => {
          if (child.nodeType !== 3) {
            const childClass = child.className;
            switch (childClass) {
              case "name": {
                nameInput.value = child.innerHTML;
                break;
              }
              case "date": {
                // source: https://css-tricks.com/prefilling-date-input/
                dateInput.value = new Date(child.innerHTML)
                  .toISOString()
                  .substr(0, 10);
                break;
              }
              case "reps": {
                repsInput.value = child.innerHTML;
                break;
              }
              case "weight": {
                weightInput.value = child.innerHTML;
                break;
              }
              case "unit": {
                unitSelect.value = child.innerHTML;
                break;
              }
            }
          }
        });
      } else if (event.target.classList.contains("delete")) {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `/workouts/${workoutId}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const workoutRow = document.getElementById(workoutId);
            workoutRow.parentNode.removeChild(workoutRow);
          }
        };
        xhr.send();
      }
    }
  });

  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    // get the ID from the hidden input
    const workoutId = workoutIdHiddenInput.id;

    const reqBody = {
      name: nameInput.value,
      date: dateInput.value,
      reps: repsInput.value,
      weight: weightInput.value,
      unit: unitSelect.value,
    };

    if (workoutId === "new-workout") {
      console.log("POST");
      console.log(reqBody);
      // do a post request
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/workouts", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
          event.target.reset();
          const parsedResponse = JSON.parse(xhr.response);
          const workout = parsedResponse.workout;

          const newTableRow = document.createElement("tr");
          newTableRow.id = workout.id;

          const newNameCell = document.createElement("td");
          newNameCell.className = "name";
          newNameCell.innerHTML = workout.name;
          newTableRow.appendChild(newNameCell);

          const newRepsCell = document.createElement("td");
          newRepsCell.className = "reps";
          newRepsCell.innerHTML = workout.reps;
          newTableRow.appendChild(newRepsCell);

          const newWeightCell = document.createElement("td");
          newWeightCell.className = "weight";
          newWeightCell.innerHTML = workout.weight;
          newTableRow.appendChild(newWeightCell);

          const newDateCell = document.createElement("td");
          newDateCell.className = "date";
          newDateCell.innerHTML = workout.date;
          newTableRow.appendChild(newDateCell);

          const newUnitCell = document.createElement("td");
          newUnitCell.className = "unit";
          newUnitCell.innerHTML = workout.unit;
          newTableRow.appendChild(newUnitCell);

          const newEditButtonCell = document.createElement("td");
          const newEditButton = document.createElement("button");
          newEditButton.type = "button";
          newEditButton.classList.add("btn-warning", "edit");
          newEditButton.innerHTML = "Edit";
          newEditButtonCell.appendChild(newEditButton);
          newTableRow.appendChild(newEditButtonCell);

          const newDeleteButtonCell = document.createElement("td");
          const newDeleteButton = document.createElement("button");
          newDeleteButton.type = "button";
          newDeleteButton.classList.add("btn-danger", "delete");
          newDeleteButton.innerHTML = "Delete";
          newDeleteButtonCell.appendChild(newDeleteButton);
          newTableRow.appendChild(newDeleteButtonCell);

          document.querySelector("tbody").appendChild(newTableRow);
        }
      };
      xhr.send(JSON.stringify(reqBody));
    } else {
      // do a patch request
    }

    console.log("submitted");
  });
});
