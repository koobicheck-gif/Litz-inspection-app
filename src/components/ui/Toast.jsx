import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm max-w-xs ${
            toast.type === 'error' ? 'bg-danger' : 'bg-army-800'
          }`}
        >
          {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
          <span className="flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="text-white/70 hover:text-white">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
