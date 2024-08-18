import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={
          "https://th.bing.com/th/id/R.7fad8e0d6e5a2b56359877594150f491?rik=NZeFFhMo7WzGMA&pid=ImgRaw&r=0"
        }
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
  },
});

export default SplashScreen;
