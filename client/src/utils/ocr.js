import { createWorker } from 'tesseract.js';

/**
 * Perform client-side OCR on an image or PDF snapshot file using Tesseract WASM.
 * @param {File|Blob} file Image file to process
 * @param {Function} onProgress Progress callback (0 to 100)
 * @returns {Promise<string>} Extracted text string
 */
export async function performOCR(file, onProgress = () => {}) {
  let worker = null;
  try {
    worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          const progressPercent = Math.round((m.progress || 0) * 100);
          onProgress(progressPercent);
        }
      },
    });

    const ret = await worker.recognize(file);
    await worker.terminate();
    return ret.data.text || '';
  } catch (error) {
    if (worker) {
      await worker.terminate();
    }
    console.error('Tesseract OCR Failure:', error);
    throw new Error('Failed to extract text from document. Please try a clearer image.');
  }
}
