import { executeQuery, transaction } from '../config/database';
import { logger } from '../utils/logger';
import type { Result, Reaction } from '../types/result';

export const resultService = {
  async getResults(filters = {}) {
    try {
      let query = `
        SELECT r.*, t.name as winner_name
        FROM results r
        LEFT JOIN users t ON r.winner = t.id
        WHERE 1=1
      `;
      const params: any[] = [];

      if (filters.type) {
        query += ' AND r.type = ?';
        params.push(filters.type);
      }

      if (filters.date) {
        query += ' AND r.date = ?';
        params.push(filters.date);
      }

      query += ' ORDER BY r.date DESC';

      const results = await executeQuery<Result[]>(query, params);
      return results;
    } catch (error) {
      logger.error('Error fetching results:', error);
      throw error;
    }
  },

  async getResultById(id: string) {
    try {
      const [result] = await executeQuery<Result[]>(
        `SELECT r.*, t.name as winner_name
         FROM results r
         LEFT JOIN users t ON r.winner = t.id
         WHERE r.id = ?`,
        [id]
      );
      return result;
    } catch (error) {
      logger.error('Error fetching result:', error);
      throw error;
    }
  },

  async createResult(resultData: Partial<Result>) {
    return transaction(async (connection) => {
      try {
        const [result] = await connection.execute(
          `INSERT INTO results (
            type, title, entity, date, description, notes, selection_method, criteria, amount, 
            winner, technical_points, financial_points, location, image_path, selected_candidates, 
            salary_min, salary_max, salary_currency, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            resultData.type,
            resultData.title,
            resultData.entity,
            resultData.date,
            resultData.description,
            resultData.notes,
            resultData.selection_method,
            resultData.criteria,
            resultData.amount,
            resultData.winner,
            resultData.technical_points || 0, // default value for technical_points
            resultData.financial_points || 0, // default value for financial_points
            resultData.location,
            resultData.image_path,
            JSON.stringify(resultData.selected_candidates || []),
            resultData.salary_min || null,
            resultData.salary_max || null,
            resultData.salary_currency || null,
            new Date(),
            new Date()
          ]
        );

        return { id: result.insertId, ...resultData };
      } catch (error) {
        logger.error('Error creating result:', error);
        throw error;
      }
    });
  },

  async updateResult(id: string, resultData: Partial<Result>) {
    return transaction(async (connection) => {
      try {
        const [result] = await connection.execute(
          `UPDATE results SET
            title = ?, entity = ?, date = ?, description = ?, notes = ?, selection_method = ?, 
            criteria = ?, amount = ?, winner = ?, technical_points = ?, financial_points = ?, 
            location = ?, image_path = ?, selected_candidates = ?, salary_min = ?, salary_max = ?, 
            salary_currency = ?, updated_at = ?
          WHERE id = ?`,
          [
            resultData.title,
            resultData.entity,
            resultData.date,
            resultData.description,
            resultData.notes,
            resultData.selection_method,
            resultData.criteria,
            resultData.amount,
            resultData.winner,
            resultData.technical_points,
            resultData.financial_points,
            resultData.location,
            resultData.image_path,
            JSON.stringify(resultData.selected_candidates || []),
            resultData.salary_min,
            resultData.salary_max,
            resultData.salary_currency,
            new Date(),
            id
          ]
        );

        return { id, ...resultData };
      } catch (error) {
        logger.error('Error updating result:', error);
        throw error;
      }
    });
  },

  async deleteResult(id: string) {
    try {
      const [result] = await executeQuery(
        'DELETE FROM results WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      logger.error('Error deleting result:', error);
      throw error;
    }
  },

  async createReaction(reactionData: Partial<Reaction>) {
    return transaction(async (connection) => {
      try {
        const [reaction] = await connection.execute(
          `INSERT INTO reactions (result_id, user_id, type, created_at) 
           VALUES (?, ?, ?, ?)`,
          [
            reactionData.result_id,
            reactionData.user_id,
            reactionData.type,
            new Date()
          ]
        );

        return { id: reaction.insertId, ...reactionData };
      } catch (error) {
        logger.error('Error creating reaction:', error);
        throw error;
      }
    });
  },

  async getReactionsByResultId(resultId: string) {
    try {
      const reactions = await executeQuery<Reaction[]>(
        `SELECT * FROM reactions WHERE result_id = ?`,
        [resultId]
      );
      return reactions;
    } catch (error) {
      logger.error('Error fetching reactions:', error);
      throw error;
    }
  }
};
