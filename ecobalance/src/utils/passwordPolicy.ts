export type PasswordRequirement = {
  id: string;
  label: string;
  ok: boolean;
};

export const getPasswordRequirements = (senha: string): PasswordRequirement[] => {
  const s = String(senha ?? "");

  return [
    { id: "minLength", label: "Precisa ter 7 caracteres ou mais", ok: s.length >= 7 },
    { id: "lower", label: "Precisa ter pelo menos 1 letra minúscula", ok: /[a-z]/.test(s) },
    { id: "upper", label: "Precisa ter pelo menos 1 letra maiúscula", ok: /[A-Z]/.test(s) },
    { id: "digit", label: "Precisa ter pelo menos 1 número", ok: /[0-9]/.test(s) },
    {
      id: "special",
      label: "Precisa ter pelo menos 1 caractere especial",
      ok: /[^A-Za-z0-9\s]/.test(s),
    },
    { id: "noSpaces", label: "Não pode conter espaços", ok: !/\s/.test(s) },
  ];
};

export const validateStrongPassword = (senha: string) => {
  const reqs = getPasswordRequirements(senha);
  const failures = reqs.filter((r) => !r.ok).map((r) => r.label);
  return { ok: failures.length === 0, failures };
};
