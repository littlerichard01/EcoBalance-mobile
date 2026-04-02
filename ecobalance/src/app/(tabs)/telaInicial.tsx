import { BotaoCriarConta } from "../../components/botaoCriarConta";
import { LinkTenhoConta } from "../../components/linkTenhoConta";
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/stackNavigator";
import { stylesTelaInicial } from "../../styles/telaInicialStyles";
import { fonte } from "../../styles/fontes";
import { coresBase, stylesGeral } from "@/src/styles/stylesGeral";

type NavigationProp = StackNavigationProp<RootStackParamList, "TelaCadastro">;

export default function TelaInicial() {
  const navigation = useNavigation<NavigationProp>();

  const handleCriarConta = () => {
    navigation.navigate("TelaCadastro");
  };

  const slides = [
    { imagem: require("../../assets/imagemTelaCarregamento01.png"), texto: "Entenda seu impacto", texto2:"Calcule sua pegada de carbono de forma fácil" },
    { imagem: require("../../assets/imagemTelaCarregamento03.png"), texto: "Conquiste!", texto2: "Melhore seus resultados, se mantenha ativo \ne consquiste!" }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // troca a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={stylesTelaInicial.container}>

      {/* Carrossel de imagens */}
      <Text style={[fonte.titulo, {fontWeight: 900, color: coresBase.verdeEscuro, fontSize: 35, marginTop: -20}]}>{slides[index].texto}</Text>
      <Text style={[stylesGeral.subTituloPagina,
        {textAlign: 'center', paddingHorizontal: 25, marginBottom: 30, fontSize: 18, fontWeight: '500'}
      ]}>{slides[index].texto2}</Text>

      <Image source={slides[index].imagem} style={stylesTelaInicial.imagem} />
       

      {/* Botões */}
      <BotaoCriarConta onPress={handleCriarConta} />
      <LinkTenhoConta />
    </View>
  );
}


