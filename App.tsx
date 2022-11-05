import React, { useState } from 'react';
import { Text, Image } from "react-native"; 
import * as Font from 'expo-font';
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from 'expo-asset';
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from 'react-native';
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  //const [ assets ] = useAssets(["./sungsim.jpg"]);
  const [ loaded ] = Font.useFonts(Ionicons.font);
 

  const isDark = useColorScheme() === "dark";
  

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
