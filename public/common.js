export const $ = selector => document.querySelector(selector);
export const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
export function storage(key, fallback, valid) {
  let available = true;
  let value = structuredClone(fallback);
  try { const raw = localStorage.getItem(key); if (raw !== null) { const parsed = JSON.parse(raw); if (!valid(parsed)) throw Error(); value = parsed; } }
  catch { available = false; }
  return {value, save(next) { try { localStorage.setItem(key, JSON.stringify(next)); available = true; } catch { available = false; } if (!available) notice('Changes are only saved for this session. Browser storage is unavailable.'); }, get available() { return available; }};
}
export function notice(message) { $('#notice').textContent = message; }
export function localDate(date = new Date()) { return [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-'); }
