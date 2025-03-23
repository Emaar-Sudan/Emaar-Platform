import { executeQuery, transaction } from '../config/database';
import { logger } from '../utils/logger';
import type { Payment } from '../types/payment';

export const paymentService = {
  async getPayments(userId: string, filters = {}) {
    try {
      let query = `
        SELECT p.* 
        FROM payments p
        WHERE p.user_id = ?
      `;
      const params: any[] = [userId];

      if (filters.status) {
        query += ' AND p.status = ?';
        params.push(filters.status);
      }

      if (filters.type) {
        query += ' AND p.type = ?';
        params.push(filters.type);
      }

      query += ' ORDER BY p.created_at DESC';

      const payments = await executeQuery<Payment[]>(query, params);
      return payments;
    } catch (error) {
      logger.error('Error fetching payments:', error);
      throw error;
    }
  },

  async getPaymentById(id: string) {
    try {
      const [payment] = await executeQuery<Payment[]>(
        `SELECT * FROM payments WHERE id = ?`,
        [id]
      );
      return payment;
    } catch (error) {
      logger.error('Error fetching payment:', error);
      throw error;
    }
  },

  async createPayment(paymentData: Partial<Payment>) {
    return transaction(async (connection) => {
      try {
        const [result] = await connection.execute(
          `INSERT INTO payments (
            user_id, type, item_id, submission_id, amount, status, 
            payment_method, transaction_id, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            paymentData.user_id,
            paymentData.type,
            paymentData.item_id,
            paymentData.submission_id,
            paymentData.amount,
            'pending', // default value for status is 'pending'
            paymentData.payment_method,
            paymentData.transaction_id,
            new Date(),
          ]
        );

        return { id: result.insertId, ...paymentData };
      } catch (error) {
        logger.error('Error creating payment:', error);
        throw error;
      }
    });
  },

  async updatePaymentStatus(id: string, status: 'pending' | 'completed' | 'failed' | 'refunded') {
    return transaction(async (connection) => {
      try {
        await connection.execute(
          `UPDATE payments SET status = ? WHERE id = ?`,
          [status, id]
        );
      } catch (error) {
        logger.error('Error updating payment status:', error);
        throw error;
      }
    });
  },

  async deletePayment(id: string) {
    try {
      const [result] = await executeQuery(
        'DELETE FROM payments WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      logger.error('Error deleting payment:', error);
      throw error;
    }
  },

  async processPayment(paymentData: Payment) {
    return transaction(async (connection) => {
      try {
        // Process payment logic (e.g., integrating with payment gateway)
        // This is just a placeholder logic.
        const paymentStatus = 'completed'; // Assume the payment was successful

        // Update payment status after processing
        await connection.execute(
          `UPDATE payments SET status = ? WHERE id = ?`,
          [paymentStatus, paymentData.id]
        );

        return { ...paymentData, status: paymentStatus };
      } catch (error) {
        logger.error('Error processing payment:', error);
        throw error;
      }
    });
  }
};
