import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
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

    const existingExercise = existingExercises.find(
      (item) => item.name === exerciseCard.name
    );

    if (existingExercise) {
      Alert.alert(
        "Exercise Already Exists",
        "This exercise already exists in your list."
      );
      return;
    }

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

    existingExercises.push(exercise);

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
