import React from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import {
  getLocalExercises,
  storeLocalExercise,
} from "../services/exerciseService";

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
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Title>{exercise.name}</Title>
        <Paragraph>Type: {exercise.type}</Paragraph>
        <Paragraph>Muscle: {exercise.muscle}</Paragraph>
        <Paragraph>Equipment: {exercise.equipment}</Paragraph>
        <Paragraph>Difficulty: {exercise.difficulty}</Paragraph>
        <Button onPress={handleSaveExercise}>Save Exercise</Button>
      </Card.Content>
    </Card>
  );
};

export default ExerciseCard;
