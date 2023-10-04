import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const ExerciseScreen: React.FC = () => {
  return (
    <View>
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        Select Muscle
      </Button>
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        Find Exercises
      </Button>
    </View>
  );
};

export default ExerciseScreen;
