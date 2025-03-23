import { executeQuery, transaction } from '../config/database';
import { logger } from '../utils/logger';
import type { Tender, TenderSubmission } from '../types/tender';

export const tenderService = {
  async getTenders(filters = {}) {
    try {
      let query = `
        SELECT t.*, u.name as organization_name
        FROM tenders t
        LEFT JOIN users u ON t.organization_id = u.id
        WHERE 1=1
      `;
      const params: any[] = [];

      if (filters.status) {
        query += ' AND t.status = ?';
        params.push(filters.status);
      }

      if (filters.category) {
        query += ' AND t.category = ?';
        params.push(filters.category);
      }

      query += ' ORDER BY t.created_at DESC';

      const tenders = await executeQuery<Tender[]>(query, params);
      return tenders;
    } catch (error) {
      logger.error('Error fetching tenders:', error);
      throw error;
    }
  },

  async getTenderById(id: string) {
    try {
      const [tender] = await executeQuery<Tender[]>(
        `SELECT t.*, u.name as organization_name
         FROM tenders t
         LEFT JOIN users u ON t.organization_id = u.id
         WHERE t.id = ?`,
        [id]
      );
      return tender;
    } catch (error) {
      logger.error('Error fetching tender:', error);
      throw error;
    }
  },

  async submitTender(tenderSubmission: Partial<TenderSubmission>) {
    return transaction(async (connection) => {
      try {
        // Validate submission
        const [currentSubmission] = await connection.execute(
          'SELECT id FROM tender_submissions WHERE tender_id = ? AND user_id = ?',
          [tenderSubmission.tender_id, tenderSubmission.user_id]
        );

        if (currentSubmission.length > 0) {
          throw new Error('User has already submitted a bid for this tender');
        }

        // Insert new tender submission
        const [result] = await connection.execute(
          `INSERT INTO tender_submissions (
            tender_id, user_id, technical_file_url, financial_file_url,
            status, submission_date
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            tenderSubmission.tender_id,
            tenderSubmission.user_id,
            tenderSubmission.technical_file_url,
            tenderSubmission.financial_file_url,
            'pending',
            new Date()
          ]
        );

        // Optionally, update tender status or other related logic if needed
        await connection.execute(
          'UPDATE tenders SET status = ? WHERE id = ?',
          ['under_review', tenderSubmission.tender_id]
        );

        return { id: result.insertId, ...tenderSubmission };
      } catch (error) {
        logger.error('Error submitting tender:', error);
        throw error;
      }
    });
  },

  async getTenderSubmissions(tenderId: string) {
    try {
      const submissions = await executeQuery<TenderSubmission[]>(
        'SELECT * FROM tender_submissions WHERE tender_id = ?',
        [tenderId]
      );
      return submissions;
    } catch (error) {
      logger.error('Error fetching tender submissions:', error);
      throw error;
    }
  },

  async updateTenderSubmissionStatus(submissionId: string, status: 'pending' | 'under_review' | 'accepted' | 'rejected') {
    try {
      const [result] = await executeQuery(
        'UPDATE tender_submissions SET status = ? WHERE id = ?',
        [status, submissionId]
      );
      return result;
    } catch (error) {
      logger.error('Error updating tender submission status:', error);
      throw error;
    }
  }
};
