import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Button, Card } from "react-native-paper";
import { useWorkouts } from "../hooks/useWorkouts";
import { deleteWorkout } from "../services/workoutServices";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { workouts, refreshWorkouts } = useWorkouts();

  const handleCreateWorkoutPress = () => {
    navigation.navigate("CreateWorkout");
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshWorkouts();
    }, [])
  );

  const handleDeleteWorkout = async (workoutId: string) => {
    try {
      await deleteWorkout(workoutId);
      refreshWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <>
      <Button mode="contained" onPress={handleCreateWorkoutPress}>
        Create Workout
      </Button>
      <ScrollView>
        {workouts.map((workout) => (
          <Card key={workout.id}>
            <Card.Title title={workout.name} />
            <TouchableOpacity
              style={{ position: "absolute", top: 10, right: 10 }}
              onPress={() => handleDeleteWorkout(workout.id)}
            >
              <Entypo name="squared-cross" size={24} color="black" />
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}
