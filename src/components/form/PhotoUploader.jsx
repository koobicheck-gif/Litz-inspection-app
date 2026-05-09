import { useRef, useState } from 'react';
import { Camera, Upload, Loader } from 'lucide-react';
import { photoService } from '../../services/photoService';
import { storageService } from '../../services/storageService';

export default function PhotoUploader({ onUpload, compact = false }) {
  const cameraRef = useRef();
  const uploadRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleFiles = async (files) => {
    setLoading(true);
    try {
      for (const file of Array.from(files)) {
        const compressed = await photoService.compress(file);
        const photo = await storageService.uploadPhoto(compressed);
        onUpload(photo);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`border-2 border-dashed border-army-200 rounded-lg flex flex-col items-center justify-center gap-3 ${compact ? 'p-3' : 'p-6'} bg-army-50/50`}>
      {loading ? (
        <Loader size={24} className="text-army-500 animate-spin" />
      ) : (
        <>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => cameraRef.current?.click()}
              className="btn-secondary text-sm flex items-center gap-2 min-h-[44px]"
            >
              <Camera size={16} /> Take Photo
            </button>
            <button
              type="button"
              onClick={() => uploadRef.current?.click()}
              className="btn-secondary text-sm flex items-center gap-2 min-h-[44px]"
            >
              <Upload size={16} /> Upload
            </button>
          </div>
          {!compact && <p className="text-xs text-army-500">JPG, PNG — automatically compressed</p>}
        </>
      )}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={e => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ''; }}
      />
      <input
        ref={uploadRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ''; }}
      />
    </div>
  );
}
