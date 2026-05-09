import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import Modal from '../ui/Modal';

export default function PhotoGallery({ photos, onCaption, onRemove }) {
  const [lightbox, setLightbox] = useState(null);

  if (!photos.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
        {photos.map(photo => (
          <div key={photo.id} className="relative group rounded-lg overflow-hidden border border-army-100 bg-white">
            <div className="relative">
              <img
                src={photo.dataUrl}
                alt={photo.caption || 'Photo'}
                className="w-full h-32 object-cover cursor-pointer"
                onClick={() => setLightbox(photo)}
              />
              <button
                type="button"
                onClick={() => onRemove(photo.id)}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
              <button
                type="button"
                onClick={() => setLightbox(photo)}
                className="absolute top-1 left-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ZoomIn size={14} />
              </button>
            </div>
            <input
              type="text"
              value={photo.caption || ''}
              onChange={e => onCaption(photo.id, e.target.value)}
              placeholder="Add caption..."
              className="w-full px-2 py-1.5 text-xs border-t border-army-100 focus:outline-none focus:bg-army-50"
            />
          </div>
        ))}
      </div>

      <Modal open={!!lightbox} onClose={() => setLightbox(null)} title={lightbox?.caption || 'Photo'}>
        {lightbox && (
          <img src={lightbox.dataUrl} alt={lightbox.caption || 'Photo'} className="w-full rounded" />
        )}
      </Modal>
    </>
  );
}
