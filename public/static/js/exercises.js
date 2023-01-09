async function getExerciseById(id) {
  const response = await fetch(`/api/exercises/${id}`, { method: "GET" });
  const exercise = await response.json();
  return exercise;
}

async function getAllExercises() {
  const response = await fetch("/api/exercises", { method: "GET" });
  const exercises = await response.json();
  return exercises;
}
