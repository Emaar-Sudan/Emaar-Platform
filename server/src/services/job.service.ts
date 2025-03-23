import { executeQuery, transaction } from '../config/database';
import { logger } from '../utils/logger';
import type { Job, JobApplication } from '../types/job';

export const jobService = {
  async getJobs(filters = {}) {
    try {
      let query = `
        SELECT j.*, u.name as organization_name
        FROM jobs j
        LEFT JOIN users u ON j.organization_id = u.id
        WHERE 1=1
      `;
      const params: any[] = [];

      if (filters.status) {
        query += ' AND j.status = ?';
        params.push(filters.status);
      }

      if (filters.type) {
        query += ' AND j.type = ?';
        params.push(filters.type);
      }

      query += ' ORDER BY j.created_at DESC';

      const jobs = await executeQuery<Job[]>(query, params);
      return jobs;
    } catch (error) {
      logger.error('Error fetching jobs:', error);
      throw error;
    }
  },

  async getJobById(id: string) {
    try {
      const [job] = await executeQuery<Job[]>(
        `SELECT j.*, u.name as organization_name
         FROM jobs j
         LEFT JOIN users u ON j.organization_id = u.id
         WHERE j.id = ?`,
        [id]
      );
      return job;
    } catch (error) {
      logger.error('Error fetching job:', error);
      throw error;
    }
  },

  async createJob(job: Partial<Job>) {
    return transaction(async (connection) => {
      try {
        const [result] = await connection.execute(
          `INSERT INTO jobs (
            job_number, title, description, organization_id, type,
            location, salary_range, requirements, benefits,
            status, deadline, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            job.job_number,
            job.title,
            job.description,
            job.organization_id,
            job.type,
            job.location,
            job.salary_range,
            JSON.stringify(job.requirements), // Assuming requirements is an array
            JSON.stringify(job.benefits), // Assuming benefits is an array
            job.status || 'draft',
            job.deadline,
            new Date(),
            new Date(),
          ]
        );

        return { id: result.insertId, ...job };
      } catch (error) {
        logger.error('Error creating job:', error);
        throw error;
      }
    });
  },

  async applyForJob(jobApplication: Partial<JobApplication>) {
    return transaction(async (connection) => {
      try {
        // Check if the user has already applied for this job
        const [existingApplication] = await connection.execute(
          'SELECT id FROM job_applications WHERE job_id = ? AND user_id = ?',
          [jobApplication.job_id, jobApplication.user_id]
        );

        if (existingApplication.length > 0) {
          throw new Error('User has already applied for this job');
        }

        // Insert new job application
        const [result] = await connection.execute(
          `INSERT INTO job_applications (
            job_id, user_id, cover_letter, resume_url, status, application_date
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            jobApplication.job_id,
            jobApplication.user_id,
            jobApplication.cover_letter || null,
            jobApplication.resume_url,
            'pending',
            new Date(),
          ]
        );

        return { id: result.insertId, ...jobApplication };
      } catch (error) {
        logger.error('Error applying for job:', error);
        throw error;
      }
    });
  },

  async getJobApplications(jobId: string) {
    try {
      const applications = await executeQuery<JobApplication[]>(
        'SELECT * FROM job_applications WHERE job_id = ?',
        [jobId]
      );
      return applications;
    } catch (error) {
      logger.error('Error fetching job applications:', error);
      throw error;
    }
  },

  async updateJobApplicationStatus(applicationId: string, status: 'pending' | 'under_review' | 'accepted' | 'rejected') {
    try {
      const [result] = await executeQuery(
        `UPDATE job_applications
         SET status = ?
         WHERE id = ?`,
        [status, applicationId]
      );
      return result;
    } catch (error) {
      logger.error('Error updating job application status:', error);
      throw error;
    }
  },
};
