import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import HomePage from "./pages/HomePage";
import LevelPage from "./pages/LevelPage";
import ResultsPage from "./pages/ResultPage";
import SplashScreen from "./pages/SplashScreen";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Level"
          component={LevelPage}
          options={{ title: "Questions" }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsPage}
          options={{ title: "Results" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
