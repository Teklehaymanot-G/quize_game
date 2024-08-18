// StatusIndicator.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatusIndicator = ({ questions, selectedOptions }) => {
  return (
    <View style={styles.statusContainer}>
      <Text style={styles.statusTitle}>Level Status:</Text>
      <View style={styles.statusIndicator}>
        {questions.map((_, index) => (
          <View key={index} style={styles.statusIndicator}>
            <Text
              style={
                selectedOptions[index] ? styles.answered : styles.notAnswered
              }
            >
              {index + 1}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    marginTop: 20,
  },
  statusTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  statusIndicator: {
    flexDirection: "row",
    marginBottom: 5,
    gap: 2,
  },
  statusIndicatorText: {
    fontSize: 16,
  },
  answered: {
    backgroundColor: "#507FC2",
    color: "white",
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  notAnswered: {
    backgroundColor: "red",
    color: "white",
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
});

export default StatusIndicator;
