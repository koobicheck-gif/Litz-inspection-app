import { useReport } from '../../context/ReportContext';
import PhotoUploader from './PhotoUploader';
import PhotoGallery from './PhotoGallery';
import Section from '../ui/Section';

export default function PhotoSection({ category, label, description }) {
  const { report, dispatch } = useReport();
  const photos = report.photos[category] || [];

  const handleUpload = (photo) => {
    dispatch({ type: 'ADD_PHOTO', category, photo });
  };

  const handleCaption = (photoId, caption) => {
    dispatch({ type: 'UPDATE_PHOTO_CAPTION', category, photoId, caption });
  };

  const handleRemove = (photoId) => {
    dispatch({ type: 'REMOVE_PHOTO', category, photoId });
  };

  return (
    <Section title={`${label} (${photos.length})`} subtitle={description} defaultOpen={false}>
      <PhotoUploader onUpload={handleUpload} />
      <PhotoGallery photos={photos} onCaption={handleCaption} onRemove={handleRemove} />
    </Section>
  );
}
