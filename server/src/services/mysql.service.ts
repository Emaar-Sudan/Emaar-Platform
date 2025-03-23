import { pool, executeQuery } from '../config/database';
import { logger } from '../utils/logger';

export const mysqlService = {
  // Generic query execution
  async query<T>(sql: string, params?: any[]): Promise<T> {
    try {
      return await executeQuery<T>(sql, params);
    } catch (error) {
      logger.error('MySQL query error:', { sql, params, error });
      throw error;
    }
  },

  // Transaction helper
  async transaction<T>(callback: (query: typeof executeQuery) => Promise<T>): Promise<T> {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const result = await callback(async (sql, params) => {
        const [rows] = await connection.execute(sql, params);
        return rows;
      });

      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};