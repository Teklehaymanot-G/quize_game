import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NavigationButtons from "../components/NavigationButtons";
import Question from "../components/Question";
import StatusIndicator from "../components/StatusIndicator";
import questionBank from "../data/QuestionBank";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LevelPage = ({ route, navigation }) => {
  const { level } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answers, setAnswers] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(100);
  const questions = questionBank.find((q) => q.level === level).questions;

  useEffect(() => {
    if (timer === 0) {
      saveResultToLocalStorage();
      Alert.alert("Time is up!", "Redirecting to results page.");
      navigation.navigate("Results", { elapsedTime, selectedOptions, level });
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, navigation]);

  useEffect(() => {
    if (questions) {
      setAnswers(
        questions.map((_, index) => ({
          question: index,
          selected: null,
        }))
      );
    }
  }, [questions]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      Alert.alert("No more questions!", "You are on the last question.");
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      Alert.alert("No previous questions!", "You are on the first question.");
    }
  };

  const handleAnswerSelection = (selectedRadioButton) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: selectedRadioButton,
    });

    const newState = answers.map((i) => {
      if (i.question === currentQuestionIndex)
        return { question: i.question, selected: selectedRadioButton };
      return i;
    });

    setAnswers(newState);
  };

  const saveResultToLocalStorage = async () => {
    try {
      const result = {
        level,
        selectedOptions,
        elapsedTime,
      };
      await AsyncStorage.setItem(
        `level_${level}_result`,
        JSON.stringify(result)
      );
      console.log("Result saved to local storage");
    } catch (error) {
      console.error("Failed to save result to local storage", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.questionHeader}>
          Question {currentQuestionIndex + 1}:
        </Text>
        <Question
          currentQuestionIndex={currentQuestionIndex}
          question={questions[currentQuestionIndex]}
          selectedOption={selectedOptions[currentQuestionIndex]}
          onSelectOption={handleAnswerSelection}
          answers={answers?.find(
            (i) => i?.question?.toString() === currentQuestionIndex?.toString()
          )}
        />
        <NavigationButtons
          onNext={handleNext}
          onPrev={handlePrev}
          isNextDisabled={currentQuestionIndex === questions.length - 1}
          isPrevDisabled={currentQuestionIndex === 0}
        />
        <StatusIndicator
          questions={questions}
          selectedOptions={selectedOptions}
        />
        <View style={styles.bottom}>
          <Text style={styles.timer}>Time Left: {timer}s</Text>
          <TouchableOpacity
            style={styles.endQuizButton}
            onPress={async () => {
              saveResultToLocalStorage();
              navigation.navigate("Results", {
                elapsedTime,
                selectedOptions,
                level,
              });
            }}
          >
            <Text style={styles.endQuizText}>End Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  questionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timer: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  endQuizButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
  },
  endQuizText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default LevelPage;
