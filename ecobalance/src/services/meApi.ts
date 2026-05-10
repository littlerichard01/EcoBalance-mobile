import api from "@/src/services/api";

export type UsuarioMe = Readonly<{
  nome?: string;
  email?: string;
  avatarSelecionado?: number;
  receberLembretes?: boolean;
  receberNotificacoesApp?: boolean;
  createdAt?: string;
  updatedAt?: string;
}>;

export const fetchUsuarioMe = async (): Promise<UsuarioMe | null> => {
  const response = await api.get("/users/me");
  return response.data?.usuario ?? null;
};

export const fetchTestesMe = async (): Promise<unknown[]> => {
  const response = await api.get("/testes/me");
  return Array.isArray(response.data) ? response.data : [];
};

export const fetchConquistasMe = async (): Promise<unknown[]> => {
  const response = await api.get("/users/me/conquistas");
  return Array.isArray(response.data?.conquistas) ? response.data.conquistas : [];
};
