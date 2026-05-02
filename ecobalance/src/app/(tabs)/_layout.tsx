import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from "expo-notifications";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Jost-Regular': require('../../assets/fonts/Jost-Regular.ttf'),
    'Jost-Bold': require('../../assets/fonts/Jost-Bold.ttf'),
    'Jost-Italic': require('../../assets/fonts/Jost-Italic.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define a ordem e os nomes das telas na pilha */}
      <Stack.Screen name="index" /> 
      <Stack.Screen name="telaInicial" />
      <Stack.Screen name="telaCadastro" />
      <Stack.Screen name="telaLogin" />
    </Stack>
  );
}
