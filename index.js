import express from 'express';
//const express=require('express');
import morgan from 'morgan';
//const morgan=require('morgan');
import cors from 'cors';
//const cors=require('cors');
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';




//Conexión a la base de datos MongoDB
mongoose.Promise=global.Promise;
const dbUrl = 'mongodb+srv://alex_vargas:Alex8523$@cluster0-rrbtv.mongodb.net/innova';
//'mongodb://localhost:27017/innova';
mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser: true,  socketTimeoutMS: 2147483646})
.then(mongoose => console.log('Conectado a la BD en el puerto 27017'))
.catch(err => console.log(err));




const app=express();

app.set('port',process.env.PORT || 4000);
app.set('localhost', '0.0.0.0');

app.use(morgan('dev'));
app.use(cors());


app.use(express.json({limit: '50mb', extended: true}))
app.use(express.urlencoded({limit: '50mb', extended: false}))

app.use(express.static(path.join(__dirname,'public')))


app.use('/api',router);


app.listen(app.get('port'),()=>{
    console.log('server on port ' + app.get('port'));
});

