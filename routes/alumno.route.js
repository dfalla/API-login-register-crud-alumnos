import {Router} from 'express';
import { createAlumno, getAlumno, getAlumnos, removeAlumno, updateAlumno } from '../controllers/alumno.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { bodyRegisterAlumnoValidator, paramValidator } from '../middlewares/validatorManager.js';


const router = Router();

/*  GET     -> /api/v1/alumnos          all alumnos
    GET     -> /api/v1/alumnos/:id      un alumno
    POST    -> /api/v1/alumnos          create alumno
    PUT     -> /api/v1/alumnos/:id      update alumno
    DELETE  -> /api/v1/alumnos/:id      remove alumno*/
    
router.get("/", requireToken, getAlumnos);
router.get("/:id", requireToken, paramValidator, getAlumno);
router.post("/", requireToken, bodyRegisterAlumnoValidator, createAlumno);
router.put("/:id", requireToken, bodyRegisterAlumnoValidator, updateAlumno);
router.delete("/:id", requireToken, paramValidator, removeAlumno);



export default router;