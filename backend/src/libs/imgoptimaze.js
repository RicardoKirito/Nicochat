import sharp from 'sharp'

export async function imageOptimaze(inputPath, targetSizeKB) {
    let quality = 90; // Comienza con una calidad alta
    const targetSizeBytes = targetSizeKB * 1024;
    let imageBuffer;
  
    while (quality > 10) {
      // Procesa la imagen con Sharp y obtén un Buffer
      imageBuffer = await sharp(inputPath)
        .toFormat('jpeg')
        .jpeg({ quality }) // Ajusta la calidad
        .toBuffer(); // Obtén un Buffer en lugar de guardar en un archivo
  
      const outputSize = imageBuffer.length;
  
      if (outputSize <= targetSizeBytes) {
        console.log(`Image output reache with quality ${quality}: ${(outputSize / 1024).toFixed(2)} KB`);
        break;
      }
  
      quality -= 10; // Reduce la calidad en pasos
    }
    return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
  }