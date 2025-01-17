import { Request, Response } from "express";
import { Estudiante } from "../models/estudianteModel";


const { json } = require('express');

class EstudiantesController {

    constructor() {

    }

    async consultar(req: Request, res: Response) {
        try {
           const data = await Estudiante.find();
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
            const registro = await Estudiante.findOneBy({id: Number(id)});
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
           res.status(200).json(registro);
         } catch (err) {
             if (err instanceof Error) {
                 res.status(500).send(err.message);
             }
         }
    }
    
    async ingresar(req: Request, res: Response) {
        const { cedula, nombre, apellido, email } = req.body;
        try {
            const ingreso = await Estudiante.save(req.body);
            res.status(201).json(ingreso);
         } catch (err) {
             if (err instanceof Error) {
                 res.status(500).send(err.message);
             }
         }
    }

    async actualizar(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const registro = await Estudiante.findOneBy({id: Number(id)});
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            await Estudiante.update({id: Number(id)}, req.body);
            const registroActualizado = await Estudiante.findOneBy({id: Number(id)});
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
            const registro = await Estudiante.findOneBy({id: Number(id)});
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            await Estudiante.delete({id: Number(id)});
            res.send(204);
         } catch (err) {
             if (err instanceof Error) {
                 res.status(500).send(err.message);
             }
         }
    }

}

export default new EstudiantesController();