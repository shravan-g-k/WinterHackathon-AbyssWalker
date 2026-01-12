import Tesseract from 'tesseract.js';

/**
 * Cleans extracted OCR text by removing extra whitespace and unwanted noise symbols.
 * @param {string} text - The raw text from Tesseract.
 * @returns {string} - The cleaned text.
 */
const cleanOCRText = (text) => {
  if (!text) return "";

  return text
    // Remove unwanted symbols often produced by OCR noise (e.g., random bars, dots, or slashes)
    // You can customize this regex based on your specific needs
    .replace(/[|\\/_~^]/g, '')
    // Replace multiple spaces/newlines with a single space
    .replace(/\s+/g, ' ')
    // Remove leading/trailing whitespace
    .trim();
};

/**
 * Simple OCR Service using Tesseract.js
 * Uses the high-level recognize function and applies post-processing cleaning.
 */
export const processImageOCR = async (file, language = 'eng', onProgress) => {
  if (!file) throw new Error("Please select an image first.");

  try {
    const { data: { text } } = await Tesseract.recognize(
      file,
      language,
      {
        logger: m => {
          if (m.status === 'recognizing text' && onProgress) {
            onProgress(Math.floor(m.progress * 100));
          }
        }
      }
    );

    // Apply the cleaning logic before returning the result
    return cleanOCRText(text);
    
  } catch (error) {
    console.error("OCR Service Error:", error);
    throw new Error("Failed to read text from image.");
  }
};