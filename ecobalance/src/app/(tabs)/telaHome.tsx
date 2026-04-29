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
  const [testes, setTestes] = useState<any[]>([]);
  const [scrollOffsetGraficos, setScrollOffsetGraficos] = useState(0);
  const [avancoChartWidth, setAvancoChartWidth] = useState(0);

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
        navigation.navigate("TelaCarregamento" as never);
        return;
      }

      Alert.alert("Erro", "Não foi possível carregar seus dados.");
    }
  }, [navigation]);

  const carregarTestes = useCallback(async () => {
    try {
      const response = await api.get("/testes/me");
      setTestes(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401) {
        await AsyncStorage.removeItem("@EcoBalance:token");
        navigation.navigate("TelaCarregamento" as never);
        return;
      }

      Alert.alert("Erro", "Não foi possível carregar seus testes.");
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      void carregarUsuario();
      void carregarTestes();
    }, [carregarUsuario, carregarTestes]),
  );
  const [scrollOffset, setScrollOffset] = useState(0);

  const formatarDataRealizacao = (data: any) => {
    const date = new Date(data);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("pt-BR");
  };

  const buildBars = (teste: any) => {
    const alimentos = Number(teste?.emissaoAlimentos) || 0;
    const gas = Number(teste?.emissaoGas) || 0;
    const veiculosTotal = Number(teste?.emissaoVeiculos) || 0;
    const energia = Number(teste?.energiaEletrica?.emissao) || 0;
    const viagens = Array.isArray(teste?.viagem?.veiculos)
      ? teste.viagem.veiculos.reduce((acc: number, v: any) => {
          return acc + (Number(v?.emissao) || 0);
        }, 0)
      : 0;
    const veiculosRotina = Math.max(veiculosTotal - viagens, 0);
    const max = Math.max(alimentos, gas, veiculosRotina, viagens, energia, 1);

    return [
      { key: "Alim", label: "Alim", value: alimentos, color: coresBase.verdeMedio, max },
      { key: "Gás", label: "Gás", value: gas, color: "#4C9F70", max },
      { key: "Veíc", label: "Veíc", value: veiculosRotina, color: "#2C6E49", max },
      { key: "Viag", label: "Viag", value: viagens, color: "#1B4332", max },
      { key: "Ener", label: "Ener", value: energia, color: "#8BC34A", max },
    ];
  };

  const ultimosTestesAvanco = testes.slice(0, 6).reverse();
  const valoresAvanco = ultimosTestesAvanco.map((t) => Number(t?.emissaoTotal) || 0);
  const minAvanco = Math.min(...valoresAvanco, 0);
  const maxAvanco = Math.max(...valoresAvanco, 1);

  const getPontoAvanco = (index: number, value: number) => {
    const count = ultimosTestesAvanco.length;
    const paddingLeft = 14;
    const paddingRight = 14;
    const paddingTop = 18;
    const paddingBottom = 18;
    const width = Math.max(avancoChartWidth, 1);
    const plotWidth = Math.max(width - paddingLeft - paddingRight, 1);
    const plotHeight = Math.max(170 - paddingTop - paddingBottom, 1);
    const x = count <= 1 ? paddingLeft + plotWidth / 2 : paddingLeft + (index / (count - 1)) * plotWidth;
    const denom = Math.max(maxAvanco - minAvanco, 1);
    const norm = (value - minAvanco) / denom;
    const y = paddingTop + (1 - norm) * plotHeight;
    return { x, y };
  };

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
                style={{ width: 360, height: 195, marginBottom: 10 }}
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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingHorizontal: 10,
        }}
      >
        <Text style={[StylesTelaHome.subtitulo, { marginTop: 50 }]}>
          Seu avanço:
        </Text>
      </View>

      <View style={{ paddingHorizontal: 4 }}>
        <View style={StylesTelaHome.avancoCard}>
          <View style={StylesTelaHome.avancoRow}>
            <View style={StylesTelaHome.avancoAxis}>
              <Text style={StylesTelaHome.avancoAxisText}>{maxAvanco.toFixed(1)}</Text>
              <Text style={StylesTelaHome.avancoAxisText}>
                {((maxAvanco + minAvanco) / 2).toFixed(1)}
              </Text>
              <Text style={StylesTelaHome.avancoAxisText}>{minAvanco.toFixed(1)}</Text>
            </View>
            <View
              style={StylesTelaHome.avancoChart}
              onLayout={(event) => setAvancoChartWidth(event.nativeEvent.layout.width)}
            >
              {[maxAvanco, (maxAvanco + minAvanco) / 2, minAvanco].map((v, idx) => {
                const y = getPontoAvanco(0, v).y;
                return (
                  <View
                    key={`grid-${idx}`}
                    style={[StylesTelaHome.avancoGridLine, { top: y }]}
                  />
                );
              })}

              {ultimosTestesAvanco.length <= 1
                ? null
                : ultimosTestesAvanco.map((t, i) => {
                    if (i === 0) return null;
                    const valuePrev =
                      Number(ultimosTestesAvanco[i - 1]?.emissaoTotal) || 0;
                    const valueCur = Number(t?.emissaoTotal) || 0;
                    const p1 = getPontoAvanco(i - 1, valuePrev);
                    const p2 = getPontoAvanco(i, valueCur);
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const length = Math.sqrt(dx * dx + dy * dy);
                    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                    const midX = (p1.x + p2.x) / 2;
                    const midY = (p1.y + p2.y) / 2;

                    return (
                      <View
                        key={`linha-${i}`}
                        style={[
                          StylesTelaHome.avancoLine,
                          {
                            width: length,
                            left: midX - length / 2,
                            top: midY - 1.5,
                            transform: [{ rotateZ: `${angle}deg` }],
                          },
                        ]}
                      />
                    );
                  })}

              {ultimosTestesAvanco.length === 0 ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 14,
                  }}
                >
                  <Text style={StylesTelaHome.avancoLegendaTexto}>
                    Faça alguns testes para acompanhar seu avanço.
                  </Text>
                </View>
              ) : (
                ultimosTestesAvanco.map((t, i) => {
                  const value = Number(t?.emissaoTotal) || 0;
                  const p = getPontoAvanco(i, value);
                  return (
                    <View
                      key={`ponto-${i}`}
                      style={[
                        StylesTelaHome.avancoDot,
                        { left: p.x - 5, top: p.y - 5 },
                      ]}
                    />
                  );
                })
              )}
            </View>
          </View>

          <View style={StylesTelaHome.avancoLegenda}>
            <Text style={StylesTelaHome.avancoLegendaTexto}>
              {ultimosTestesAvanco[0]
                ? formatarDataRealizacao(ultimosTestesAvanco[0]?.dataRealizacao || ultimosTestesAvanco[0]?.createdAt)
                : ""}
            </Text>
            <Text style={StylesTelaHome.avancoLegendaTexto}>
              {ultimosTestesAvanco[ultimosTestesAvanco.length - 1]
                ? formatarDataRealizacao(
                    ultimosTestesAvanco[ultimosTestesAvanco.length - 1]?.dataRealizacao ||
                      ultimosTestesAvanco[ultimosTestesAvanco.length - 1]?.createdAt,
                  )
                : ""}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingHorizontal: 10,
        }}
      >
        <Text style={StylesTelaHome.subtitulo}>
          Gráficos:
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Conquistas")}>
          <Text
            style={{
              color: coresBase.verdeMedio,
              fontSize: 12,
              fontStyle: "italic",
              textDecorationLine: "underline",
            }}
          >
            Ver todos
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "flex-start",
        }}
        horizontal={true}
        data={testes}
        keyExtractor={(item, index) =>
          (item?._id || item?.id || index).toString()
        }
        onScroll={(event) => {
          const totalWidth =
            event.nativeEvent.contentSize.width -
            event.nativeEvent.layoutMeasurement.width;
          const currentPos = event.nativeEvent.contentOffset.x;
          setScrollOffsetGraficos(totalWidth > 0 ? currentPos / totalWidth : 0);
        }}
        renderItem={({ item }) => {
          const bars = buildBars(item);
          const alturaMax = 112;

          return (
            <View style={StylesTelaHome.graficoCard}>
              <View style={StylesTelaHome.barrasContainer}>
                {bars.map((b) => {
                  const height = Math.max(6, (b.value / b.max) * alturaMax);
                  return (
                    <View key={b.key} style={StylesTelaHome.barraColuna}>
                      <Text style={StylesTelaHome.barraValor}>
                        {b.value.toFixed(1)}
                      </Text>
                      <View
                        style={[
                          StylesTelaHome.barra,
                          { height, backgroundColor: b.color },
                        ]}
                      />
                      <Text style={StylesTelaHome.barraLabel}>{b.label}</Text>
                    </View>
                  );
                })}
              </View>
                         <Text style={StylesTelaHome.graficoData}>
                {formatarDataRealizacao(item?.dataRealizacao || item?.createdAt)}
              </Text>
            </View>
          );
        }}
      />

      <View
        style={{
          width: "100%",
          height: 9,
          backgroundColor: coresBase.verdeClaro,
          alignSelf: "center",
          borderRadius: 25,
          marginBottom: 110,
        }}
      >
        <View
          style={{
            width: "40%",
            height: "100%",
            backgroundColor: coresBase.verdeMedio,
            borderRadius: 25,
            marginLeft: scrollOffsetGraficos * 200,
          }}
        />
      </View>
    </ScrollView>
  );
}
