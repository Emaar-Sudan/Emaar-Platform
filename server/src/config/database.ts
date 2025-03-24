import mysql from "mysql2/promise";
import { config } from "dotenv";
import { logger } from "../utils/logger";

// تحميل المتغيرات من ملف .env
config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: Number(process.env.DB_QUEUE_LIMIT) || 0,
  ssl: {
    rejectUnauthorized:
      process.env.DB_SSL_REJECT_UNAUTHORIZED === "false" ? false : true,
  },
};

export const pool = mysql.createPool(dbConfig);

export const testConnection = async () => {
  try {
    const connection = await mysql.createPool(dbConfig);
    logger.info("MySQL database connection successful");
    return connection;
  } catch (error) {
    logger.error("MySQL database connection failed:", error);
    return false;
  }
};

export const executeQuery = async <T>(
  query: string,
  params?: any[],
): Promise<T> => {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(query, params);
    return results as T;
  } catch (error) {
    logger.error("Query execution failed:", { query, params, error });
    throw error;
  } finally {
    connection.release();
  }
};

export const transaction = async <T>(
  callback: (connection: mysql.Connection) => Promise<T>,
): Promise<T> => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export default {
  pool,
  testConnection,
  executeQuery,
  transaction,
};

