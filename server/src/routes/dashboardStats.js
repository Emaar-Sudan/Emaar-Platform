// dashboardStats.js (Server-side)
const express = require('express');
const router = express.Router();
const connection = require('./db');

router.get('/dashboard-stats', (req, res) => {
  const userId = req.user.id; // تأكد من أنك تحصل على userId من الجلسة أو المصادقة

  // الاستعلامات المطلوبة للحصول على الإحصائيات
  const tenderQuery = `
    SELECT COUNT(*) AS totalTenders FROM tender_submissions WHERE user_id = ?
  `;
  const auctionQuery = `
    SELECT COUNT(*) AS totalAuctions FROM auction_bids WHERE user_id = ?
  `;
  const jobQuery = `
    SELECT COUNT(*) AS totalJobs FROM job_applications WHERE user_id = ?
  `;
  const paymentsQuery = `
    SELECT SUM(amount) AS totalValue FROM payments WHERE user_id = ? AND status = 'completed'
  `;

  // تنفيذ الاستعلامات بشكل متوازي
  Promise.all([
    new Promise((resolve, reject) => {
      connection.execute(tenderQuery, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results[0].totalTenders);
      });
    }),
    new Promise((resolve, reject) => {
      connection.execute(auctionQuery, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results[0].totalAuctions);
      });
    }),
    new Promise((resolve, reject) => {
      connection.execute(jobQuery, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results[0].totalJobs);
      });
    }),
    new Promise((resolve, reject) => {
      connection.execute(paymentsQuery, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results[0].totalValue || 0);
      });
    })
  ])
    .then(([totalTenders, totalAuctions, totalJobs, totalValue]) => {
      // حساب معدل النجاح
      const successRate = Math.round(
        ((totalTenders + totalAuctions + totalJobs) /
        (totalTenders + totalAuctions + totalJobs || 1)) * 100
      );

      res.json({
        successRate,
        totalValue,
        tenderBids: totalTenders,
        auctionBids: totalAuctions,
        jobApplications: totalJobs
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching dashboard stats');
    });
});

module.exports = router;
