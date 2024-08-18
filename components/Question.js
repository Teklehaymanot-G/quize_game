// Question.js
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Options from "./Option";

const Question = ({
  currentQuestionIndex,
  question,
  selectedOption,
  onSelectOption,
  answer,
}) => {
  const radioButtonsData = question.options.map((option, index) => ({
    id: `${index}`,
    label: option,
    value: option,
    selected: selectedOption === option,
  }));

  return (
    <View>
      <Text style={styles.questionText}>{question.question}</Text>
      {question.image && (
        <Image
          source={{ uri: question.image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Options
        radioButtons={radioButtonsData}
        onPress={onSelectOption}
        containerStyle={styles.radioGroup}
        answer={answer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  questionNumber: {
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: "#FF0000",
    color: "#FFFFFF",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    minHeight: 200,
    marginBottom: 20,
  },
  radioGroup: {
    alignItems: "flex-start",
    marginTop: 10,
  },
});

export default Question;
