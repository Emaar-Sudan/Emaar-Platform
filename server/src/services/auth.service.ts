import { executeQuery, transaction } from '../config/database';
import { logger } from '../utils/logger';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import type { User } from '../types/user';

export const authService = {
  async login(email: string, password: string) {
    try {
      const [user] = await executeQuery<User[]>(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Update last login
      await executeQuery(
        'UPDATE users SET last_login = NOW() WHERE id = ?',
        [user.id]
      );

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type,
          role: user.role
        },
        token
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  },

  async register(userData: Partial<User>) {
    return transaction(async (connection) => {
      try {
        // Check if email exists
        const [existingUser] = await connection.execute(
          'SELECT id FROM users WHERE email = ?',
          [userData.email]
        );

        if (existingUser.length > 0) {
          throw new Error('Email already exists');
        }

        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(userData.password as string, 10);

        // Insert user
        await connection.execute(
          `INSERT INTO users (
            id, email, password, name, type, role, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [
            userId,
            userData.email,
            hashedPassword,
            userData.name,
            userData.type,
            'user'
          ]
        );

        // Create profile based on user type
        if (userData.type === 'company') {
          await connection.execute(
            `INSERT INTO company_profiles (
              user_id, business_name, commercial_reg_no, created_at
            ) VALUES (?, ?, ?, NOW())`,
            [userId, userData.businessName, userData.commercialRegNo]
          );
        } else {
          await connection.execute(
            `INSERT INTO individual_profiles (
              user_id, national_id, created_at
            ) VALUES (?, ?, NOW())`,
            [userId, userData.nationalId]
          );
        }

        return {
          id: userId,
          email: userData.email,
          name: userData.name,
          type: userData.type,
          role: 'user'
        };
      } catch (error) {
        logger.error('Registration error:', error);
        throw error;
      }
    });
  }
};