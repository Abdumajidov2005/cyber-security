export function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function formatPrice(price) {
  if (price === 0) return 'Bepul';
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
}

export function calculateProgress(completed, total) {
  if (!total) return 0;
  return Math.round((completed / total) * 100);
}
