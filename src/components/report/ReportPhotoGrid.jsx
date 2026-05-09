export default function ReportPhotoGrid({ photos, label }) {
  if (!photos?.length) return null;
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-army-800 mb-3 pb-1 border-b border-army-200">{label}</h3>
      <div className="grid grid-cols-2 gap-3">
        {photos.map(photo => (
          <div key={photo.id} className="break-inside-avoid">
            <img src={photo.dataUrl} alt={photo.caption || label} className="w-full rounded border border-gray-200 object-cover" style={{maxHeight: '220px'}} />
            {photo.caption && <p className="text-xs text-gray-600 mt-1 text-center">{photo.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
