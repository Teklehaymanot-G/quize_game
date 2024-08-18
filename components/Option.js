// Question.js
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const choicesName = ["A", "B", "C", "D"];

const Options = ({
  accessibilityLabel,
  containerStyle,
  layout = "column",
  onPress,
  radioButtons,
  selectedId,
  testID,
  answer,
}) => {
  function handlePress(id) {
    if (id !== selectedId) {
      if (onPress) {
        onPress(id);
      }
      const button = radioButtons.find((rb) => rb.id === id);
      if (button?.onPress) {
        button.onPress(id);
      }
    }
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="radiogroup"
      style={[styles.container, { flexDirection: layout }, containerStyle]}
      testID={testID}
    >
      {/* {radioButtons.map((button) => (
      <RadioButton
        {...button}
        key={button.id}
        labelStyle={button.labelStyle || labelStyle}
        selected={button.id === selectedId}
        onPress={handlePress}
      />
    ))} */}

      <View style={styles.options}>
        {radioButtons.map((button, index) => (
          <TouchableHighlight
            key={index}
            style={styles.container}
            underlayColor={"COLOR"}
            onPress={() => handlePress(button?.id || "")}
          >
            <View style={styles.choice}>
              <Text style={styles.choiceName}>{choicesName[index]}</Text>
              <View
                style={
                  answer
                    ? styles.choiceLabelContainerAnswered
                    : styles.choiceLabelContainer
                }
              >
                <Text style={styles.choiceLabel}>{button.label}</Text>
              </View>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  options: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 2,
  },
  choice: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 15,
  },
  choiceName: {
    fontSize: 20,
    backgroundColor: "#E32D91",
    color: "#FFF",
    paddingHorizontal: 10,
  },
  choiceLabelContainer: {
    backgroundColor: "#8971E1",
    paddingHorizontal: 10,
    width: "88%",
  },
  choiceLabelContainerAnswered: {
    backgroundColor: "#4AACC5",
    paddingHorizontal: 10,
    width: "88%",
  },
  choiceLabel: {
    fontSize: 20,
    color: "#FFF",
  },
});
export default Options;
