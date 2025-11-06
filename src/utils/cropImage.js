// Utility to crop image using react-easy-crop
// Source: https://codesandbox.io/s/react-easy-crop-demo-with-cropped-output-lkhx6?file=/src/cropImage.js
import { Area } from 'react-easy-crop';

export default function getCroppedImg(imageSrc, pixelCrop) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
      // Return base64 string
      const base64Image = canvas.toDataURL('image/jpeg');
      resolve(base64Image);
    };
    image.onerror = error => reject(error);
  });
}
