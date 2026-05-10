import { coresBase, stylesGeral } from "@/src/styles/stylesGeral";
import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { StylesTelaHome } from "../../styles/telaHomeStyles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/stackNavigator";
import { ScrollView } from "react-native-gesture-handler";
import { conquistasDef } from "@/src/constants/conquistas";
import { fetchConquistasMe, fetchTestesMe, fetchUsuarioMe } from "@/src/services/meApi";
import { loadOrLogout } from "@/src/utils/loadOrLogout";
import { GraficoTestesHorizontal } from "@/src/components/graficoTestesHorizontal";
import { formatarDataPtBr } from "@/src/utils/dateFormat";

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

const bannerNivelSources = [
  require("../../assets/niveis/bannerNivel1.png"),
  require("../../assets/niveis/bannerNivel2.png"),
  require("../../assets/niveis/bannerNivel3.png"),
  require("../../assets/niveis/bannerNivel4.png"),
];

export default function TelaHome() {
  const navigation = useNavigation<NavigationProp>();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [avatarSelecionado, setAvatarSelecionado] = useState(1);
  const [testes, setTestes] = useState<any[]>([]);
  const [conquistasUsuario, setConquistasUsuario] = useState<any[]>([]);
  const [avancoChartWidth, setAvancoChartWidth] = useState(0);
  const experiencia = testes.length;

  const nivelAtual = useMemo(() => {
    if (experiencia >= 9) return 4;
    if (experiencia >= 5) return 3;
    if (experiencia >= 2) return 2;
    return 1;
  }, [experiencia]);

  const proximoLimite = useMemo(() => {
    if (nivelAtual === 1) return 2;
    if (nivelAtual === 2) return 5;
    if (nivelAtual === 3) return 9;
    return null;
  }, [nivelAtual]);

  const faltamTestes = useMemo(() => {
    if (proximoLimite === null) return 0;
    return Math.max(proximoLimite - experiencia, 0);
  }, [experiencia, proximoLimite]);

  const mensagemProximoNivel = useMemo(() => {
    if (proximoLimite === null) return "Você já está no nível máximo!";
    if (faltamTestes === 1) {
      return "Quase lá! falta só 1 teste para o próximo level.";
    }
    return `Faltam ${faltamTestes} testes para o próximo level!`;
  }, [faltamTestes, proximoLimite]);

  const carregarUsuario = useCallback(async () => {
    await loadOrLogout(
      navigation,
      fetchUsuarioMe,
      (usuario) => {
        setNomeUsuario(usuario?.nome ?? "");
        setAvatarSelecionado(Number(usuario?.avatarSelecionado) || 1);
      },
      "Não foi possível carregar seus dados.",
    );
  }, [navigation]);

  const carregarTestes = useCallback(async () => {
    await loadOrLogout(
      navigation,
      fetchTestesMe,
      setTestes,
      "Não foi possível carregar seus testes.",
    );
  }, [navigation]);

  const carregarConquistas = useCallback(async () => {
    await loadOrLogout(
      navigation,
      fetchConquistasMe,
      setConquistasUsuario,
      "Não foi possível carregar suas conquistas.",
    );
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      carregarUsuario();
      carregarTestes();
      carregarConquistas();
    }, [carregarUsuario, carregarTestes, carregarConquistas]),
  );
  const [scrollOffset, setScrollOffset] = useState(0);

  const ultimosTestesAvanco = testes.slice(0, 6).reverse();
  const valoresAvanco = ultimosTestesAvanco.map((t) => Number(t?.emissaoTotal) || 0);
  const minAvanco = Math.min(...valoresAvanco, 0);
  const maxAvanco = Math.max(...valoresAvanco, 1);

  const getTesteKey = (t: any) => {
    const raw = t?._id || t?.id || t?.dataRealizacao || t?.createdAt;
    if (raw) return String(raw);
    const emissao = Number(t?.emissaoTotal);
    if (Number.isFinite(emissao)) return `emissao-${emissao}`;
    return "teste";
  };

  const mapaConquistas = new Map(
    (Array.isArray(conquistasUsuario) ? conquistasUsuario : []).map((c: any) => [c?.nome, c]),
  );
  const conquistasComStatus = conquistasDef.map((c) => {
    const server = mapaConquistas.get(c.nome);
    return {
      ...c,
      desbloqueado: Boolean(server?.ativa),
      data: server?.data ?? null,
    };
  });
  const ultimasConquistas = (() => {
    const desbloqueadas = conquistasComStatus
      .filter((c) => c.desbloqueado && c.data)
      .sort((a: any, b: any) => new Date(b.data).getTime() - new Date(a.data).getTime());

    if (desbloqueadas.length > 0) return desbloqueadas.slice(0, 4);
    return conquistasComStatus.slice(0, 4);
  })();

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
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={bannerNivelSources[nivelAtual - 1]}
            style={{ width: "100%", height: 180 }}
          />
        </View>
        <Text
          style={{
            marginTop: 8,
            alignSelf: "center",
            color: coresBase.verdeEscuro,
            fontSize: 13,
            fontStyle: "italic",
            fontWeight: "500",
          }}
        >
          {mensagemProximoNivel}
        </Text>
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
            data={ultimasConquistas}
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
              {[
                { id: "max", value: maxAvanco },
                { id: "mid", value: (maxAvanco + minAvanco) / 2 },
                { id: "min", value: minAvanco },
              ].map(({ id, value }) => {
                const y = getPontoAvanco(0, value).y;
                return (
                  <View
                    key={`grid-${id}`}
                    style={[StylesTelaHome.avancoGridLine, { top: y }]}
                  />
                );
              })}

              {ultimosTestesAvanco.length <= 1
                ? null
                : ultimosTestesAvanco.map((t, i) => {
                    if (i === 0) return null;
                    const prevKey = getTesteKey(ultimosTestesAvanco[i - 1]);
                    const curKey = getTesteKey(t);
                    const valuePrev =
                      Number(ultimosTestesAvanco[i - 1]?.emissaoTotal) || 0;
                    const valueCur = Number(t?.emissaoTotal) || 0;
                    const p1 = getPontoAvanco(i - 1, valuePrev);
                    const p2 = getPontoAvanco(i, valueCur);
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const length = Math.hypot(dx, dy);
                    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                    const midX = (p1.x + p2.x) / 2;
                    const midY = (p1.y + p2.y) / 2;

                    return (
                      <View
                        key={`linha-${prevKey}-${curKey}`}
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
                  const testeKey = getTesteKey(t);
                  const value = Number(t?.emissaoTotal) || 0;
                  const p = getPontoAvanco(i, value);
                  return (
                    <View
                      key={`ponto-${testeKey}`}
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
                ? formatarDataPtBr(ultimosTestesAvanco[0]?.dataRealizacao || ultimosTestesAvanco[0]?.createdAt)
                : ""}
            </Text>
            <Text style={StylesTelaHome.avancoLegendaTexto}>
              {ultimosTestesAvanco[ultimosTestesAvanco.length - 1]
                ? formatarDataPtBr(
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

      <GraficoTestesHorizontal
        testes={testes}
        indicadorLarguraFator={0.4}
        contentContainerStyle={{ alignItems: "flex-start" }}
        marginBottom={100}
      />
    </ScrollView>
  );
}
