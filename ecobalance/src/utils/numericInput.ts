export const sanitizeNonNegativeIntText = (text: string) => {
  return String(text ?? "").replaceAll(/\D+/g, "");
};

export const sanitizeNonNegativeNumberText = (text: string) => {
  const normalized = String(text ?? "").replaceAll(",", ".");
  let out = normalized.replaceAll(/[^0-9.]+/g, "");

  const firstDot = out.indexOf(".");
  if (firstDot !== -1) {
    out =
      out.slice(0, firstDot + 1) +
      out.slice(firstDot + 1).replaceAll(".", "");
  }

  return out;
};

export const parseNonNegativeNumber = (text: string) => {
  const sanitized = sanitizeNonNegativeNumberText(text);
  const n = Number(sanitized);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
};
