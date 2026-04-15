import { coresBase, stylesGeral } from "@/src/styles/stylesGeral";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { StylesTelaHome } from "../../styles/telaHomeStyles";
import { fonte } from "@/src/styles/fontes";
import api from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/stackNavigator";
import { ScrollView } from "react-native-gesture-handler";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const avatarSources = [
  require("../../assets/avatars/avatar1.png"),
  require("../../assets/avatars/avatar2.png"),
  require("../../assets/avatars/avatar3.png"),
  require("../../assets/avatars/avatar4.png"),
  require("../../assets/avatars/avatar5.png"),
  require("../../assets/avatars/avatar6.png"),
  require("../../assets/avatars/avatar7.png"),
  require("../../assets/avatars/avatar8.png"),
  require("../../assets/avatars/avatar9.png"),
];

const conquistas = [
  {
    id: 1,
    titulo: "Primeiro teste",
    descricao: "Realizou seu primeiro teste de pegada de carbono",
    imagem: require("../../assets/trofeu.png"),
    desbloqueado: false,
  },
  {
    id: 2,
    titulo: "Primeira Redução",
    descricao: "Reduziu sua pegada de carbono pela primeira vez",
    imagem: require("../../assets/trofeu.png"),
    desbloqueado: false,
  },
  {
    id: 3,
    titulo: "1º Mês Sustentável",
    descricao: "Manteve uma pegada de carbono reduzida por um mês",
    imagem: require("../../assets/trofeu.png"),
    desbloqueado: false,
  },
  {
    id: 4,
    titulo: "3º Mês Sustentável",
    descricao: "Manteve uma pegada de carbono reduzida por três meses",
    imagem: require("../../assets/trofeu.png"),
    desbloqueado: false,
  },
];

const niveis = [
  {
    id: 1,
    imagemNivel: require("../../assets/nivel.png"),
    desbloqueado: false,
  },
];

export default function TelaHome() {
  const navigation = useNavigation<NavigationProp>();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [avatarSelecionado, setAvatarSelecionado] = useState(1);

  const carregarUsuario = useCallback(async () => {
    try {
      const response = await api.get("/users/me");
      setNomeUsuario(response.data?.usuario?.nome ?? "");
      setAvatarSelecionado(
        Number(response.data?.usuario?.avatarSelecionado) || 1,
      );
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401) {
        await AsyncStorage.removeItem("@EcoBalance:token");
        navigation.navigate("Conquistas");
        return;
      }

      Alert.alert("Erro", "Não foi possível carregar seus dados.");
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      void carregarUsuario();
    }, [carregarUsuario]),
  );
  const [scrollOffset, setScrollOffset] = useState(0);

  return (
    <ScrollView style={stylesGeral.telaInteira}>
      <View>
        <View style={StylesTelaHome.cabecalho}>
          <View>
            <Image
              source={avatarSources[(avatarSelecionado || 1) - 1]}
              style={StylesTelaHome.avatar}
            />
          </View>
          <View>
            <Text style={StylesTelaHome.olaTitulo}>
              Bem vindo ao EcoBalance
            </Text>
            <Text style={[StylesTelaHome.titulo, { marginBottom: 4 }]}>
              {nomeUsuario ? `Olá, ${nomeUsuario}!` : "Olá!"}
            </Text>
          </View>
        </View>
        <FlatList
          data={niveis}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={item.imagemNivel}
                style={{ width: 350, height: 190, marginBottom: 10 }}
              />
            </View>
          )}
        />
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingHorizontal: 10,
            }}
          >
            <Text style={StylesTelaHome.subtitulo}>Últimas Conquistas: </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Conquistas")}
            >
              <Text
                style={{
                  color: coresBase.verdeMedio,
                  fontSize: 12,
                  fontStyle: "italic",
                  textDecorationLine: "underline",
                  marginBottom: 0,
                }}
              >
                Ver todas
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
              alignItems: "center",
            }}
            horizontal={true}
            data={conquistas}
            keyExtractor={(item) => item.id.toString()}
            onScroll={(event) => {
              const totalWidth =
                event.nativeEvent.contentSize.width -
                event.nativeEvent.layoutMeasurement.width;
              const currentPos = event.nativeEvent.contentOffset.x;
              setScrollOffset(currentPos / totalWidth); // Valor entre 0 e 1
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  opacity: item.desbloqueado ? 1 : 0.4, // cinza se bloqueado
                }}
              >
                <View style={{ marginTop: 10 }}>
                  <Image
                    source={item.imagem}
                    style={StylesTelaHome.trofeuIcon}
                  />
                  <Text style={StylesTelaHome.iconeTexto}>{item.titulo}</Text>
                  {/* <Text>{item.descricao}</Text> */}
                </View>
              </View>
            )}
          />

          <View
            style={{
              width: "100%",
              height: 9,
              backgroundColor: coresBase.verdeClaro,
              alignSelf: "center",
              borderRadius: 25,
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: "80%",
                height: "100%",
                backgroundColor: coresBase.verdeMedio,
                borderRadius: 25,
                marginLeft: scrollOffset * 70,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
