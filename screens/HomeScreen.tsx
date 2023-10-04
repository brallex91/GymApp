import { useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import {
  clearLocalExercises,
  getLocalExercises,
} from "../services/exerciseService";
import { Exercise } from "../types/exercise";
import { formatMuscleName, truncateString } from "../utils/textFormat";

const HomeScreen: React.FC = () => {
  const [savedExercises, setSavedExercises] = useState<Exercise[] | []>([]);

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

  const handleClearExercises = async () => {
    try {
      await clearLocalExercises();
      setSavedExercises([]);
    } catch (error) {
      console.error("Error clearing exercises:", error);
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClearExercises}
      >
        <Text style={styles.buttonText}>Clear Exercises</Text>
      </TouchableOpacity>
      {savedExercises.map((exercise, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Title style={{ fontFamily: "RobotoRegular" }}>
              {truncateString(exercise.name, 30)}
            </Title>
            <Paragraph>Type: {formatMuscleName(exercise.type)}</Paragraph>
            <Paragraph>Muscle: {formatMuscleName(exercise.muscle)}</Paragraph>
            <Paragraph>
              Equipment: {formatMuscleName(exercise.equipment)}
            </Paragraph>
            <Paragraph>
              Difficulty: {formatMuscleName(exercise.difficulty)}
            </Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  clearButton: {
    alignSelf: "center",
    marginTop: 16,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#ff6347",
    width: 200,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    paddingVertical: 10,
  },
});

export default HomeScreen;
