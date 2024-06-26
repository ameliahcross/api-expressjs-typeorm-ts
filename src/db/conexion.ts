import 'dotenv/config';
import { DataSource } from "typeorm";
import { Estudiante } from '../models/estudianteModel';
import { Profesor } from '../models/profesorModel';
import { Curso } from '../models/cursoModel';

export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    entities: [Estudiante, Profesor, Curso],
    synchronize: false,
    migrations: [],
    extra: {
        options: {
            encrypt: true,
            trustServerCertificate: true,
        },
    },
})