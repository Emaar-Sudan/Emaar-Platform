import { jsPDF } from 'jspdf';
import { formatCurrency } from './formatters';

interface ReceiptData {
  transactionId: string;
  amount: number;
  date: string;
  type: string;
  reference: string;
  status: string;
}

export const generatePDFReport = async (data: ReceiptData): Promise<boolean> => {
  try {
    // Create new document with RTL support
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Add logo and header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Payment Receipt', 105, 20, { align: 'center' });
    
    // Add receipt details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    
    const details = [
      ['Transaction ID:', data.transactionId],
      ['Amount:', formatCurrency(data.amount, 'ltr')],
      ['Date:', data.date],
      ['Type:', data.type.toUpperCase()],
      ['Reference:', data.reference],
      ['Status:', data.status.toUpperCase()]
    ];

    let y = 40;
    details.forEach(([label, value]) => {
      // Draw label
      doc.setFont('helvetica', 'bold');
      doc.text(label, 20, y);
      
      // Draw value
      doc.setFont('helvetica', 'normal');
      doc.text(String(value), 80, y);
      
      y += 10;
    });

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    const footerText = 'This is an electronically generated receipt';
    doc.text(footerText, 105, 280, { align: 'center' });

    // Save the PDF
    doc.save(`payment-receipt-${data.transactionId}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF receipt');
  }
};