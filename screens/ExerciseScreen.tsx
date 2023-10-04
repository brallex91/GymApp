import { useFocusEffect } from "@react-navigation/native";
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
import { getLocalExercises } from "../services/exerciseService";
import { muscleOptions } from "../utils/textFormat";

const ExerciseScreen: React.FC = () => {
  const [muscleMenuVisible, setMuscleMenuVisible] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [isLikedExercises, setIsLikedExercises] = useState<string[]>([]);

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

  const updateLikedExercises = async () => {
    try {
      const localExercises = await getLocalExercises();
      const likedExerciseNames = localExercises.map(
        (localExercise) => localExercise.name
      );
      setIsLikedExercises(likedExerciseNames);
    } catch (error) {
      console.error("Error checking liked exercises:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAndSetExercises();
    }, [selectedMuscle])
  );

  useFocusEffect(
    React.useCallback(() => {
      updateLikedExercises();
    }, [])
  );

  return (
    <PaperProvider theme={customTheme}>
      <View
        style={{
          flex: 1,
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

        <View style={{ flex: 1 }}>
          <ScrollView>
            {exercises.map((exercise, index) => (
              <ExerciseCard
                key={index}
                exercise={exercise}
                isLiked={isLikedExercises.includes(exercise.name)}
              />
            ))}
          </ScrollView>
        </View>
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
});

export default ExerciseScreen;
