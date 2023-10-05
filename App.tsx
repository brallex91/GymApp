import { useKeepAwake } from "expo-keep-awake";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";

import Navigation from "./navigation/AppNavigaton";

export default function App() {
  useKeepAwake();

  return (
    <PaperProvider>
      <StatusBar style="auto" hidden />
      <Navigation />
    </PaperProvider>
  );
}
