import { executeQuery, transaction } from '../config/database';
import { logger } from '../utils/logger';
import type { Project } from '../types/project';

export const projectService = {
  async getProjects(ownerId: string, filters = {}) {
    try {
      let query = `
        SELECT p.*, u.name as owner_name, c.name as contractor_name 
        FROM projects p
        LEFT JOIN users u ON p.owner_id = u.id
        LEFT JOIN users c ON p.contractor_id = c.id
        WHERE p.owner_id = ?
      `;
      const params: any[] = [ownerId];

      if (filters.status) {
        query += ' AND p.status = ?';
        params.push(filters.status);
      }

      if (filters.type) {
        query += ' AND p.type = ?';
        params.push(filters.type);
      }

      query += ' ORDER BY p.start_date DESC';

      const projects = await executeQuery<Project[]>(query, params);
      return projects;
    } catch (error) {
      logger.error('Error fetching projects:', error);
      throw error;
    }
  },

  async getProjectById(id: string) {
    try {
      const [project] = await executeQuery<Project[]>(
        `SELECT p.*, u.name as owner_name, c.name as contractor_name 
         FROM projects p
         LEFT JOIN users u ON p.owner_id = u.id
         LEFT JOIN users c ON p.contractor_id = c.id
         WHERE p.id = ?`,
        [id]
      );
      return project;
    } catch (error) {
      logger.error('Error fetching project:', error);
      throw error;
    }
  },

  async createProject(projectData: Partial<Project>) {
    return transaction(async (connection) => {
      try {
        const [result] = await connection.execute(
          `INSERT INTO projects (
            project_number, title, description, owner_id, contractor_id, location, 
            budget, status, type, start_date, end_date, progress, image_paths, team, risks,
            expected_outcomes, financial_details, tools, reports, notes, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            projectData.project_number,
            projectData.title,
            projectData.description,
            projectData.owner_id,
            projectData.contractor_id || null,
            projectData.location,
            projectData.budget,
            projectData.status || 'planning', // default status
            projectData.type,
            projectData.start_date,
            projectData.end_date,
            projectData.progress || 0, // default progress
            JSON.stringify(projectData.image_paths || []),
            JSON.stringify(projectData.team || []),
            JSON.stringify(projectData.risks || []),
            JSON.stringify(projectData.expected_outcomes || []),
            JSON.stringify(projectData.financial_details || {}),
            JSON.stringify(projectData.tools || []),
            JSON.stringify(projectData.reports || []),
            JSON.stringify(projectData.notes || []),
            new Date(),
            new Date()
          ]
        );

        return { id: result.insertId, ...projectData };
      } catch (error) {
        logger.error('Error creating project:', error);
        throw error;
      }
    });
  },

  async updateProject(id: string, projectData: Partial<Project>) {
    return transaction(async (connection) => {
      try {
        const [result] = await connection.execute(
          `UPDATE projects
           SET title = ?, description = ?, location = ?, budget = ?, status = ?, type = ?, 
               start_date = ?, end_date = ?, progress = ?, image_paths = ?, team = ?, risks = ?, 
               expected_outcomes = ?, financial_details = ?, tools = ?, reports = ?, notes = ?, updated_at = ?
           WHERE id = ?`,
          [
            projectData.title,
            projectData.description,
            projectData.location,
            projectData.budget,
            projectData.status,
            projectData.type,
            projectData.start_date,
            projectData.end_date,
            projectData.progress || 0,
            JSON.stringify(projectData.image_paths || []),
            JSON.stringify(projectData.team || []),
            JSON.stringify(projectData.risks || []),
            JSON.stringify(projectData.expected_outcomes || []),
            JSON.stringify(projectData.financial_details || {}),
            JSON.stringify(projectData.tools || []),
            JSON.stringify(projectData.reports || []),
            JSON.stringify(projectData.notes || []),
            new Date(),
            id
          ]
        );
        return { id, ...projectData };
      } catch (error) {
        logger.error('Error updating project:', error);
        throw error;
      }
    });
  },
};
