import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "../../navigation/stackNavigator";
import { IndexStyles } from "@/src/styles";

export default function App() {
  return (

      <View style={IndexStyles.container}>
        <MyStack /> 
      </View>

  );
}
