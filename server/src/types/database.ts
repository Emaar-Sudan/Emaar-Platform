export interface QueryResult<T> {
  rows: T[];
  fields?: any[];
}

export interface DatabaseError extends Error {
  code: string;
  errno?: number;
  sqlState?: string;
  sqlMessage?: string;
}

export interface ConnectionConfig {
  host: string;
  database: string;
  user: string;
  password: string;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
  enableKeepAlive: boolean;
  keepAliveInitialDelay: number;
}