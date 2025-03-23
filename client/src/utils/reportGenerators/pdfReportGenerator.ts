import PDFDocument from 'pdfkit';
import fs from 'fs';
import { format } from 'date-fns';

export async function generatePDFReport(data: any) {
  const doc = new PDFDocument();
  const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
  const outputPath = `database_report_${timestamp}.pdf`;
  const stream = fs.createWriteStream(outputPath);

  doc.pipe(stream);

  // Title
  doc.fontSize(20).text('Database Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
  doc.moveDown(2);

  // Tables Information
  data.tables.forEach((table: any) => {
    // Table Header
    doc.fontSize(16).text(table.name, { underline: true });
    doc.moveDown();

    // Schema
    doc.fontSize(14).text('Schema:');
    table.schema.forEach((column: any) => {
      doc.fontSize(10).text(`${column.Field} (${column.Type}) ${column.Key === 'PRI' ? '- Primary Key' : ''}`);
    });
    doc.moveDown();

    // Relationships
    if (table.relationships.length > 0) {
      doc.fontSize(14).text('Relationships:');
      table.relationships.forEach((rel: any) => {
        doc.fontSize(10).text(`→ References ${rel.REFERENCED_TABLE_NAME}.${rel.REFERENCED_COLUMN_NAME}`);
      });
    }
    doc.moveDown(2);
  });

  // Statistics
  doc.fontSize(16).text('Database Statistics', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text(`Total Tables: ${data.tables.length}`);
  doc.fontSize(12).text(`Total Records: ${data.totalRecords}`);

  doc.end();
  return outputPath;
}