import axios from "axios";
import { body, validationResult, param } from "express-validator";

export const validationResultExpress = (req, res, next)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    next();
} 


export const bodyRegisterValidator = [
    body('nombre', 'ingrese un nombre válido')
        .trim()
        .notEmpty(),
    body('apellido', 'ingrese un apellido válido')
        .trim()
        .notEmpty(),
    body('email','Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Mínimo 8 caracteres')
        .trim()
        .isLength({min: 8}),
    body('password', 'Formato de password incorrecto')
        .custom((value, {req})=>{
            if(value !== req.body.repassword) {
                throw new Error('No coinciden las contraseñas')
            }

            return value;
        }),
    validationResultExpress,
];

export const bodyRegisterAlumnoValidator = [
    body("nombre", "Ingrese un nombre válido")
        .trim()
        .notEmpty(),
    body("apellido", "Ingrese un apellido válido")
        .trim()
        .notEmpty(),
    body("dni", "Formato link incorrecto")
        .trim()
        .notEmpty(),
    validationResultExpress,
]

export const bodyLoginValidator = [
    body('email','Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Password incorrecto')
        .trim()
        .isLength({min: 8}),
    
    validationResultExpress

];

export const bodyLinkValidator = [
    body("longLink", "Formato link incorrecto")
        .trim()
        .notEmpty()
        .custom(async (value) =>{
            try {

                if(!value.startsWith("https://")){
                    value = "https://" + value;
                }
                await axios.get(value);
                return value;
            } catch (error) {
                throw new Error("not found longKink 404");
            }
        }),
    validationResultExpress
];


export const paramValidator = [
    param("id", "Formato no válido")
        .trim()
        .notEmpty()
        .escape(),
        validationResultExpress
];




