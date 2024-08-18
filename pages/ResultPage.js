import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import questionBank from "../data/QuestionBank";

const ResultsPage = ({ route, navigation }) => {
  const { level } = route.params;
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const getResultFromStorage = async () => {
      try {
        const result = await AsyncStorage.getItem(`level_${level}_result`);

        if (result) {
          const parsedResult = JSON.parse(result);
          const questions = parsedResult.selectedOptions;
          const total =
            questionBank?.find((i) => i?.level === level)?.questions?.length ||
            Object.keys(questions).length;
          const correctAnswers = calculateScore(questions);

          setScore(correctAnswers);
          setTotalQuestions(total);
          const isPassed = correctAnswers >= total * 0.6; // 60% passing rate
          setPassed(isPassed);

          if (isPassed) {
            await AsyncStorage.setItem(`level_${level}_completed`, "true");
          }
        }
      } catch (error) {
        console.error("Failed to load result from local storage", error);
      }
    };

    getResultFromStorage();
  }, [level]);

  const calculateScore = (questions) => {
    const levelQuestions = questionBank.find((q) => q.level == level).questions;
    let correctCount = 0;

    Object.keys(questions).forEach((key) => {
      const selectedAnswer = questions[key];
      const correctAnswer = levelQuestions[key].options;

      if (levelQuestions[key].answer === correctAnswer[selectedAnswer]) {
        correctCount++;
      }
    });

    return correctCount;
  };

  const handleButtonPress = () => {
    if (level + 1 === questionBank.length) {
      navigation.navigate("Home");
    }
    if (passed) {
      navigation.navigate("Level", { level: level + 1 });
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        You scored {score}/{totalQuestions}
      </Text>
      <Text style={styles.resultText}>
        {passed ? "Congratulations, you passed!" : "You failed, try again!"}
      </Text>
      <View>
        <Button
          title={
            level + 1 === questionBank.length
              ? "Finish the Game"
              : passed
              ? "Continue to Next Level"
              : "Back to Home"
          }
          onPress={handleButtonPress}
        />
        {passed && (
          <Button
            title={"Back to Home"}
            onPress={() => navigation.navigate("Home")}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  resultText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default ResultsPage;
