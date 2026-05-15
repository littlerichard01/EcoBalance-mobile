import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../app/(tabs)/telaHome";
import TelaPerfil from "../app/(tabs)/telaPerfil";
import TelaConquistas from "../app/(tabs)/telaConquistas";
import { Image } from 'react-native';
import { coresBase, stylesGeral } from "../styles/stylesGeral";
import { CalculoFlow, RotinaFlow } from "./stackNavigator";

const Tab = createBottomTabNavigator();

const ICON_CALCULO = require("../assets/iconCalculo.png");
const ICON_ROTINA = require("../assets/iconRotina.png");
const ICON_MENU = require("../assets/iconMenu.png");
const ICON_CONQUISTAS = require("../assets/iconConquistas.png");
const ICON_PERFIL = require("../assets/iconPerfil.png");

const TabIcon = ({
  source,
  focused,
  size,
}: {
  source: any;
  focused: boolean;
  size?: { width: number; height: number };
}) => {
  return (
    <Image
      source={source}
      style={[
        stylesGeral.icon,
        size ? { width: size.width, height: size.height } : null,
        { tintColor: focused ? coresBase.verdeSaturado : coresBase.verdeBebe },
      ]}
    />
  );
};

const calculosTabBarIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon source={ICON_CALCULO} focused={focused} />
);

const rotinaTabBarIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon source={ICON_ROTINA} focused={focused} size={{ width: 42, height: 42 }} />
);

const homeTabBarIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon source={ICON_MENU} focused={focused} />
);

const conquistasTabBarIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon source={ICON_CONQUISTAS} focused={focused} size={{ width: 38, height: 38 }} />
);

const perfilTabBarIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon source={ICON_PERFIL} focused={focused} size={{ width: 30, height: 30 }} />
);

export function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "white",
        tabBarStyle: stylesGeral.tabBarStyle
      }}
    >
      <Tab.Screen 
  name="Calculos" 
  component={CalculoFlow} 
  options={{
    tabBarIcon: calculosTabBarIcon,
  }}
/>
      <Tab.Screen 
        name="Rotina" 
        component={RotinaFlow} 
        options={{
    tabBarIcon: rotinaTabBarIcon,
  }}
        />
      <Tab.Screen 
        name="Home" 
        component={Home} 
          options={{
    tabBarIcon: homeTabBarIcon,
  }}/>
      <Tab.Screen 
        name="Conquistas" 
        component={TelaConquistas} 
          options={{
    tabBarIcon: conquistasTabBarIcon,
  }}/>
      <Tab.Screen 
        name="Perfil" 
        component={TelaPerfil} 
          options={{
    tabBarIcon: perfilTabBarIcon,
  }}/>
      
   
    </Tab.Navigator>
  );
}
