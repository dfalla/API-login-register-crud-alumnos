import 'dotenv/config';
import './database/connectdb.js'; 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import authRouter from './routes/auth.route.js';


import alumnosRouter from './routes/alumno.route.js';
 
const app = express();

const whiteList = [process.env.ORIGIN1];

app.use(cors({
    origin: function (origin, callback){
        if(!origin || whiteList.includes(origin)){
            return callback(null, origin);
        }

        return callback(`Error de CORS origin: ${origin} no autorizado !`);
    }
}));

app.use(express.json());
app.use(cookieParser()); 

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/alumnos", alumnosRouter);

const PORT = process.env.PORT || 5000;
app.listen(5000, ()=>{
    console.log("servidor iniciado😈 http://localhost:5000");
});