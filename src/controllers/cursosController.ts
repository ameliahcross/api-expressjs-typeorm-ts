import { Request, Response } from "express";

const { json } = require('express');

class CursosController {

    constructor() {

    }

    async consultar(req: Request, res: Response) {
        try {
           res.send("Consultar cursos")
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async consultarDetalle(req: Request, res: Response) {
        const {id} = req.params;
        try {
            res.send("Consultar detalle")
         } catch (err) {
             if (err instanceof Error) {
                 res.status(500).send(err.message);
             }
         }
    }
    
    async ingresar(req: Request, res: Response) {
        const { cedula, nombre, apellido, email } = req.body;
        try {
            res.send("Ingresar")
         } catch (err) {
             if (err instanceof Error) {
                 res.status(500).send(err.message);
             }
         }
    }

    async actualizar(req: Request, res: Response) {
        const {id} = req.params;
        try {
            res.send("Actualizar")
         } catch (err) {
             if (err instanceof Error) {
                 res.status(500).send(err.message);
             }
         }
    }

    async borrar(req: Request, res: Response) {
        const {id} = req.params;
        try {
            res.send("Borrar")
         } catch (err) {
             if (err instanceof Error) {
                 res.status(500).send(err.message);
             }
         }
    }


    async asociarEstudiante(req: Request, res: Response) {
        const {id} = req.params;
        try {
            res.send("Asociar estudiante")
         } catch (err) {
             if (err instanceof Error) {
                 res.status(500).send(err.message);
             }
         }
    }

}

export default new CursosController();