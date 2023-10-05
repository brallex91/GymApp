import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Menu } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import ExerciseCard from "../components/ExerciseCard";
import { useFetchExerciseFromApi } from "../hooks/useFetchExerciseFromApi";
import { muscleOptions } from "../utils/textFormat";
import { useButtonSound } from "../hooks/useButtonSound";
import ExerciseDetails from "../components/ExerciseDetails";

const ExerciseScreen: React.FC = () => {
  const [muscleMenuVisible, setMuscleMenuVisible] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [exerciseDetailsVisible, setExerciseDetailsVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<any | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  const playButtonSound = useButtonSound();

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
    if (selectedMuscle) {
      const exercisesData = await fetchExercises();
      setExercises(exercisesData);
    }
  };

  const handleExerciseCardPress = (exercise: any) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  const hideExerciseDetails = () => {
    setExerciseDetailsVisible(false);
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#FFFFFF", "#0074E4"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 1 }}
    >
      <Menu
        visible={muscleMenuVisible}
        onDismiss={hideMuscleMenu}
        anchor={
          <TouchableOpacity
            style={[styles.button, !selectedMuscle && styles.button]}
            onPress={() => {
              showMuscleMenu();
              playButtonSound();
            }}
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
              onPress={() => handleMuscleSelection(muscle.label)}
              title={muscle.label}
            />
          ))}
        </ScrollView>
      </Menu>
      <TouchableOpacity
        style={[styles.button, !selectedMuscle && styles.disabledButton]}
        onPress={() => {
          fetchAndSetExercises();
          playButtonSound();
        }}
        disabled={!selectedMuscle}
      >
        <Text style={styles.buttonText}>Find Exercises</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <ScrollView>
          {exercises.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleExerciseCardPress(exercise)}
            >
              <ExerciseCard exercise={exercise} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ExerciseDetails
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        instruction={selectedExercise ? selectedExercise.instructions : ""}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
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
