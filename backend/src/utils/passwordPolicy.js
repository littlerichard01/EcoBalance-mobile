const REASONS = {
  minLength: 'A senha deve ter pelo menos 7 caracteres.',
  lower: 'A senha deve conter pelo menos 1 letra minúscula.',
  upper: 'A senha deve conter pelo menos 1 letra maiúscula.',
  digit: 'A senha deve conter pelo menos 1 número.',
  special: 'A senha deve conter pelo menos 1 caractere especial.',
  noSpaces: 'A senha não pode conter espaços.'
};

const isStrongPassword = (senha) => {
  const s = String(senha || '');

  const failures = [];
  if (s.length < 7) failures.push(REASONS.minLength);
  if (/\s/.test(s)) failures.push(REASONS.noSpaces);
  if (!/[a-z]/.test(s)) failures.push(REASONS.lower);
  if (!/[A-Z]/.test(s)) failures.push(REASONS.upper);
  if (!/[0-9]/.test(s)) failures.push(REASONS.digit);
  if (!/[^A-Za-z0-9\s]/.test(s)) failures.push(REASONS.special);

  return { ok: failures.length === 0, failures };
};

module.exports = {
  isStrongPassword,
  REASONS
};
