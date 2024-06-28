import { Request, Response } from "express";
import { Curso } from "../models/cursoModel";
import { Profesor } from "../models/profesorModel";
import { Estudiante } from "../models/estudianteModel";


const { json } = require('express');

class CursosController {

    constructor() {

    }

    async consultar(req: Request, res: Response) {
        try {
           const data = await Curso.find({relations: {profesor: true, estudiantes: true}});
           res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async consultarDetalle(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const registro = await Curso.findOne({ where: {id: Number(id)}, relations: {estudiantes: true, profesor:true}});
            if (!registro) {
                throw new Error('Curso no encontrado');
            }
           res.status(200).json(registro);
         } catch (err) {
             if (err instanceof Error) {
                 res.status(500).send(err.message);
             }
         }
    }
    
    async ingresar(req: Request, res: Response) {
        const { nombre, descripcion, profesor } = req.body;
        try {
            const profesorRegistro = await Profesor.findOneBy({ id: Number(profesor) });
            if (!profesorRegistro) {
                throw new Error('Profesor no encontrado');
            }
            const curso = new Curso();
            curso.nombre = nombre;
            curso.descripcion = descripcion;
            curso.profesor = profesorRegistro;
            const registro = await Curso.save(curso);
            res.status(201).json(registro);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async actualizar(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const {profesor} = req.body;
            const profesorRegistro = await Profesor.findOneBy({id: Number(profesor)});
            if (!profesorRegistro) {
                throw new Error('Profesor no encontrado');
            }
            const registro = await Curso.findOneBy({id: Number(id)});
            if (!registro) {
                throw new Error('Curso no encontrado');
            }
            await Curso.update({id: Number(id)}, req.body);
            const registroActualizado = await Curso.findOne({ where: {id: Number(id)}, relations: {estudiantes: true, profesor:true}});
            res.status(200).json(registroActualizado);
         } catch (err) {
             if (err instanceof Error) {
                 res.status(500).send(err.message);
             }
         }
    }

    async borrar(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const registro = await Curso.findOneBy({id: Number(id)});
            if (!registro) {
                throw new Error('Curso no encontrado');
            }
            await Curso.delete({id: Number(id)});
            res.send(204);
         } catch (err) {
             if (err instanceof Error) {
                 res.status(500).send(err.message);
             }
         }
    }

    async asociarEstudiante(req: Request, res: Response) {
        const { id } = req.body;
        try {
            // Extraer las propiedades que se enviarán en el cuerpo de la solicitud
            const { estudiante_id, curso_id } = req.body;
            // Consultar si existe el estudiante a asociar
            const estudiante = await Estudiante.findOneBy({id: Number(estudiante_id)});
            // Consultar si existe el curso a asociar
            const curso = await Curso.findOneBy({id: Number(curso_id)});
            // Consultar si existe el estudiante a asociar
            if (!estudiante) {
                throw new Error('Estudiante no encontrado');
            }
            // Verificar si se encontró el curso
            if (!curso) {
                throw new Error('Curso no encontrado');
            }
            // Asegura que curso.estudiantes sea un array, incluso si estaba vacío
            curso.estudiantes = curso.estudiantes || [];
            curso.estudiantes.push(estudiante);
            const nuevoRegistro = await Curso.save(curso);
            res.status(200).json(nuevoRegistro);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

}

export default new CursosController();