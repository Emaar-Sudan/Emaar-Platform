import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { setupRoutes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { testConnection as testMySQLConnection } from './config/database';
import { validateDatabaseSchema } from './utils/database';
import { logger } from './utils/logger';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3306;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Health check endpoint
app.get('/health', async (req, res) => {
  let mysqlConnected = false;
  let retries = 3;

  while (retries > 0) {
    mysqlConnected = await testMySQLConnection();
    if (mysqlConnected) break;
    retries--;
    logger.warn(`Retrying MySQL connection... Attempts left: ${retries}`);
    await new Promise((res) => setTimeout(res, 5000)); // انتظار 5 ثوانٍ قبل إعادة المحاولة
  }

  res.json({
    status: 'ok',
    mysqlConnected,
    timestamp: new Date().toISOString()
  });
});

// Setup routes
setupRoutes(app);

// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Check MySQL connection and schema
    const [mysqlConnected, schemaValid] = await Promise.all([
      testMySQLConnection(),
      validateDatabaseSchema()
    ]);

    if (!mysqlConnected) {
      logger.warn('Warning: Could not connect to MySQL. Retrying...');
    }

    if (!schemaValid) {
      logger.warn('Warning: Database schema validation failed. Some features may not work correctly.');
    }

    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
      logger.info(`Database connections:
        MySQL: ${mysqlConnected ? 'OK' : 'Failed'}
        Schema: ${schemaValid ? 'Valid' : 'Invalid'}
      `);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
