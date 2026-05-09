const MAX_DIMENSION = 1600;
const QUALITY = 0.82;

export const photoService = {
  async compress(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => { img.src = e.target.result; };
      reader.onerror = reject;

      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round(height * (MAX_DIMENSION / width));
            width = MAX_DIMENSION;
          } else {
            width = Math.round(width * (MAX_DIMENSION / height));
            height = MAX_DIMENSION;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => resolve(new File([blob], file.name, { type: 'image/jpeg' })),
          'image/jpeg',
          QUALITY
        );
      };
      img.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};
