import { executeQuery, transaction } from '../config/database';
import { logger } from '../utils/logger';
import type { News } from '../types/news';

export const newsService = {
  async getNews(filters = {}) {
    try {
      let query = `
        SELECT n.*, u.name as author_name
        FROM news n
        LEFT JOIN users u ON n.author_id = u.id
        WHERE 1=1
      `;
      const params: any[] = [];

      if (filters.status) {
        query += ' AND n.status = ?';
        params.push(filters.status);
      }

      if (filters.type) {
        query += ' AND n.type = ?';
        params.push(filters.type);
      }

      query += ' ORDER BY n.published_at DESC';

      const news = await executeQuery<News[]>(query, params);
      return news;
    } catch (error) {
      logger.error('Error fetching news:', error);
      throw error;
    }
  },

  async getNewsById(id: string) {
    try {
      const [news] = await executeQuery<News[]>(
        `SELECT n.*, u.name as author_name
         FROM news n
         LEFT JOIN users u ON n.author_id = u.id
         WHERE n.id = ?`,
        [id]
      );
      return news;
    } catch (error) {
      logger.error('Error fetching news:', error);
      throw error;
    }
  },

  async createNews(newsData: Partial<News>) {
    return transaction(async (connection) => {
      try {
        const [result] = await connection.execute(
          `INSERT INTO news (
            type, title, content, image_url, author_id, published_at, status, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newsData.type,
            newsData.title,
            newsData.content,
            newsData.image_url,
            newsData.author_id || null,
            newsData.published_at,
            newsData.status || 'draft',
            new Date(),
            new Date(),
          ]
        );

        return { id: result.insertId, ...newsData };
      } catch (error) {
        logger.error('Error creating news:', error);
        throw error;
      }
    });
  },

  async updateNews(id: string, newsData: Partial<News>) {
    return transaction(async (connection) => {
      try {
        const [result] = await connection.execute(
          `UPDATE news SET 
            type = ?, title = ?, content = ?, image_url = ?, author_id = ?, 
            published_at = ?, status = ?, updated_at = ? 
          WHERE id = ?`,
          [
            newsData.type,
            newsData.title,
            newsData.content,
            newsData.image_url,
            newsData.author_id || null,
            newsData.published_at,
            newsData.status || 'draft',
            new Date(),
            id,
          ]
        );

        return result;
      } catch (error) {
        logger.error('Error updating news:', error);
        throw error;
      }
    });
  },

  async deleteNews(id: string) {
    try {
      const [result] = await executeQuery(
        'DELETE FROM news WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      logger.error('Error deleting news:', error);
      throw error;
    }
  }
};
