import React from "react";
import { BottomNavigation } from "react-native-paper";
import ExerciseScreen from "../screens/ExerciseScreen";
import HomeScreen from "../screens/HomeScreen";

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
    {
      key: "exercise",
      title: "Exercise",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    exercise: ExerciseScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNav;
