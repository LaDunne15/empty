const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');

const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
  
const userScheme = new Schema({
    name: String,
    age: Number
});

mongoose.connect("mongodb+srv://test_user:test_pass@cluster0.mxosg.mongodb.net/empty_db?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=> console.log("MongoDB connected"))
.catch(error => console.log(error));
const User = mongoose.model("User", userScheme);




app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('cors')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/ora", function(request, response){
  // отправляем ответ
  response.send("<h2>Привет Express!</h2>");
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });





const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`Production Express server running at localhost:${port}`);
  });