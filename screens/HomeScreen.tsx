import { useFocusEffect } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";

import {
  clearLocalExercises,
  getLocalExercises,
} from "../services/exerciseService";
import { Exercise } from "../types/exercise";
import { formatMuscleName, truncateString } from "../utils/textFormat";
import { useButtonSound } from "../hooks/useButtonSound";

const HomeScreen: React.FC = () => {
  const [savedExercises, setSavedExercises] = useState<Exercise[] | []>([]);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const playButtonSound = useButtonSound();

  const [loaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const fetchSavedExercises = async () => {
    try {
      const localExercises = await getLocalExercises();
      setSavedExercises(localExercises);
    } catch (error) {
      console.error("Error fetching saved exercises:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSavedExercises();
    }, [])
  );

  const toggleExerciseSelection = (exerciseId: string) => {
    if (selectedExercises.includes(exerciseId)) {
      setSelectedExercises(selectedExercises.filter((id) => id !== exerciseId));
    } else {
      setSelectedExercises([...selectedExercises, exerciseId]);
    }
  };

  const handleClearExercises = async () => {
    try {
      const selectedExerciseIds = selectedExercises;

      const exercisesToKeep = savedExercises.filter(
        (exercise) => !selectedExerciseIds.includes(exercise.id)
      );

      await clearLocalExercises(selectedExerciseIds);

      setSavedExercises(exercisesToKeep);

      setSelectedExercises([]);
    } catch (error) {
      console.error("Error clearing exercises:", error);
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#FFA500", "#FFFFFF"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity
        style={[
          styles.clearButton,
          {
            backgroundColor:
              selectedExercises.length > 0 ? "#ff6347" : "#d3d3d3",
          },
        ]}
        onPress={() => {
          handleClearExercises();
          playButtonSound();
        }}
        disabled={selectedExercises.length === 0}
      >
        <Text style={styles.buttonText}>Clear Selected Exercises</Text>
      </TouchableOpacity>
      <ScrollView>
        {savedExercises.map((exercise, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <View style={styles.cardContent}>
                <View style={styles.cardText}>
                  <Title style={{ fontFamily: "RobotoRegular" }}>
                    {truncateString(exercise.name, 30)}
                  </Title>
                  <Paragraph>Type: {formatMuscleName(exercise.type)}</Paragraph>
                  <Paragraph>
                    Muscle: {formatMuscleName(exercise.muscle)}
                  </Paragraph>
                  <Paragraph>
                    Equipment: {formatMuscleName(exercise.equipment)}
                  </Paragraph>
                  <Paragraph>
                    Difficulty: {formatMuscleName(exercise.difficulty)}
                  </Paragraph>
                </View>
                <View style={styles.checkBoxContainer}>
                  <Checkbox
                    value={selectedExercises.includes(exercise.id)}
                    onValueChange={() => toggleExerciseSelection(exercise.id)}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: "#FFD580",
  },
  clearButton: {
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
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardText: {
    flex: 1,
  },
  checkBoxContainer: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 50,
  },
});

export default HomeScreen;
