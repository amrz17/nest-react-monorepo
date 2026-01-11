import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// dotenv.config({ path: 'apps/api/.env' });
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD), // ⬅️ PAKSA STRING
  database: process.env.DB_NAME,
  entities: ['apps/api/src/**/*.entity.ts'],
  migrations: ['apps/api/src/migrations/*.ts'],
  synchronize: false,
});
