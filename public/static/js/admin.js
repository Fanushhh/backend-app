const addExerciseButton = document.querySelector(".add-exercise-button");
const addModalContainer = document.querySelector(".add-modal-container");
const editModalContainer = document.querySelector(".edit-modal-container");
const deleteModalContainer = document.querySelector('.delete-modal-container');
const addModalCloseButton = addModalContainer.querySelector(".close-button");
const editModalCloseButton = editModalContainer.querySelector(".close-button");
const deleteExerciseCloseButton = deleteModalContainer.querySelector(".close-button");

const addModalForm = addModalContainer.querySelector("form");
const editModalForm = editModalContainer.querySelector("form");
const deleteModalForm = deleteModalContainer.querySelector('form');
const editButtons = document.querySelectorAll(".edit-button");
const confirmDeleteButton = document.querySelectorAll('.yes-button');
const refuseDeleteButton = document.querySelectorAll('.no-button');

const EXERCISE_DIFFICULTY_COLORS = Object.freeze({
  easy: "green",
  medium: "blue",
  intermediate: "brown",
});

let exercises = [];

function getExerciseHTML(exercise) {
  const { _id, name, difficulty } = exercise;

  return `
    <div class="exercise-container" data-id="${_id}">
      <p class="exercise-title">
        ${name}
        <span 
          class="exercise-difficulty" 
          style="color: ${EXERCISE_DIFFICULTY_COLORS[difficulty]}"
        >
          ${difficulty}
        </span>
      </p>
      <div class="buttons-container">
        <div class="button-wrapper">
          <button data-hover="Edit me" class="edit-button">
              <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <span class="edit-tooltip">Edit me</span>
        </div>
        <div class="button-wrapper">
            <button 
              data-hover="Delete me" 
              class="delete-button"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
          <span class="delete-tooltip">Delete me</span>
        </div>
      </div>
    </div>
  `;
}

function generateExercises() {
  const easyColumn = document.querySelector(".easy-container");
  const mediumColumn = document.querySelector(".medium-container");
  const intermediateColumn = document.querySelector(".intermediate-container");

  exercises.map((exercise) => {
    switch (exercise.difficulty) {
      case "easy":
        easyColumn.innerHTML += getExerciseHTML(exercise);
        break;
      case "medium":
        mediumColumn.innerHTML += getExerciseHTML(exercise);
        break;
      case "intermediate":
        intermediateColumn.innerHTML += getExerciseHTML(exercise);
        break;
      default:
        break;
    }
  });

  const editButtons = document.querySelectorAll(".edit-button");

  [...editButtons].map((button) =>
    button.addEventListener("click", async function () {
      const exerciseContainer = button.closest(".exercise-container");
      const exerciseId = exerciseContainer.dataset.id;
      const exercise = await getExerciseById(exerciseId);

      console.log(exercise);

      editModalForm.id.value = exercise._id;
      editModalForm.name.value = exercise.name;
      editModalForm.description.value = exercise.description;
      editModalForm.difficulty.value = exercise.difficulty;

      editModalContainer.style.display = "block";
    })
  );

  const deleteButtons = document.querySelectorAll(".delete-button");

  [...deleteButtons].map((button) => 
      button.addEventListener('click', function(){
        deleteModalContainer.style.display = 'block';
      })
  );

  [...deleteButtons].map((button) =>
    button.addEventListener("click", async function () {
      const exerciseContainer = button.closest(".exercise-container");
      const exerciseId = exerciseContainer.dataset.id;
      const deleteId = deleteModalContainer.querySelector('.delete-id');
      deleteId.innerHTML = exerciseId;
      deleteModalContainer.style.display = 'block';
    })
  );
  [...refuseDeleteButton].map((button) => 
    button.addEventListener('click', function(){
      deleteModalContainer.style.display = 'none';
    })
  )


}

document.addEventListener("DOMContentLoaded", async function () {
  exercises = await getAllExercises();
  generateExercises();
});

addExerciseButton.addEventListener("click", function () {
  addModalContainer.style.display = "block";
});

addModalCloseButton.addEventListener("click", function () {
  addModalContainer.style.display = "none";
});

editModalCloseButton.addEventListener("click", function () {
  editModalContainer.style.display = "none";
});

deleteExerciseCloseButton.addEventListener('click', function(){
  deleteModalContainer.style.display = 'none';
})

addModalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const id = event.target.id.value;
  const name = event.target.name.value;
  const difficulty = event.target.difficulty.value;
  const description = event.target.description.value;

  if (isNaN(id)) {
    alert("Not a valid id");
  } else {
    const data = {
      id,
      name,
      difficulty,
      description,
    };
    fetch("/api/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    location.reload();
  }
  
});

editModalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const id = event.target.id.value;
  const name = event.target.name.value;
  const difficulty = event.target.difficulty.value;
  const description = event.target.description.value;

  if (isNaN(id)) {
    alert("Not a valid id");
  } else {
    const data = {
      name,
      difficulty,
      description,
    };
    fetch(`/api/exercises/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  location.reload();
});

deleteModalForm.addEventListener('submit', async function(event){
  event.preventDefault();
  const deleteItem = document.querySelector('.delete-id');
  const id = deleteItem.innerHTML;
  const exercise = getExerciseById(id);
  
  const name = exercise.name;
  const difficulty = exercise.difficulty;
  const description = exercise.description;
  const data = {
    name,
    difficulty,
    description,
  };
  await fetch(`/api/exercises/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  location.reload();
});

