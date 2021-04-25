const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

const PORT = 4000; //backend routing - different from the frontend react port 3000
app.listen(PORT, ()=>{
    console.log("listening on port 4000");
})

