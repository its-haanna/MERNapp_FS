import React, { useEffect } from "react";
import Axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    Axios.get("https://mernapp-render-be.onrender.com/api/workouts").then(
      (response) => {
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
      }
    );
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
