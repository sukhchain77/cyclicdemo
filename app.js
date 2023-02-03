const express = require('express');
const cors = require('cors');
const ConnectDatabase = require('./Configs/db');
const router = require('./Routes/router');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', router);
app.listen(5000,()=>{
    ConnectDatabase().then(console.log('database connected')).catch(err=>{console.log(err.message)});
    console.log('server connected to 5000 port')
})