// Converts "$1,299.99", "£51.77" or "1.299,99 €" into a number
function parsePrice(text) {
  if (!text) return null;

  let s = text.replace(/[^\d.,]/g, '');
  if (!s) return null;

  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');

  if (lastComma !== -1 && lastDot !== -1) {
    if (lastComma > lastDot) {
      s = s.replace(/\./g, '').replace(',', '.'); // 1.299,99
    } else {
      s = s.replace(/,/g, ''); // 1,299.99
    }
  } else if (lastComma !== -1) {
    const digitsAfter = s.length - lastComma - 1;
    s = digitsAfter === 3 ? s.replace(/,/g, '') : s.replace(',', '.');
  }

  const n = parseFloat(s);
  return Number.isFinite(n) ? n : null;
}

module.exports = { parsePrice };