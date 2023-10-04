import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useWorkouts } from "../hooks/useWorkouts";
import { saveWorkout } from "../services/workoutServices";
import { generateRandomId } from "../utils/idGenerator";

const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const navigation = useNavigation();
  const { refreshWorkouts } = useWorkouts();

  const handleCreateWorkout = async () => {
    if (!workoutName) {
      return;
    }

    const workout = {
      id: generateRandomId(),
      name: workoutName,
      exerciseIds: [],
    };

    try {
      await saveWorkout(workout);
      setWorkoutName("");
      navigation.goBack();
      refreshWorkouts();
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Workout Name"
        value={workoutName}
        onChangeText={(text) => setWorkoutName(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleCreateWorkout}>
        Create Workout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
});

export default CreateWorkout;
