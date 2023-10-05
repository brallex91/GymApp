import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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
import { useButtonSound } from "../hooks/useButtonSound";

const ExerciseScreen: React.FC = () => {
  const [muscleMenuVisible, setMuscleMenuVisible] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [fetchExercisesOnPress, setFetchExercisesOnPress] = useState(false);

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
    setFetchExercisesOnPress(true);
  };

  const { fetchExercises } = useFetchExerciseFromApi(selectedMuscle);

  const fetchAndSetExercises = async () => {
    if (fetchExercisesOnPress) {
      const exercisesData = await fetchExercises();
      setExercises(exercisesData);
      setFetchExercisesOnPress(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAndSetExercises();
    }, [selectedMuscle])
  );

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#FFFFFF", "#0074E4"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 1 }}
    >
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
                <ExerciseCard key={index} exercise={exercise} />
              ))}
            </ScrollView>
          </View>
        </View>
      </PaperProvider>
    </LinearGradient>
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
