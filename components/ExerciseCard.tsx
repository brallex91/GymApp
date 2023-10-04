import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import {
  getLocalExercises,
  storeLocalExercise,
} from "../services/exerciseService";
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
  isLiked: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isLiked }) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);

  const [loaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const handleToggleExercise = async (isChecked: boolean) => {
    try {
      if (isChecked) {
        await storeLocalExercise(exercise);
      } else {
        const localExercises = await getLocalExercises();
        const updatedExercises = localExercises.filter(
          (localExercise) => localExercise.name !== exercise.name
        );
        await AsyncStorage.setItem(
          "exercises",
          JSON.stringify(updatedExercises)
        );
      }
      setIsLikedState(isChecked);
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };

  return (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
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
          <Checkbox
            style={{ margin: 8 }}
            value={isLikedState}
            onValueChange={handleToggleExercise}
            color={isLikedState ? "#4630EB" : undefined}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default ExerciseCard;
