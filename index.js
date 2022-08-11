var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const body_parser = require('body-parser')
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.orignalname);
  },
})

const upload = multer({ destination: myStorage })
app.post('/api/fileanalyse', upload.single("upfile"), (req, res,) => {
  res.json({"name":req.file.originalname,
            "type":req.file.mimetype,
            "size":req.file.size});
  
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
