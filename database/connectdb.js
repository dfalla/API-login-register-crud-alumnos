import mongoose from "mongoose";
try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log('Conexión exitosa 💩');
} catch (error){
    console.log('Error al conectarse a MongoDB 😥')
}