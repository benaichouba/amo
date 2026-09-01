import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export type PageOrientation = 'portrait' | 'landscape';

/**
 * Triggers an A4 Print dialog cleanly even inside nested iframes
 * by writing the content to an isolated hidden iframe with A4 page rules.
 */
export function printElementA4(
  elementId: string,
  docTitle: string = 'DidactiPlan_Official_Document',
  orientation: PageOrientation = 'portrait'
): void {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID '${elementId}' not found. Falling back to window.print()`);
    window.print();
    return;
  }

  // Collect all stylesheet links and style tags from parent document
  const styleTags = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(node => node.outerHTML)
    .join('\n');

  // Create an isolated printing iframe
  const printIframe = document.createElement('iframe');
  printIframe.style.position = 'fixed';
  printIframe.style.right = '0';
  printIframe.style.bottom = '0';
  printIframe.style.width = '0';
  printIframe.style.height = '0';
  printIframe.style.border = '0';
  printIframe.style.visibility = 'hidden';
  printIframe.setAttribute('aria-hidden', 'true');

  document.body.appendChild(printIframe);

  const iframeDoc = printIframe.contentDocument || printIframe.contentWindow?.document;
  if (!iframeDoc) {
    document.body.removeChild(printIframe);
    window.print();
    return;
  }

  const pageSizeRule = orientation === 'landscape' ? 'A4 landscape' : 'A4 portrait';
  const pageMargin = orientation === 'landscape' ? '6mm' : '8mm';

  iframeDoc.open();
  iframeDoc.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${docTitle}</title>
      ${styleTags}
      <style>
        @page {
          size: ${pageSizeRule};
          margin: ${pageMargin};
        }
        *, *::before, *::after {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          background-color: #ffffff !important;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          font-size: 11px;
          color: #0f172a;
        }
        .print-container {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 auto !important;
          padding: 0 !important;
          background: #ffffff !important;
          border: none !important;
          box-shadow: none !important;
        }
        .print\\:hidden {
          display: none !important;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          page-break-inside: auto;
        }
        tr {
          page-break-inside: avoid;
          page-break-after: auto;
        }
      </style>
    </head>
    <body>
      <div class="print-container">
        ${element.outerHTML}
      </div>
    </body>
    </html>
  `);
  iframeDoc.close();

  // Allow styles and fonts to render before triggering print
  setTimeout(() => {
    try {
      if (printIframe.contentWindow) {
        printIframe.contentWindow.focus();
        printIframe.contentWindow.print();
      } else {
        window.print();
      }
    } catch (err) {
      console.warn('Iframe print failed, falling back to window.print():', err);
      window.print();
    } finally {
      // Clean up iframe after printing
      setTimeout(() => {
        if (document.body.contains(printIframe)) {
          document.body.removeChild(printIframe);
        }
      }, 2000);
    }
  }, 350);
}

/**
 * High-resolution A4 PDF Export using html2canvas & jsPDF
 */
export async function exportElementToPdf(
  elementId: string,
  filename: string = 'DidactiPlan_Document.pdf',
  orientation: PageOrientation = 'portrait'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID '${elementId}' not found`);
  }

  // Generate high-resolution canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: orientation === 'landscape' ? 1280 : 960
  });

  const imgData = canvas.toDataURL('image/png');
  
  // A4 dimensions: Portrait: 210 x 297 mm, Landscape: 297 x 210 mm
  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const margin = orientation === 'landscape' ? 6 : 8;

  const printableWidth = pdfWidth - (margin * 2);
  const printableHeight = pdfHeight - (margin * 2);

  const imgWidth = printableWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Single page fit calculation
  if (imgHeight <= printableHeight) {
    const posX = margin;
    const posY = margin + ((printableHeight - imgHeight) / 4); // Slight top-center bias
    pdf.addImage(imgData, 'PNG', posX, posY, imgWidth, imgHeight, undefined, 'FAST');
  } else {
    // If it slightly overflows, scale down to fit cleanly on one single A4 sheet
    if (imgHeight <= printableHeight * 1.35) {
      const scaleFactor = printableHeight / imgHeight;
      const finalWidth = imgWidth * scaleFactor;
      const finalHeight = imgHeight * scaleFactor;
      const posX = (pdfWidth - finalWidth) / 2;
      const posY = margin;
      pdf.addImage(imgData, 'PNG', posX, posY, finalWidth, finalHeight, undefined, 'FAST');
    } else {
      // Multi-page slicing for longer documents
      let heightLeft = imgHeight;
      let position = margin;
      let pageCount = 0;

      while (heightLeft > 0) {
        if (pageCount > 0) {
          pdf.addPage('a4', orientation);
        }
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= printableHeight;
        position -= printableHeight;
        pageCount++;
      }
    }
  }

  pdf.save(filename);
}
