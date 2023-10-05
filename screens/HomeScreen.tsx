import { useFocusEffect } from "@react-navigation/native";
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
import Checkbox from "expo-checkbox";

const HomeScreen: React.FC = () => {
  const [savedExercises, setSavedExercises] = useState<Exercise[] | []>([]);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]); // En lista med ids för markerade övningar

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
    // Funktion för att markera/avmarkera övningar
    if (selectedExercises.includes(exerciseId)) {
      setSelectedExercises(selectedExercises.filter((id) => id !== exerciseId));
    } else {
      setSelectedExercises([...selectedExercises, exerciseId]);
    }
  };

  const handleClearExercises = async () => {
    try {
      // Extract IDs of selected exercises
      const selectedExerciseIds = selectedExercises;

      // Filtrera de sparade övningarna och behåll endast de som inte är markerade
      const exercisesToKeep = savedExercises.filter(
        (exercise) => !selectedExerciseIds.includes(exercise.id)
      );

      // Ta bort de markerade övningarna från AsyncStorage
      await clearLocalExercises(selectedExerciseIds);

      // Uppdatera listan över sparade övningar
      setSavedExercises(exercisesToKeep);

      // Återställ markerade övningar
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
      <ScrollView>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            handleClearExercises();
            playButtonSound();
          }}
        >
          <Text style={styles.buttonText}>Clear Exercises</Text>
        </TouchableOpacity>
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
