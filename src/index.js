const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


const app = express();


mongoose.connect('mongodb+srv://dbmongo:dbmongo@cluster0.padya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use(require('./routes'))


app.listen(8080)