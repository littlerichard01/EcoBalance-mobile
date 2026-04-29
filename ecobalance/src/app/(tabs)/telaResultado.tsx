import { BotaoRetornar } from "@/src/components/botaoRetornar";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { coresBase, stylesGeral } from "@/src/styles/stylesGeral";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { styleTelaResultado } from "@/src/styles/telaResultadoStyles";
import { stylesTelaRotina } from "@/src/styles/telaRotinaStyle";

const MEDIA_GLOBAL = {
  total: 243.19,
  gas: 18.1678775,
  energia: 5.8597,
  alimentos: 139.159,
  veiculos: 80,
  viagens: 0,
};

export default function ResultadoCalculo() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "ResultadoCalculo">>();
  const { teste, rotinaNome } = route.params;

  const emissaoAlimentos = Number(teste?.emissaoAlimentos) || 0;
  const emissaoGas = Number(teste?.emissaoGas) || 0;
  const emissaoVeiculosTotal = Number(teste?.emissaoVeiculos) || 0;
  const emissaoEnergia =
    Number(teste?.energiaEletrica?.emissao) ||
    Math.max(
      (Number(teste?.emissaoTotal) || 0) -
        emissaoAlimentos -
        emissaoGas -
        emissaoVeiculosTotal,
      0,
    );
  const emissaoViagens = Array.isArray(teste?.viagem?.veiculos)
    ? teste.viagem.veiculos.reduce(
        (acc, v) => acc + (Number(v?.emissao) || 0),
        0,
      )
    : 0;
  const emissaoVeiculosRotina = Math.max(
    emissaoVeiculosTotal - emissaoViagens,
    0,
  );

  const dataRealizacao = (() => {
    const raw = teste?.dataRealizacao || teste?.createdAt;
    const date = new Date(raw as any);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("pt-BR");
  })();

  const barrasUsuario = [
    {
      key: "Alim",
      label: "Alim",
      value: emissaoAlimentos,
      color: coresBase.verdeMedio,
    },
    { key: "Gás", label: "Gás", value: emissaoGas, color: "#4C9F70" },
    {
      key: "Veíc",
      label: "Veíc",
      value: emissaoVeiculosRotina,
      color: "#2C6E49",
    },
    { key: "Viag", label: "Viag", value: emissaoViagens, color: "#1B4332" },
    { key: "Ener", label: "Ener", value: emissaoEnergia, color: "#8BC34A" },
  ];
  const barrasGlobal = [
    {
      key: "Alim",
      label: "Alim",
      value: MEDIA_GLOBAL.alimentos,
      color: coresBase.verdeMedio,
    },
    { key: "Gás", label: "Gás", value: MEDIA_GLOBAL.gas, color: "#4C9F70" },
    {
      key: "Veíc",
      label: "Veíc",
      value: MEDIA_GLOBAL.veiculos,
      color: "#2C6E49",
    },
    {
      key: "Ener",
      label: "Ener",
      value: MEDIA_GLOBAL.energia,
      color: "#8BC34A",
    },
  ];
  const maxUsuario = Math.max(...barrasUsuario.map((b) => b.value), 1);
  const maxGlobal = Math.max(...barrasGlobal.map((b) => b.value), 1);

  const totalUsuario = Number(teste?.emissaoTotal || 0);
  const ehSustentavel = totalUsuario < MEDIA_GLOBAL.total;

  return (
    <ScrollView style={stylesGeral.telaInteira}>
      <View>
              <View style={stylesTelaRotina.cabecarioTela}>
                <View style={stylesTelaRotina.rotinaIconContainer}>
                  <Image
                    source={require("../../assets/icongrafico.png")}
                    style={[stylesTelaRotina.rotinaIcon, { width: 40, height: 40 }]}
                  />
                </View>
                <Text style={stylesGeral.tituloPagina}>Resultado: </Text>
              </View>
              </View>

      <View
        style={[
          styleTelaResultado.feedbackContainer,
          {
            backgroundColor: ehSustentavel
              ? coresBase.verdeBebe
              : coresBase.verdeBebe,
          },
        ]}
      >
        <Text>
          {ehSustentavel ? (
            <View>
              <Text
                style={[
                  styleTelaResultado.feedbackTextoTitulo,
                  { color: coresBase.verdeMedio },
                ]}
              >
                Parabéns!
              </Text>
              <Text style={styleTelaResultado.feedbackTexto}>
                Sua pegada está abaixo da média global. Continue assim!
              </Text>
              <Text style={styleTelaResultado.feedbackEmoji}>🌱</Text>
            </View>
          ) : (
            <View>
              <Text style={styleTelaResultado.feedbackTextoTitulo}>Cuidado!</Text>
              <Text style={styleTelaResultado.feedbackTexto}>
                Sua pegada está acima da média global. Veja algumas de nossas
                recomendações que podem te ajudar!
              </Text>
              <Text style={styleTelaResultado.feedbackEmoji}>⚠️</Text>
            </View>
          )}
        </Text>
      </View>

      <Text style={styleTelaResultado.secaoTitulo}>Seu teste:</Text>
      <View style={styleTelaResultado.graficoContainer}>
        {barrasUsuario.map((b) => {
          const altura = Math.max(10, (b.value / maxUsuario) * 165);
          return (
            <View key={b.key} style={styleTelaResultado.barraColuna}>
              <Text style={styleTelaResultado.barraValor}>{b.value.toFixed(1)}</Text>
              <View
                style={[
                  styleTelaResultado.barra,
                  { height: altura, backgroundColor: b.color },
                ]}
              />
              <Text style={styleTelaResultado.barraLabel}>{b.label}</Text>
            </View>
          );
        })}
      </View>
              <View style={styleTelaResultado.totalComparacao}>
          <Text style={styleTelaResultado.totalComparacaoLabel}>Seu total:  
            {Number(teste?.emissaoTotal || 0).toFixed(2)} kgCO₂
          </Text>
        </View>

      <Text style={styleTelaResultado.secaoTitulo}>Média global:</Text>
      <View style={styleTelaResultado.graficoContainer}>
        {barrasGlobal.map((b) => {
          const altura = Math.max(10, (b.value / maxGlobal) * 165);
          return (
            <View key={b.key} style={styleTelaResultado.barraColuna}>
              <Text style={styleTelaResultado.barraValor}>{b.value.toFixed(1)}</Text>
              <View
                style={[
                  styleTelaResultado.barra,
                  { height: altura, backgroundColor: b.color },
                ]}
              />
              <Text style={styleTelaResultado.barraLabel}>{b.label}</Text>
            </View>
          );
        })}
      </View>

      <View style={styleTelaResultado.totalComparacao}>
        <Text style={styleTelaResultado.totalComparacaoLabel}>
          Total global: {MEDIA_GLOBAL.total.toFixed(2)} kgCO₂
        </Text>
      </View>

      <View style={styleTelaResultado.containerInfo}>
        {rotinaNome ? (
          <Text style={styleTelaResultado.resultadoMeta}>Rotina: {rotinaNome}</Text>
        ) : null}
        {dataRealizacao ? (
          <Text style={styleTelaResultado.resultadoMeta}>Data: {dataRealizacao}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

