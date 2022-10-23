const express = require('express');
const serveStatic = require("serve-static");
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
require('dotenv/config');

const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://test_user:test_pass@cluster0.mxosg.mongodb.net/empty_db?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=> console.log("MongoDB connected"))
.catch(error => console.log(error));
  
const userScheme = new Schema({
    name: String,
    age: Number});

const imageScheme = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
      data: Buffer,
      contentType: String
    }
});

const User = mongoose.model("User", userScheme);
const Image = mongoose.model("Image", imageScheme);

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage, limits: { fieldSize: 2 * 1024 * 1024 } });


app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('cors')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.set("view engine", "ejs");

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
app.get("/getUser/:id", async function(req, res){
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(200).json({
    user
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
app.put("/updateUser/:id", async function(req,res){
  const id = req.params.id;
  const name = req.body.name;
  const age = req.body.age;
  await User.findByIdAndUpdate(id, { name,age })
  res.status(200).json({
    "msg":"Змінено"
  })
})

app.get('/image2', async function(req, res) {
  const imgs = await Image.find({}).lean();
  res.status(200).json({
    imgs
  });
});

app.get("/getImage/:id", async function(req, res){
  const id = req.params.id;
  const img = await Image.findById(id).lean();
  res.status(200).json({
    img
  });
})
app.put("/updateImage/:id", async function(req,res){
  const id = req.params.id;
  const name = req.body.name;
  const desc = req.body.desc;
  await Image.findByIdAndUpdate(id, { name,desc })
  res.status(200).json({
    "msg":"Змінено"
  })
})

app.delete("/removeImage/:id", async function(req, res){
  const id = req.params.id;
  Image.findByIdAndDelete(id, function(err, doc){
    if(err) return console.log(err);
});
res.status(200).json({
  "msg":"Користувач видалений"
});
})

app.post('/upload', (req, res) => {
  
  const directory = `${__dirname}/uploads`;
  if (!fs.existsSync(directory)){
    fs.mkdirSync(directory);
}
  if (!req.files) {
      return res.status(500).send({
          msg: "file is not found"
      })
  }
  const myFile = req.files.file;

  myFile.mv(`${__dirname}/uploads/${myFile.name}`, function(err) {
      if (err) {
          console.log(err)
          return res.status(500).json({
              msg: "Error occured"
          });
      }
      fs.readdir(directory, (err, files) => {
          if (err) throw err;

          for (const file of files) {
              fs.unlink(path.join(directory, file), (err) => {
                  if (err) throw err;
              });
          }
      });
      var obj = {
          name: req.body.name,
          desc: req.body.desc,
          img: {
              data: fs.readFileSync(path.join(__dirname + '/uploads/' + myFile.name)),
              contentType: 'image/png'
          }
      }
      Image.create(obj, (err, item) => {
          if (err) {
              console.log(err);
          } else {

              res.status(201).json({
                  msg: "Image created"
              });
          }
      });
  });

})



app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });





const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`Production Express server running at localhost:${port}`);
  });