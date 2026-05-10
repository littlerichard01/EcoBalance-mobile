import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const isUnauthorized = (error: any) => error?.response?.status === 401;

export const logoutAndRedirect = async (navigation: any) => {
  await AsyncStorage.removeItem("@EcoBalance:token");
  navigation.navigate("TelaCarregamento");
};

export const loadOrLogout = async <T,>(
  navigation: any,
  loader: () => Promise<T>,
  onSuccess: (data: T) => void,
  errorMessage: string,
) => {
  try {
    onSuccess(await loader());
  } catch (error: any) {
    if (isUnauthorized(error)) {
      await logoutAndRedirect(navigation);
      return;
    }
    Alert.alert("Erro", errorMessage);
  }
};
