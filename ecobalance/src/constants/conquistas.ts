export type ConquistaDef = Readonly<{
  id: number;
  nome: string;
  titulo: string;
  descricao: string;
  imagem: any;
}>;

export const conquistasDef: readonly ConquistaDef[] = [
  {
    id: 1,
    nome: "primeiro_teste",
    titulo: "Primeiro teste",
    descricao: "Obtida quando o usuário faz o seu primeiro teste",
    imagem: require("../assets/conquistas/conquistaPrimeiroTeste.png"),
  },
  {
    id: 2,
    nome: "abaixo_media_global",
    titulo: "Abaixo da média global I",
    descricao: "Quando o total de emissão é menor que a média global",
    imagem: require("../assets/conquistas/conquistaAbaixoMedia.png"),
  },
  {
    id: 3,
    nome: "abaixo_media_global_2",
    titulo: "Abaixo da média global II",
    descricao: "Quando faz 2 testes seguidos abaixo da média global",
    imagem: require("../assets/conquistas/conquistaAbaixoMedia2.png"),
  },
  {
    id: 4,
    nome: "melhoria_pessoal",
    titulo: "Melhoria pessoal I",
    descricao: "Quando a emissão é menor do que o último teste",
    imagem: require("../assets/conquistas/conquistaMelhoriaPessoal.png"),
  },
  {
    id: 5,
    nome: "melhoria_pessoal_2",
    titulo: "Melhoria pessoal II",
    descricao: "Quando a emissão é menor que os dois últimos testes",
    imagem: require("../assets/conquistas/conquistaMelhoriaPessoal2.png"),
  },
] as const;
