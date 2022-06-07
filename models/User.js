import mongoose from "mongoose";
import bcryptjs from "bcryptjs";


const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido'],
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true},
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor complete una dirección de correo electrónico válida']
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.pre("save", async function(next){
    const user = this;

    if(!user.isModified("password")) return next();

    try{
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();

    }catch(error){
        console.log(error);
        throw new Error('Error al hashear la contraseña');
    }
});


userSchema.methods.comparePassword = async function(frontendPassword){
    return await bcryptjs.compare(frontendPassword, this.password); 
}

export const User = mongoose.model('User', userSchema);
 
