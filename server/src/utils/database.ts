import { executeQuery } from '../config/database';
import { logger } from './logger';

export async function checkTableExists(tableName: string): Promise<boolean> {
  try {
    const result = await executeQuery<any[]>(
      'SELECT 1 FROM information_schema.tables WHERE table_schema = ? AND table_name = ?',
      [process.env.DB_NAME || 'if0_38542285_emaar', tableName]
    );
    return result.length > 0;
  } catch (error) {
    logger.error('Error checking table existence:', { tableName, error });
    return false;
  }
}

export async function getTableColumns(tableName: string): Promise<string[]> {
  try {
    const result = await executeQuery<any[]>(
      'SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
      [process.env.DB_NAME || 'if0_38542285_emaar', tableName]
    );
    return result.map(row => row.COLUMN_NAME);
  } catch (error) {
    logger.error('Error getting table columns:', { tableName, error });
    return [];
  }
}

export async function validateDatabaseSchema(): Promise<boolean> {
  const requiredTables = [
    'users',
    'tenders',
    'auctions',
    'jobs',
    'projects',
    'payments',
    'notifications'
  ];

  try {
    const results = await Promise.all(
      requiredTables.map(table => checkTableExists(table))
    );

    const missingTables = requiredTables.filter((_, index) => !results[index]);
    
    if (missingTables.length > 0) {
      logger.error('Missing required tables:', missingTables);
      return false;
    }

    logger.info('Database schema validation successful');
    return true;
  } catch (error) {
    logger.error('Database schema validation failed:', error);
    return false;
  }
}

export async function initializeDatabase(): Promise<void> {
  try {
    // Create tables if they don't exist
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        phone VARCHAR(20),
        photo_url TEXT,
        type ENUM('individual', 'company') NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Add other table creation queries as needed

    logger.info('Database initialization completed');
  } catch (error) {
    logger.error('Database initialization failed:', error);
    throw error;
  }
}