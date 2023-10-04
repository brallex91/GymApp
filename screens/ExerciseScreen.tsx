import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DefaultTheme,
  Menu,
  Provider as PaperProvider,
} from "react-native-paper";
import ExerciseCard from "../components/ExerciseCard";
import { useFetchExerciseFromApi } from "../hooks/useFetchExerciseFromApi";
import { clearLocalExercises } from "../services/exerciseService";

export const muscleOptions = [
  { value: "abdominals", label: "Abdominals" },
  { value: "abductors", label: "Abductors" },
  { value: "adductors", label: "Adductors" },
  { value: "biceps", label: "Biceps" },
  { value: "calves", label: "Calves" },
  { value: "chest", label: "Chest" },
  { value: "forearms", label: "Forearms" },
  { value: "glutes", label: "Glutes" },
  { value: "hamstrings", label: "Hamstrings" },
  { value: "lats", label: "Lats" },
  { value: "lower_back", label: "Lower Back" },
  { value: "middle_back", label: "Middle Back" },
  { value: "neck", label: "Neck" },
  { value: "quadriceps", label: "Quadriceps" },
  { value: "traps", label: "Traps" },
  { value: "triceps", label: "Triceps" },
];

const ExerciseScreen: React.FC = () => {
  const [muscleMenuVisible, setMuscleMenuVisible] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);

  const showMuscleMenu = () => {
    setMuscleMenuVisible(true);
  };

  const hideMuscleMenu = () => {
    setMuscleMenuVisible(false);
  };

  const handleMuscleSelection = (muscle: string) => {
    setSelectedMuscle(muscle);
    hideMuscleMenu();
  };

  const { fetchExercises } = useFetchExerciseFromApi(selectedMuscle);

  const fetchAndSetExercises = async () => {
    const exercisesData = await fetchExercises();
    setExercises(exercisesData);
  };

  const handleClearExercises = async () => {
    try {
      await clearLocalExercises();
      setExercises([]);
    } catch (error) {
      console.error("Error clearing exercises:", error);
    }
  };

  return (
    <PaperProvider theme={customTheme}>
      <View
        style={{
          padding: 5,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Menu
          visible={muscleMenuVisible}
          onDismiss={hideMuscleMenu}
          anchor={
            <TouchableOpacity
              style={[styles.button, !selectedMuscle && styles.button]}
              onPress={showMuscleMenu}
              disabled={muscleMenuVisible}
            >
              <Text style={styles.buttonText}>
                {selectedMuscle ? selectedMuscle : "Select Muscle"}
              </Text>
            </TouchableOpacity>
          }
          contentStyle={{ maxHeight: 400 }}
        >
          <ScrollView style={{ maxHeight: 400 }}>
            {muscleOptions.map((muscle) => (
              <Menu.Item
                key={muscle.value}
                onPress={() => handleMuscleSelection(muscle.value)}
                title={muscle.label}
              />
            ))}
          </ScrollView>
        </Menu>
        <TouchableOpacity
          style={[styles.button, !selectedMuscle && styles.disabledButton]}
          onPress={fetchAndSetExercises}
          disabled={!selectedMuscle}
        >
          <Text style={styles.buttonText}>Find Exercises</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearExercises}
        >
          <Text style={styles.buttonText}>Clear Exercises</Text>
        </TouchableOpacity>

        <ScrollView>
          {exercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#007aff",
    accent: "#ff6347",
  },
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    marginTop: 16,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#007aff",
    width: 200,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    paddingVertical: 10,
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
  },
  clearButton: {
    alignSelf: "center",
    marginTop: 16,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#ff6347",
    width: 200,
  },
});

export default ExerciseScreen;
