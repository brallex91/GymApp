import React from "react";
import { Card, Paragraph, Title } from "react-native-paper";
import {
  getLocalExercises,
  storeLocalExercise,
} from "../services/exerciseService";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { formatMuscleName, truncateString } from "../utils/textFormat";

interface ExerciseCard {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions?: string;
}

interface ExerciseCardProps {
  exercise: ExerciseCard;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const handleSaveExercise = async () => {
    try {
      await storeLocalExercise(exercise);

      const savedExercises = await getLocalExercises();
      const savedExerciseNames = savedExercises.map(
        (savedExercise) => savedExercise.name
      );
      console.log("Saved Exercise Names:", savedExerciseNames);
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardContent}>
          <View style={styles.cardText}>
            <Title>{exercise.name}</Title>
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
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSaveExercise}>
              <Entypo name="heart" size={52} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardText: {
    flex: 1,
  },
  buttonContainer: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 35,
  },
});

export default ExerciseCard;
