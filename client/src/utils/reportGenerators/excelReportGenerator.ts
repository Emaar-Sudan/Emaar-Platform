import ExcelJS from 'exceljs';
import { format } from 'date-fns';

export async function generateExcelReport(data: any) {
  const workbook = new ExcelJS.Workbook();
  const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
  const outputPath = `database_report_${timestamp}.xlsx`;

  // Overview Sheet
  const overviewSheet = workbook.addWorksheet('Overview');
  overviewSheet.columns = [
    { header: 'Table Name', key: 'tableName', width: 30 },
    { header: 'Record Count', key: 'recordCount', width: 15 },
    { header: 'Columns Count', key: 'columnsCount', width: 15 }
  ];

  data.tables.forEach((table: any) => {
    overviewSheet.addRow({
      tableName: table.name,
      recordCount: table.data.length,
      columnsCount: table.schema.length
    });
  });

  // Individual Table Sheets
  data.tables.forEach((table: any) => {
    const sheet = workbook.addWorksheet(table.name);
    
    // Schema
    const schemaSheet = workbook.addWorksheet(`${table.name}_Schema`);
    schemaSheet.columns = [
      { header: 'Column', key: 'column', width: 20 },
      { header: 'Type', key: 'type', width: 15 },
      { header: 'Key', key: 'key', width: 10 },
      { header: 'Default', key: 'default', width: 15 },
      { header: 'Extra', key: 'extra', width: 20 }
    ];

    table.schema.forEach((column: any) => {
      schemaSheet.addRow({
        column: column.Field,
        type: column.Type,
        key: column.Key,
        default: column.Default,
        extra: column.Extra
      });
    });

    // Data
    if (table.data.length > 0) {
      const columns = Object.keys(table.data[0]).map(key => ({
        header: key,
        key,
        width: 20
      }));
      sheet.columns = columns;
      table.data.forEach((row: any) => sheet.addRow(row));
    }
  });

  await workbook.xlsx.writeFile(outputPath);
  return outputPath;
}