import React from "react";
import Axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const handleClick = async () => {
    await Axios.delete(
      "https://mernapp-render-be.onrender.com/api/workouts/" + workout._id
    )
      .then((response) => {
        dispatch({ type: "DELETE_WORKOUT", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong> {workout.load}
      </p>
      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
}

export default WorkoutDetails;
