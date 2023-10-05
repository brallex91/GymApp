import React from "react";
import {
  View,
  Modal,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

import { formatInstructions } from "../utils/textFormat";

interface SimpleModalProps {
  visible: boolean;
  onClose: () => void;
  instruction: string;
}

const ExerciseDetails: React.FC<SimpleModalProps> = ({
  visible,
  onClose,
  instruction,
}) => {
  const formattedInstruction = formatInstructions(instruction);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.modalContent}>
            <Text>{formattedInstruction}</Text>
            <Button title="Close" onPress={onClose} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  scrollView: {
    maxHeight: 500,
    width: "80%",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default ExerciseDetails;
