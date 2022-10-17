const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');

const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
  
const userScheme = new Schema({
    name: String,
    age: Number});

mongoose.connect("mongodb+srv://test_user:test_pass@cluster0.mxosg.mongodb.net/empty_db?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=> console.log("MongoDB connected"))
.catch(error => console.log(error));
const User = mongoose.model("User", userScheme);




app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('cors')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/addUser", function(req, res){
  const user  = new User({
    name: req.body.name,
    age: req.body.age
  });
  user.save(function(err){
    if(err) return console.log(err);
  });
  res.status(201).json(user);
});
app.get("/getUsers", async function(req, res){
  const users = await User.find({});
  res.status(200).json({
    users
  });
})
app.delete("/removeUser/:id", async function(req, res){
  const id = req.params.id;
  User.findByIdAndDelete(id, function(err, doc){
    if(err) return console.log(err);
});
res.status(200).json({
  "msg":"Користувач видалений"
});
})






app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });





const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`Production Express server running at localhost:${port}`);
  });