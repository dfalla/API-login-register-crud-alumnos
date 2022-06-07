import {User} from '../models/User.js';
import {generateRefreshToken, generateToken} from '../utils/tokenManager.js';


export const register = async (req, res) => {

    
    try{
        const { nombre, apellido ,email, password } = req.body;

        const user = new User({ nombre:nombre, apellido:apellido, email: email, password: password });
    
        await user.save();

        const {token, expiresIn} = generateToken(user.id);

        generateRefreshToken(user.id, res);

        return res.status(201).json({msg: "Usuario registrado correcatamente", token, expiresIn});

    }catch(error){
        console.log(error);
        
        if(error.code === 11000) return res.status(400).json({error : "Ya existe este usuario"});
    }
    
};

export const login = async (req, res)=>{
    
    try {
        const {email, password} = req.body;
        
        let user = await User.findOne({email});
        
        if(!user){
            return res.status(403).json({error: "Credenciales incorrectas"});
        } 
        
        const respuestaPassword = await user.comparePassword(password);
      
        if(!respuestaPassword){
            return res.status(403).json({error: "Credenciales incorrectas"});
        }

        const {token, expiresIn} = generateToken(user.id);

        generateRefreshToken(user.id, res);

        return res.json({ msg: "Usuario logueado correctamente", token, expiresIn }); /*DEVOLVEMOS MSG, TOKEN Y EXPIRACIÓN  */

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error del servidor"});
    }
};

export const infoUser = async(req, res)=>{
    
    try {
        const user = await User.findById(req.uid).lean();
        
        return res.json({email: user.email});
    } catch (error) {
        return res.status(500).json({error : "error de servidor"});
    }
}


export const refreshToken = (req, res) => {
    try {
        
        const { token, expiresIn} = generateToken(req.uid); 
        return res.json({token, expiresIn});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error : "error de servidor"});
    }
}

export const logout = (req, res)=>{
    res.clearCookie("refreshToken");
    res.json({mensaje: "sesión cerrada"});
};


