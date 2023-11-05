const express = require('express');
const app = express();
const bcrypt = require("bcrypt");

//middlewares
app.use(express.json());
//aceptamos datos simples o basicon de un form
app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server on port 3000');