import { useEffect, useState } from "react";
import { getAllWorkouts } from "../services/workoutServices";
import { Workout } from "../types/workout";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const fetchWorkouts = async () => {
    try {
      const allWorkouts = await getAllWorkouts();
      setWorkouts(allWorkouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const refreshWorkouts = async () => {
    await fetchWorkouts();
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return { workouts, refreshWorkouts };
}
