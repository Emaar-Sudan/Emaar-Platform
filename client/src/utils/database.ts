import mysql from 'mysql2/promise';

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tenders_db',
};

export async function createConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export async function getAllTables() {
  const connection = await createConnection();
  try {
    const [rows] = await connection.query('SHOW TABLES');
    return rows.map((row: any) => Object.values(row)[0]);
  } finally {
    await connection.end();
  }
}

export async function getTableSchema(tableName: string) {
  const connection = await createConnection();
  try {
    const [columns] = await connection.query(`DESCRIBE ${tableName}`);
    return columns;
  } finally {
    await connection.end();
  }
}

export async function getTableData(tableName: string) {
  const connection = await createConnection();
  try {
    const [rows] = await connection.query(`SELECT * FROM ${tableName}`);
    return rows;
  } finally {
    await connection.end();
  }
}

export async function getTableRelationships() {
  const connection = await createConnection();
  try {
    const [relations] = await connection.query(`
      SELECT 
        TABLE_NAME,
        COLUMN_NAME,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
      FROM
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE
        REFERENCED_TABLE_SCHEMA = ? AND
        REFERENCED_TABLE_NAME IS NOT NULL
    `, [dbConfig.database]);
    return relations;
  } finally {
    await connection.end();
  }
}