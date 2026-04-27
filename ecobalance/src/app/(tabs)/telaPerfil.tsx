import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { BotaoSair } from "../../components/botaoSair";
import { stylesTelaPerfil } from "../../styles/telaPerfilStyles";
import { fonte } from "@/src/styles/fontes";
import { stylesGeral } from "@/src/styles/stylesGeral";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/stackNavigator";
import api from "@/src/services/api";
import { ScrollView } from "react-native-gesture-handler";
import { stylesTelaRotina } from "@/src/styles/telaRotinaStyle";

type NavigationProp = StackNavigationProp<RootStackParamList, "MainTabs">;

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

export default function TelaPerfil() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isEnabledEmail, setIsEnabledEmail] = useState(false);
  const [isEnabledApp, setIsEnabledApp] = useState(false);
  const [carregandoPreferencias, setCarregandoPreferencias] = useState(false);
  const [avatarSelecionado, setAvatarSelecionado] = useState(1);
  const [modalAvatarVisivel, setModalAvatarVisivel] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const carregarPerfil = useCallback(async () => {
    try {
      const response = await api.get("/users/me");
      setUsuario(response.data?.usuario?.nome ?? "");
      setEmail(response.data?.usuario?.email ?? "");
      setIsEnabledEmail(Boolean(response.data?.usuario?.receberLembretes));
      setIsEnabledApp(Boolean(response.data?.usuario?.receberNotificacoesApp));
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

  useFocusEffect(
    useCallback(() => {
      carregarPerfil();
    }, [carregarPerfil]),
  );

  const atualizarPreferencias = useCallback(
    async (payload: any) => {
      try {
        setCarregandoPreferencias(true);
        const response = await api.put("/users/me", payload);
        setIsEnabledEmail(Boolean(response.data?.usuario?.receberLembretes));
        setIsEnabledApp(
          Boolean(response.data?.usuario?.receberNotificacoesApp),
        );
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

        throw error;
      } finally {
        setCarregandoPreferencias(false);
      }
    },
    [navigation],
  );

  const toggleSwitchEmail = useCallback(
    async (valor: boolean) => {
      const anterior = isEnabledEmail;
      setIsEnabledEmail(valor);
      try {
        await atualizarPreferencias({ receberLembretes: valor });
      } catch {
        setIsEnabledEmail(anterior);
        Alert.alert("Erro", "Não foi possível salvar sua preferência.");
      }
    },
    [atualizarPreferencias, isEnabledEmail],
  );

  const toggleSwitchApp = useCallback(
    async (valor: boolean) => {
      const anterior = isEnabledApp;
      setIsEnabledApp(valor);
      try {
        await atualizarPreferencias({ receberNotificacoesApp: valor });
      } catch {
        setIsEnabledApp(anterior);
        Alert.alert("Erro", "Não foi possível salvar sua preferência.");
      }
    },
    [atualizarPreferencias, isEnabledApp],
  );

  const selecionarAvatar = useCallback(
    async (numero: number) => {
      const anterior = avatarSelecionado;
      setModalAvatarVisivel(false);
      setAvatarSelecionado(numero);

      try {
        await atualizarPreferencias({ avatarSelecionado: numero });
      } catch {
        setAvatarSelecionado(anterior);
        Alert.alert("Erro", "Não foi possível atualizar seu avatar.");
      }
    },
    [atualizarPreferencias, avatarSelecionado],
  );

  const handleSair = async () => {
    // #region Conexão Front-Back (Logout)
    try {
      await AsyncStorage.removeItem("@EcoBalance:token");
      navigation.navigate("TelaCarregamento");
    } catch {
      Alert.alert("Erro", "Não foi possível sair.");
    }
    // #endregion
  };

  return (
  <ScrollView 
    style={stylesGeral.telaInteira} 
    contentContainerStyle={{ paddingBottom: 80 }} // Garante que o botão Sair não cole nas abas
  >
    <View style={{ marginTop: -15}}>
      {/* 1. CABEÇALHO */}
      <View style={stylesTelaPerfil.cabecalho}>
        <Image
          source={require("../../assets/engrenagem.png")}
          style={[stylesTelaRotina.rotinaIcon, { marginRight: 10 }]}
        />
        <Text style={[stylesGeral.tituloPagina, { marginTop: 20, marginBottom: 20 }]}>
          Perfil
        </Text>
      </View>

      {/* 2. AVATAR */}
      <View style={stylesTelaPerfil.avatarContainer}>
        <Image
          source={avatarSources[(avatarSelecionado || 1) - 1]}
          style={stylesTelaPerfil.avatar}
        />
        <TouchableOpacity
          onPress={() => setModalAvatarVisivel(true)}
          disabled={carregandoPreferencias}
        >
          <Text style={[fonte.subtitulo, { marginTop: 10, marginBottom: 50 }]}>
            Mudar foto
          </Text>
        </TouchableOpacity>
      </View>

      {/* 3. FORMULÁRIO */}
      <Text>Nome</Text>
      <TextInput
        style={[stylesGeral.input2, { marginBottom: 30, marginTop: 5 }]}
        value={usuario}
        editable={false}
      />

      <Text>E-mail</Text>
      <TextInput
        style={[stylesGeral.input2, { marginBottom: 30, marginTop: 5 }]}
        value={email}
        editable={false}
      />

      <Text>Senha</Text>
      <TextInput
        style={[stylesGeral.input2, { marginBottom: 30, marginTop: 5 }]}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* 4. CONFIGURAÇÕES */}
      <View style={stylesTelaPerfil.notificacoesEmail}>
        <Text style={fonte.subtitulo}>Notificações por e-mail?</Text>
        <Switch onValueChange={toggleSwitchEmail} value={isEnabledEmail} />
      </View>

      <View style={stylesTelaPerfil.notificacoesApp}>
        <Text style={fonte.subtitulo}>Notificações do aplicativo?</Text>
        <Switch onValueChange={toggleSwitchApp} value={isEnabledApp} />
      </View>

      {/* 5. AÇÃO PRINCIPAL */}
      <View style={{ marginTop: 20 }}>
        <BotaoSair onPress={handleSair} />
      </View>

      {/* 6. MODAL (O segredo é deixar ele bem isolado no fim) */}
      <Modal
        transparent
        visible={modalAvatarVisivel}
        animationType="fade"
        onRequestClose={() => setModalAvatarVisivel(false)}
      >
        <View style={stylesTelaPerfil.modalOverlay}>
          <Pressable
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            onPress={() => setModalAvatarVisivel(false)}
          />
          <View style={stylesTelaPerfil.modalContent}>
            <Text style={stylesTelaPerfil.modalTitle}>Escolha seu avatar</Text>
            <View style={stylesTelaPerfil.avatarGrid}>
              {avatarSources.map((source, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => { selecionarAvatar(idx + 1); }}
                  disabled={carregandoPreferencias}
                >
                  <Image
                    source={source}
                    style={[
                      stylesTelaPerfil.avatarOption,
                      (idx + 1) === avatarSelecionado && stylesTelaPerfil.avatarOptionSelected,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
            
            {/* O BOTÃO FECHAR PRECISA ESTAR AQUI DENTRO DO MODAL */}
            <TouchableOpacity
              style={stylesTelaPerfil.modalCloseButton}
              onPress={() => setModalAvatarVisivel(false)}
            >
              <Text style={stylesTelaPerfil.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  </ScrollView>
);
}
