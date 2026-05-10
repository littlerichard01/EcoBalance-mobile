export const formatarDataPtBr = (data: any) => {
  const date = new Date(data);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("pt-BR");
};
