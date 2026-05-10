import { BotaoRetornar } from "@/src/components/botaoRetornar";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { coresBase, stylesGeral } from "@/src/styles/stylesGeral";
import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
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
  const { teste, rotinaNome, novasConquistas } = route.params;
  const [filaConquistas, setFilaConquistas] = useState<string[]>([]);

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

  const conquistasInfo = useMemo(
    () => ({
      primeiro_teste: {
        titulo: "Primeiro teste",
        imagem: require("../../assets/conquistas/conquistaPrimeiroTeste.png"),
      },
      abaixo_media_global: {
        titulo: "Abaixo da média global",
        imagem: require("../../assets/conquistas/conquistaAbaixoMedia.png"),
      },
      abaixo_media_global_2: {
        titulo: "Abaixo da média global II",
        imagem: require("../../assets/conquistas/conquistaAbaixoMedia2.png"),
      },
      melhoria_pessoal: {
        titulo: "Melhoria pessoal",
        imagem: require("../../assets/conquistas/conquistaMelhoriaPessoal.png"),
      },
      melhoria_pessoal_2: {
        titulo: "Melhoria pessoal II",
        imagem: require("../../assets/conquistas/conquistaMelhoriaPessoal2.png"),
      },
    }),
    [],
  );

  useEffect(() => {
    if (Array.isArray(novasConquistas) && novasConquistas.length > 0) {
      setFilaConquistas(novasConquistas.filter(Boolean));
    }
  }, [novasConquistas]);

  const conquistaAtual = filaConquistas[0] || null;
  const modalVisivel = Boolean(conquistaAtual);
  const infoConquistaAtual = conquistaAtual
    ? (conquistasInfo as any)[conquistaAtual] || { titulo: conquistaAtual, imagem: null }
    : null;

  const fecharModal = () => {
    setFilaConquistas((prev) => prev.slice(1));
  };

  const reiniciarTeste = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "TelaCalculos" as never }],
      }),
    );
  };

  return (
    <ScrollView style={stylesGeral.telaInteira}>
      <View>
        <View style={stylesTelaRotina.cabecarioTela}>
          <BotaoRetornar onPress={reiniciarTeste} />
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
            backgroundColor: coresBase.verdeBebe,
          },
        ]}
      >
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
        <Text style={styleTelaResultado.totalComparacaoLabel}>
          Seu total: {Number(teste?.emissaoTotal || 0).toFixed(2)} kgCO₂
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

      <View style={stylesRecomendacoes.container}>
        {[
          { key: "Alimentos", usuario: emissaoAlimentos, media: MEDIA_GLOBAL.alimentos },
          { key: "Gás", usuario: emissaoGas, media: MEDIA_GLOBAL.gas },
          { key: "Veículos", usuario: emissaoVeiculosRotina, media: MEDIA_GLOBAL.veiculos },
          { key: "Energia elétrica", usuario: emissaoEnergia, media: MEDIA_GLOBAL.energia },
        ].map((item) => {
          const usuario = Number(item.usuario) || 0;
          const media = Number(item.media) || 0;
          const acimaDaMedia = usuario > media;
          const abaixoDaMedia = usuario < media;
          let textoRecomendacao = `Sua emissão nesta categoria está igual à média global: ${usuario.toFixed(2)} kgCO₂.`;
          if (acimaDaMedia) {
            textoRecomendacao = `Sua emissão nesta categoria está acima da média global: ${usuario.toFixed(2)} kgCO₂, acima da média global de ${media.toFixed(2)} kgCO₂.`;
          } else if (abaixoDaMedia) {
            textoRecomendacao = `Ótima notícia! Sua emissão está abaixo da média global: ${usuario.toFixed(2)} kgCO₂, abaixo da média global de ${media.toFixed(2)} kgCO₂.`;
          }

          return (
            <View key={item.key} style={stylesRecomendacoes.item}>
              <Text style={stylesRecomendacoes.tituloCategoria}>{item.key}</Text>
              <Text style={stylesRecomendacoes.texto}>{textoRecomendacao}</Text>
            </View>
          );
        })}
      </View>

      <View style={styleTelaResultado.containerInfo}>
        {rotinaNome ? (
          <Text style={styleTelaResultado.resultadoMeta}>Rotina: {rotinaNome}</Text>
        ) : null}
        {dataRealizacao ? (
          <Text style={styleTelaResultado.resultadoMeta}>Data: {dataRealizacao}</Text>
        ) : null}
      </View>

      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={stylesModal.overlay}>
          <View style={stylesModal.card}>
            <Text style={stylesModal.titulo}>Parabéns! você obteve uma conquista!</Text>
            {infoConquistaAtual?.imagem ? (
              <Image source={infoConquistaAtual.imagem} style={stylesModal.imagem} />
            ) : null}
            <Text style={stylesModal.nome}>{infoConquistaAtual?.titulo}</Text>
            <TouchableOpacity style={stylesModal.botao} onPress={fecharModal}>
              <Text style={stylesModal.botaoTexto}>
                {filaConquistas.length > 1 ? "Próxima" : "OK"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const stylesModal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 14,
    color: "#111",
  },
  imagem: {
    width: 110,
    height: 110,
    marginBottom: 10,
    resizeMode: "contain",
  },
  nome: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#111",
  },
  botao: {
    minWidth: 140,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: coresBase.verdeMedio,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
});

const stylesRecomendacoes = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 6,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  tituloCategoria: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  texto: {
    fontSize: 12,
    color: "#111",
    lineHeight: 16,
  },
});
