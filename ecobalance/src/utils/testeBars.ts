import { coresBase } from "@/src/styles/stylesGeral";

export type BarInfo = Readonly<{
  key: string;
  label: string;
  value: number;
  color: string;
  max: number;
}>;

export const buildTesteBars = (teste: any): readonly BarInfo[] => {
  const alimentos = Number(teste?.emissaoAlimentos) || 0;
  const gas = Number(teste?.emissaoGas) || 0;
  const veiculosTotal = Number(teste?.emissaoVeiculos) || 0;
  const energia = Number(teste?.energiaEletrica?.emissao) || 0;
  const viagens = Array.isArray(teste?.viagem?.veiculos)
    ? teste.viagem.veiculos.reduce((acc: number, v: any) => {
        return acc + (Number(v?.emissao) || 0);
      }, 0)
    : 0;
  const veiculosRotina = Math.max(veiculosTotal - viagens, 0);
  const max = Math.max(alimentos, gas, veiculosRotina, viagens, energia, 1);

  return [
    { key: "Alim", label: "Alim", value: alimentos, color: coresBase.verdeMedio, max },
    { key: "Gás", label: "Gás", value: gas, color: "#4C9F70", max },
    { key: "Veíc", label: "Veíc", value: veiculosRotina, color: "#2C6E49", max },
    { key: "Viag", label: "Viag", value: viagens, color: "#1B4332", max },
    { key: "Ener", label: "Ener", value: energia, color: "#8BC34A", max },
  ] as const;
};
