import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import Axios from "axios";

function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const workout = { title, reps, load };

    Axios.post("https://mernapp-render-be.onrender.com/api/workouts", workout)
      .then((response) => {
        setError(null);
        setEmptyFields([]);
        setTitle("");
        setReps("");
        setLoad("");
        dispatch({ type: "CREATE_WORKOUT", payload: response.data });
      })
      .catch((error) => {
        setEmptyFields(error.response.data.emptyFields);
        setError(error.response.data.error);
      });
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Reps:</label>
      <input
        type="text"
        name="reps"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <label>Load (in kg):</label>
      <input
        type="text"
        name="load"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
