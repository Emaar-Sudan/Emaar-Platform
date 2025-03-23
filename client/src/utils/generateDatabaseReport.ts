import {
  getAllTables,
  getTableSchema,
  getTableData,
  getTableRelationships
} from './database';
import { generatePDFReport } from './reportGenerators/pdfReportGenerator';
import { generateExcelReport } from './reportGenerators/excelReportGenerator';

async function generateReport() {
  try {
    console.log('Starting database report generation...');

    // Gather all database information
    const tables = await getAllTables();
    const databaseInfo = {
      tables: [],
      totalRecords: 0
    };

    // Collect detailed information for each table
    for (const tableName of tables) {
      console.log(`Processing table: ${tableName}`);
      
      const schema = await getTableSchema(tableName);
      const data = await getTableData(tableName);
      const relationships = (await getTableRelationships())
        .filter((rel: any) => rel.TABLE_NAME === tableName);

      databaseInfo.tables.push({
        name: tableName,
        schema,
        data,
        relationships
      });

      databaseInfo.totalRecords += data.length;
    }

    // Generate reports in different formats
    console.log('Generating PDF report...');
    const pdfPath = await generatePDFReport(databaseInfo);
    console.log(`PDF report generated: ${pdfPath}`);

    console.log('Generating Excel report...');
    const excelPath = await generateExcelReport(databaseInfo);
    console.log(`Excel report generated: ${excelPath}`);

    console.log('Report generation completed successfully!');
  } catch (error) {
    console.error('Error generating database report:', error);
    process.exit(1);
  }
}

generateReport();