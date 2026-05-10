import api from "@/src/services/api";

export const fetchUsuarioMe = async (): Promise<any | null> => {
  const response = await api.get("/users/me");
  return response.data?.usuario ?? null;
};

export const fetchTestesMe = async (): Promise<any[]> => {
  const response = await api.get("/testes/me");
  return Array.isArray(response.data) ? response.data : [];
};

export const fetchConquistasMe = async (): Promise<any[]> => {
  const response = await api.get("/users/me/conquistas");
  return Array.isArray(response.data?.conquistas) ? response.data.conquistas : [];
};
