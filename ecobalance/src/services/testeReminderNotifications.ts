import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const STORAGE_NOTIFICATION_ID = "@EcoBalance:testeReminderNotificationId";
const STORAGE_ENABLED = "@EcoBalance:testeReminderEnabled";
const TRIGGER_SECONDS = 60 * 60 * 24 * 30;

const garantirPermissao = async () => {
  const perms = await Notifications.getPermissionsAsync();
  if (perms.granted) return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
};

export const cancelarLembreteTeste = async () => {
  const id = await AsyncStorage.getItem(STORAGE_NOTIFICATION_ID);
  if (id) {
    await Notifications.cancelScheduledNotificationAsync(id);
    await AsyncStorage.removeItem(STORAGE_NOTIFICATION_ID);
  }
};

export const agendarLembreteTeste = async () => {
  const ok = await garantirPermissao();
  if (!ok) return false;

  await cancelarLembreteTeste();

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "EcoBalance",
      body: "Está na hora de realizar seu teste mensal de cálculo de carbono.",
    },
    trigger: { seconds: TRIGGER_SECONDS, repeats: true },
  });

  await AsyncStorage.setItem(STORAGE_NOTIFICATION_ID, id);
  return true;
};

export const setLembreteTesteHabilitado = async (habilitado: boolean) => {
  await AsyncStorage.setItem(STORAGE_ENABLED, habilitado ? "true" : "false");

  if (!habilitado) {
    await cancelarLembreteTeste();
    return;
  }

  await agendarLembreteTeste();
};

export const reagendarLembreteTesteSeHabilitado = async () => {
  const enabled = (await AsyncStorage.getItem(STORAGE_ENABLED)) === "true";
  if (!enabled) return;
  await agendarLembreteTeste();
};
