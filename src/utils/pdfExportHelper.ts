import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportElementToPdf(
  elementId: string,
  filename: string = 'Monthly_Pedagogical_Distribution.pdf'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  // Create canvas with high quality scale
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  
  // Create PDF in landscape A4 format
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth - 10; // 5mm margin on each side
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Fit to page height if needed
  if (imgHeight > (pdfHeight - 10)) {
    const scaleFactor = (pdfHeight - 10) / imgHeight;
    const finalWidth = imgWidth * scaleFactor;
    const finalHeight = imgHeight * scaleFactor;
    const posX = (pdfWidth - finalWidth) / 2;
    const posY = 5;
    pdf.addImage(imgData, 'PNG', posX, posY, finalWidth, finalHeight);
  } else {
    const posX = 5;
    const posY = (pdfHeight - imgHeight) / 2;
    pdf.addImage(imgData, 'PNG', posX, posY, imgWidth, imgHeight);
  }

  pdf.save(filename);
}
