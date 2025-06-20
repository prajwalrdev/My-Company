import fs from 'fs';
import { PDFDocument } from 'pdf-lib'; // Assuming pdf-lib is used

// Function to merge PDFs
export async function mergePdfs(inputPath1, inputPath2) {
  const mergedPdf = await PDFDocument.create();

  // Read the first PDF
  const pdfBytes1 = fs.readFileSync(inputPath1);
  const pdf1 = await PDFDocument.load(pdfBytes1);
  const copiedPages1 = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
  copiedPages1.forEach(page => mergedPdf.addPage(page));

  // Read the second PDF
  const pdfBytes2 = fs.readFileSync(inputPath2);
  const pdf2 = await PDFDocument.load(pdfBytes2);
  const copiedPages2 = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
  copiedPages2.forEach(page => mergedPdf.addPage(page));

  // Save the merged PDF to a file
  const mergedPdfBytes = await mergedPdf.save();
  fs.writeFileSync('public/merged.pdf', mergedPdfBytes); // Save to 'public' folder
}
