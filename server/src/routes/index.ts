import { Express } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import tenderRoutes from './tender.routes';
import auctionRoutes from './auction.routes';
import jobRoutes from './job.routes';
import projectRoutes from './project.routes';
import newsRoutes from './news.routes';
import resultRoutes from './result.routes';
import paymentRoutes from './payment.routes';
import notificationRoutes from './notification.routes';
import mapRoutes from './map.routes';


export const setupRoutes = (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/tenders', tenderRoutes);
  app.use('/api/auctions', auctionRoutes);
  app.use('/api/jobs', jobRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/news', newsRoutes);
  app.use('/api/results', resultRoutes);
  app.use('/api/payments', paymentRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/map', mapRoutes);
  
};