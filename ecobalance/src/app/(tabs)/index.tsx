import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "../../navigation/stackNavigator";
import { IndexStyles } from "@/src/styles";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <View style={IndexStyles.container}>
      <MyStack />

    </View>
    </GestureHandlerRootView>

  );
}
