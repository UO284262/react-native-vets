import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const FadeInAnimation = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View //special animatable View
      style={{
        opacity: fadeAnim, //bind opacity to animated value
      }}
    >
      {children}
    </Animated.View>
  );
};
