import mongoose from "mongoose";

const {Schema, model} = mongoose;


const alumnosSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    apellido:{
        type: String,
        required: true,
        trim: true
    },
    dni:{
        type: String,
        required: true,
        trim: true
    }
});

export const Alumno = model('Alumno', alumnosSchema);