import html2pdf from 'html2pdf.js';

export const pdfService = {
  async downloadPdf(element, filename = 'inspection-report.pdf') {
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };
    return html2pdf().set(opt).from(element).save();
  },
};
