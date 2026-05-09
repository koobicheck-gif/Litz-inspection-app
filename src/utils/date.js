export const formatDate = (isoString) => {
  if (!isoString) return '—';
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatDateTime = (isoString) => {
  if (!isoString) return '—';
  const d = new Date(isoString);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
};

export const formatTime = (isoString) => {
  if (!isoString) return '—';
  const d = new Date(isoString);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

export const todayISO = () => new Date().toISOString().split('T')[0];
