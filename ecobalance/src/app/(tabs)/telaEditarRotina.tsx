import React from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { stylesGeral } from "@/src/styles/stylesGeral";
import { BotaoRetornar } from "@/src/components/botaoRetornar";
import api from "@/src/services/api";
import { stylesTelaRotina } from "@/src/styles/telaRotinaStyle";

type EditarRotinaRouteProp = RouteProp<RootStackParamList, "TelaEditarRotina">;
type EditarRotinaNavigationProp = StackNavigationProp<RootStackParamList, "TelaEditarRotina">;

export default function TelaEditarRotina() {
  const route = useRoute<EditarRotinaRouteProp>();
  const navigation = useNavigation<EditarRotinaNavigationProp>();
  const { rotinaId, rotinaNome } = route.params;

    const deletarRotina = async (id: string) => {
      Alert.alert(
        "Excluir Rotina",
        "Tem certeza que deseja excluir esta rotina?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            style: "destructive",
            onPress: async () => {
              try {
                await api.delete(`/rotinas/${id}`);
                Alert.alert("Sucesso", "Rotina excluída.");
                navigation.goBack();
              } catch (error: any) {
                console.error(
                  "Erro ao excluir rotina:",
                  error?.response?.data || error?.message || error,
                );
                Alert.alert("Erro", "Não foi possível excluir a rotina.");
              }
            },
          },
        ],
      );
    };

  return (
    <ScrollView style={stylesGeral.telaInteira}>
      <View style={stylesTelaRotina.cabecarioTela}>
        <BotaoRetornar onPress={() => navigation.goBack()} />
        <Text style={stylesGeral.tituloPagina}>Editar Rotina</Text>
      </View>

              <Text style={stylesTelaRotina.rotinaTitulo}>
          {rotinaNome}
        </Text>

      <View>
        <Text>
          Implemente aqui o formulário de edição ou carregue os dados da rotina.
        </Text>
      </View>
    </ScrollView>
  );
}
