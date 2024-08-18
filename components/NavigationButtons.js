// NavigationButtons.js
import React from "react";
import { View, Button, StyleSheet } from "react-native";

const NavigationButtons = ({
  onNext,
  onPrev,
  isNextDisabled,
  isPrevDisabled,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Previous" onPress={onPrev} disabled={isPrevDisabled} />
      <Button title="Next" onPress={onNext} disabled={isNextDisabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});

export default NavigationButtons;
