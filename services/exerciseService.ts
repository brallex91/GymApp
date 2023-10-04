import AsyncStorage from "@react-native-async-storage/async-storage";
import ExerciseCard from "../components/ExerciseCard";
import { Exercise } from "../types/exercise";
import { generateRandomId } from "../utils/idGenerator";

const LOCAL_EXERCISES_KEY = "exercises";

export const getLocalExercises = async (): Promise<Exercise[]> => {
  try {
    const exercises = await AsyncStorage.getItem(LOCAL_EXERCISES_KEY);
    return exercises ? JSON.parse(exercises) : [];
  } catch (error) {
    console.error("Error getting exercises:", error);
    throw error;
  }
};

export const storeLocalExercise = async (
  exerciseCard: ExerciseCard
): Promise<void> => {
  try {
    const existingExercises = await getLocalExercises();

    const exercise: Exercise = {
      id: generateRandomId(),
      name: exerciseCard.name,
      type: exerciseCard.type,
      muscle: exerciseCard.muscle,
      equipment: exerciseCard.equipment,
      difficulty: exerciseCard.difficulty,
      instructions: exerciseCard.instructions || "",
      sets: 0,
      reps: 0,
    };

    const index = existingExercises.findIndex(
      (item) => item.id === exercise.id
    );

    if (index !== -1) {
      existingExercises[index] = exercise;
    } else {
      existingExercises.push(exercise);
    }

    await AsyncStorage.setItem(
      LOCAL_EXERCISES_KEY,
      JSON.stringify(existingExercises)
    );
  } catch (error) {
    console.error("Error storing exercise:", error);
    throw error;
  }
};

export const clearLocalExercises = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(LOCAL_EXERCISES_KEY);
  } catch (error) {
    console.error("Error clearing local exercises:", error);
    throw error;
  }
};
