const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate3DMaps() {
  const inputPath = path.join(__dirname, '../public/images/companion-character.png');
  const normalPath = path.join(__dirname, '../public/images/companion-normal.png');
  const roughnessPath = path.join(__dirname, '../public/images/companion-roughness.png');

  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Processing image ${width}x${height} with ${channels} channels...`);

  // Create luminance buffer and alpha mask
  const lum = new Float32Array(width * height);
  const alpha = new Uint8Array(width * height);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    const a = data[i * channels + 3];
    lum[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;
    alpha[i] = a;
  }

  // Precompute row bounds for the silhouette to calculate natural 3D cylindrical body curvature
  const leftBound = new Int32Array(height).fill(width);
  const rightBound = new Int32Array(height).fill(-1);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (alpha[idx] > 30) {
        if (x < leftBound[y]) leftBound[y] = x;
        if (x > rightBound[y]) rightBound[y] = x;
      }
    }
  }

  const normalBuffer = Buffer.alloc(width * height * 4);
  const roughnessBuffer = Buffer.alloc(width * height * 4);

  // Sobel kernel for surface bump detail
  const bumpStrength = 2.8;

  for (let y = 0; y < height; y++) {
    const yAbove = Math.max(0, y - 1);
    const yBelow = Math.min(height - 1, y + 1);
    const lBound = leftBound[y];
    const rBound = rightBound[y];
    const bodySpan = rBound > lBound ? (rBound - lBound) : width;
    const bodyCenter = (lBound + rBound) / 2;

    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const a = alpha[idx];

      if (a < 15) {
        // Transparent background: flat neutral normal (0, 0, 1) -> (128, 128, 255)
        normalBuffer[idx * 4] = 128;
        normalBuffer[idx * 4 + 1] = 128;
        normalBuffer[idx * 4 + 2] = 255;
        normalBuffer[idx * 4 + 3] = 0;

        roughnessBuffer[idx * 4] = 128;
        roughnessBuffer[idx * 4 + 1] = 128;
        roughnessBuffer[idx * 4 + 2] = 128;
        roughnessBuffer[idx * 4 + 3] = 0;
        continue;
      }

      const xLeft = Math.max(0, x - 1);
      const xRight = Math.min(width - 1, x + 1);

      // Sobel horizontal gradient
      const dX =
        (lum[yAbove * width + xRight] + 2 * lum[y * width + xRight] + lum[yBelow * width + xRight]) -
        (lum[yAbove * width + xLeft] + 2 * lum[y * width + xLeft] + lum[yBelow * width + xLeft]);

      // Sobel vertical gradient
      const dY =
        (lum[yBelow * width + xLeft] + 2 * lum[yBelow * width + x] + lum[yBelow * width + xRight]) -
        (lum[yAbove * width + xLeft] + 2 * lum[yAbove * width + x] + lum[yAbove * width + xRight]);

      // 3D Volumetric body curvature (curves outward like a cylindrical human figure in 3D space)
      let normVolX = 0;
      let normVolY = 0;
      let normVolZ = 1;

      if (bodySpan > 20 && x >= lBound && x <= rBound) {
        // Horizontal normalized position from -1 (left edge of body) to +1 (right edge of body)
        const relX = Math.max(-1, Math.min(1, ((x - bodyCenter) / (bodySpan * 0.5))));
        normVolX = relX * 0.75; // Curves towards left or right side

        // Head region (top 28% of height): spherical curvature
        if (y < height * 0.28) {
          const headCenterY = height * 0.14;
          const headRadiusY = height * 0.14;
          const relY = Math.max(-1, Math.min(1, (y - headCenterY) / headRadiusY));
          normVolY = -relY * 0.55; // Curves up/down on head
        }

        const zSq = 1 - (normVolX * normVolX + normVolY * normVolY);
        normVolZ = Math.sqrt(Math.max(0.1, zSq));
      }

      // Combine high-frequency surface detail with low-frequency 3D volumetric curvature
      let nx = -dX * bumpStrength + normVolX * 0.85;
      let ny = -dY * bumpStrength + normVolY * 0.85;
      let nz = Math.max(0.2, normVolZ);

      // Normalize vector
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= len;
      ny /= len;
      nz /= len;

      // Pack into [0, 255]
      normalBuffer[idx * 4] = Math.round((nx * 0.5 + 0.5) * 255);
      normalBuffer[idx * 4 + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      normalBuffer[idx * 4 + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      normalBuffer[idx * 4 + 3] = a;

      // Roughness calculation:
      // Shoes / watch / hair highlights = lower roughness (more specular shine)
      // Hoodie fabric = medium-high roughness
      const brightness = lum[idx];
      let rough = 0.5;
      if (y > height * 0.85) {
        // Shoes region: glossier highlights on leather / rubber soles
        rough = brightness > 0.6 ? 0.2 : 0.45;
      } else if (y < height * 0.25) {
        // Hair & face: smooth skin and shiny hair curls
        rough = 0.38;
      } else {
        // Hoodie & pants: comfortable soft matte fabric
        rough = 0.62;
      }

      roughnessBuffer[idx * 4] = Math.round(rough * 255);
      roughnessBuffer[idx * 4 + 1] = Math.round(rough * 255);
      roughnessBuffer[idx * 4 + 2] = Math.round(rough * 255);
      roughnessBuffer[idx * 4 + 3] = a;
    }
  }

  await sharp(normalBuffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(normalPath);

  await sharp(roughnessBuffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(roughnessPath);

  console.log('Successfully created:');
  console.log(' -', normalPath);
  console.log(' -', roughnessPath);
}

generate3DMaps().catch(console.error);

