import React, { useState } from "react";
import { View, Text, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { ProgressBar } from "@/src/components/barraRolagem";
import { BotaoAvancar } from "@/src/components/botaoAvancar";
import EnergiaRotina from "./criarRotina/energiaRotina";
import ViagemRotina from "./criarRotina/viagensRotina";
import SelecionaRotina from "./criarRotina/selecionaRotina";
import GasEncanado from "./criarRotina/gasEncanadoCalculo";
import { BotaoConcluir } from "@/src/components/botaoConcluir";
import { stylesGeral } from "@/src/styles/stylesGeral";
import { BotaoVoltar } from "@/src/components/botaoVoltarRotina";
import { ScrollView } from "react-native-gesture-handler";
import api from "@/src/services/api";
import { stylesTelaRotina } from "@/src/styles/telaRotinaStyle";
import { reagendarLembreteTesteSeHabilitado } from "@/src/services/testeReminderNotifications";

export default function TelaCalculos() {
  const [index, setIndex] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [calculoData, setCalculoData] = useState({
    rotinaId: "",
    rotinaNome: "",
    rotinaTipoGas: "",
    energiaEletrica: {
      kwh: "",
    },
    gasNatural: {
      m3: "",
    },
    viagem: {
      fezViagem: false,
      internacional: false,
      veiculos: [] as { tipo: string; km: number }[],
    },
  });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const updateCalculo = (key: string, value: any) => {
    setCalculoData((prev) => ({ ...prev, [key]: value }));
  };

  const totalPassos =
    calculoData.rotinaTipoGas && calculoData.rotinaTipoGas !== "encanado"
      ? 3
      : 4;
  const passoAtual = totalPassos === 3 && index === 4 ? 3 : index;

  const handleAvancar = () => {
    if (index === 1 && !calculoData.rotinaId) {
      Alert.alert("Aviso", "Selecione uma rotina para continuar.");
      return;
    }

    if (index === 2 && !calculoData.energiaEletrica.kwh) {
      Alert.alert("Aviso", "Informe o consumo de energia elétrica.");
      return;
    }

    if (index === 2 && calculoData.rotinaTipoGas !== "encanado") {
      setIndex(4);
      return;
    }

    if (index === 3 && !calculoData.gasNatural.m3) {
      Alert.alert("Aviso", "Informe o consumo de gás natural.");
      return;
    }

    if (index < 4) {
      setIndex(index + 1);
    }
  };

  const handleVoltar = () => {
    if (index === 4 && totalPassos === 3) {
      setIndex(2);
      return;
    }

    if (index > 1) {
      setIndex(index - 1);
    }
  };

  const handleConcluir = async () => {
    if (!calculoData.rotinaId) {
      Alert.alert("Aviso", "Selecione uma rotina para continuar.");
      return;
    }

    if (!calculoData.energiaEletrica.kwh) {
      Alert.alert("Aviso", "Informe o consumo de energia elétrica.");
      return;
    }

    if (
      calculoData.rotinaTipoGas === "encanado" &&
      !calculoData.gasNatural.m3
    ) {
      Alert.alert("Aviso", "Informe o consumo de gás natural.");
      return;
    }

    setEnviando(true);

    // #region Conexão Front-Back (Criar Teste)
    try {
      let conquistasAntes: any[] = [];
      try {
        const responseConquistas = await api.get("/users/me/conquistas");
        conquistasAntes = Array.isArray(responseConquistas.data?.conquistas)
          ? responseConquistas.data.conquistas
          : [];
      } catch {}

      const payload = {
        rotina: calculoData.rotinaId,
        energiaEletrica: {
          kwh: Number(calculoData.energiaEletrica.kwh) || 0,
        },
        gasNatural: {
          m3:
            calculoData.rotinaTipoGas === "encanado"
              ? Number(calculoData.gasNatural.m3) || 0
              : 0,
        },
        viagem: {
          fezViagem: calculoData.viagem.fezViagem,
          internacional: calculoData.viagem.internacional,
          veiculos: calculoData.viagem.veiculos.map((veiculo) => ({
            tipo: veiculo.tipo,
            km: Number(veiculo.km) || 0,
          })),
        },
      };

      const response = await api.post("/testes", payload);

      let conquistasDepois: any[] = [];
      try {
        const responseConquistas = await api.get("/users/me/conquistas");
        conquistasDepois = Array.isArray(responseConquistas.data?.conquistas)
          ? responseConquistas.data.conquistas
          : [];
      } catch {}

      const ativasAntes = new Set(
        conquistasAntes
          .filter((c: any) => Boolean(c?.ativa))
          .map((c: any) => c?.nome)
          .filter(Boolean),
      );
      const novasConquistas = conquistasDepois
        .filter((c: any) => Boolean(c?.ativa) && !ativasAntes.has(c?.nome))
        .map((c: any) => c?.nome)
        .filter(Boolean);

      try {
        await reagendarLembreteTesteSeHabilitado();
      } catch {}

      navigation.navigate("ResultadoCalculo", {
        teste: response.data.teste,
        rotinaNome: calculoData.rotinaNome,
        novasConquistas,
      });
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Não foi possível calcular o teste.",
      );
    } finally {
      setEnviando(false);
    }
    // #endregion
  };

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
          <Text style={stylesGeral.tituloPagina}>Calcule: </Text>
        </View>
        <View style={stylesGeral.containerPassosTexto}>
          <View style={{ flexDirection: "row" }}>
            <Text style={stylesGeral.passosTexto}>Passo {index}: </Text>
            <Text style={stylesGeral.passosTexto}>
              {index === 1 && "Rotina"}
              {index === 2 && "Energia Elétrica"}
              {index === 3 && "Gás Natural"}
              {index === 4 && "Viagens"}
            </Text>
          </View>
          <Text style={stylesGeral.passosTexto}>
            {passoAtual}/{totalPassos}
          </Text>
        </View>
        <ProgressBar progresso={passoAtual / totalPassos} />
      </View>

      <View>
        <View>
          {index === 1 && (
            <SelecionaRotina
              calculoData={calculoData}
              updateCalculo={updateCalculo}
            />
          )}
          {index === 2 && (
            <EnergiaRotina
              calculoData={calculoData}
              updateCalculo={updateCalculo}
            />
          )}
          {index === 3 && (
            <GasEncanado
              calculoData={calculoData}
              updateCalculo={updateCalculo}
            />
          )}
          {index === 4 && (
            <ViagemRotina
              calculoData={calculoData}
              updateCalculo={updateCalculo}
            />
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 90,
        }}
      >
        {index > 1 && <BotaoVoltar onPress={handleVoltar} />}
        {index < 4 && <BotaoAvancar onPress={handleAvancar} />}
        {index === 4 && <BotaoConcluir onPress={handleConcluir} />}
        {enviando && <Text>Calculando...</Text>}
      </View>
    </ScrollView>
  );
}
