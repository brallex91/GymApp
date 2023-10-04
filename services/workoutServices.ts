import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout } from "../types/workout";
import { generateRandomId } from "../utils/idGenerator";

const LOCAL_WORKOUTS_KEY = "workouts";

export const getAllWorkouts = async (): Promise<Workout[]> => {
  try {
    const workouts = await AsyncStorage.getItem(LOCAL_WORKOUTS_KEY);
    return workouts ? JSON.parse(workouts) : [];
  } catch (error) {
    console.error("Error getting workouts:", error);
    throw error;
  }
};

export const saveWorkout = async (workout: Workout): Promise<void> => {
  try {
    const existingWorkouts = await getAllWorkouts();

    if (!workout.id) {
      workout.id = generateRandomId();
    }

    existingWorkouts.push(workout);

    await AsyncStorage.setItem(
      LOCAL_WORKOUTS_KEY,
      JSON.stringify(existingWorkouts)
    );
  } catch (error) {
    console.error("Error saving workout:", error);
    throw error;
  }
};

export const deleteWorkout = async (workoutId: string): Promise<void> => {
  try {
    const existingWorkouts = await getAllWorkouts();

    const index = existingWorkouts.findIndex(
      (workout) => workout.id === workoutId
    );

    if (index !== -1) {
      existingWorkouts.splice(index, 1);
    }

    await AsyncStorage.setItem(
      LOCAL_WORKOUTS_KEY,
      JSON.stringify(existingWorkouts)
    );
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw error;
  }
};
