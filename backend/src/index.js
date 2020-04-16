const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const dbRoute = 'mongodb+srv://pedro-omni:tz3qoJQ2ErLDUy8U@cluster0-oszui.mongodb.net/todo?retryWrites=true&w=majority';

mongoose.connect(dbRoute, {
   useNewUrlParser: true, 
   useUnifiedTopology: true,
}).
catch(error => {
   console.log(error);
})

app.listen(8080);
app.use(express.json());
app.use(routes);