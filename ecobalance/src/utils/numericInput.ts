export const sanitizeNonNegativeIntText = (text: string) => {
  return String(text ?? "").replace(/\D+/g, "");
};

export const sanitizeNonNegativeNumberText = (text: string) => {
  const normalized = String(text ?? "").replace(",", ".");
  let out = normalized.replace(/[^0-9.]+/g, "");

  const firstDot = out.indexOf(".");
  if (firstDot !== -1) {
    out = out.slice(0, firstDot + 1) + out.slice(firstDot + 1).replace(/\./g, "");
  }

  return out;
};

export const parseNonNegativeNumber = (text: string) => {
  const sanitized = sanitizeNonNegativeNumberText(text);
  const n = Number(sanitized);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
};
