import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import questionBank from "../data/QuestionBank";

const HomePage = ({ navigation }) => {
  const [unlockedLevels, setUnlockedLevels] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [isResetting, setIsResetting] = useState(false); // Flag to handle reset state

  useEffect(() => {
    if (isResetting) return; // Prevent running the initialization while resetting

    const initialize = async () => {
      try {
        let highestLevelCompleted = 1;
        let accumulatedScore = 0;
        const unlockedLevels = {};

        for (let level = 1; level <= questionBank.length; level++) {
          const levelCompleted = await AsyncStorage.getItem(
            `level_${level}_completed`
          );
          const levelResult = await AsyncStorage.getItem(
            `level_${level}_result`
          );

          if (levelCompleted === "true") {
            highestLevelCompleted = level;
          }

          if (levelResult) {
            const parsedResult = JSON.parse(levelResult);
            const questions = parsedResult.selectedOptions;
            const levelScore = calculateScore(questions, level);
            accumulatedScore += levelScore;
          }

          unlockedLevels[`level${level}`] = level <= highestLevelCompleted + 1;
        }

        setCurrentLevel(highestLevelCompleted + 1);
        setTotalScore(accumulatedScore);
        setUnlockedLevels(unlockedLevels);
      } catch (error) {
        console.error(
          "Failed to load level status or scores from local storage",
          error
        );
      }
    };

    initialize();
  }, [isResetting]);

  const calculateScore = (questions, level) => {
    const levelQuestions = questionBank.find(
      (q) => q.level === level
    ).questions;
    let correctCount = 0;

    Object.keys(questions).forEach((key) => {
      const selectedAnswer = questions[key];
      const correctAnswer = levelQuestions[key].correctAnswer;
      if (selectedAnswer === correctAnswer) {
        correctCount++;
      }
    });

    return correctCount;
  };

  const handleStartLevel = (level) => {
    navigation.navigate("Level", { level });
  };

  const clearAsyncStorage = async () => {
    try {
      setIsResetting(true);
      await AsyncStorage.clear();
      setCurrentLevel(1);
      setTotalScore(0);
      setUnlockedLevels({ level1: true });
      setIsResetting(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.error("Failed to clear AsyncStorage", error);
      setIsResetting(false); // Ensure resetting state is turned off even on error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.header}>Multiple Choice Game</Text>
        <Text style={styles.subHeader}>Current Level: {currentLevel}</Text>
        <Text style={styles.subHeader}>Total Score: {totalScore}</Text>
        <View style={styles.levelContainer}>
          {questionBank.map((_, index) => {
            const level = index + 1;
            return (
              <Button
                key={level}
                title={`Start Level ${level}`}
                onPress={() => handleStartLevel(level)}
                disabled={!unlockedLevels[`level${level}`]}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.restartContainer}>
        <Button title="Restart Game" onPress={clearAsyncStorage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  containerTop: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  levelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  restartContainer: {
    marginBottom: 20,
  },
});

export default HomePage;
