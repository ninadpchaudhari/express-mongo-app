const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const FormDataModel = require('./models/formData');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3008;

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/formDataDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer'); // Import multer
const upload = multer({ dest: 'uploads/' });
app.use(express.static('public'));
app.set('view engine', 'ejs');

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// Serve the form to the user
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle form submissions
app.post('/submit', upload.none(), async (req, res) => {
    // Use upload.single('file') if expecting a single file,
    // where 'file' is the name of your file input field
    // Use upload.array('files', maxCount) for multiple files
    
    const formData = new FormDataModel({
      data: req.body, // req.body will contain the text fields
    });
    
    console.log(req.body);
    await formData.save();
    res.send('Data has been submitted to the database');
  });
// Display submitted data
app.get('/data', async (req, res) => {
    const allData = await FormDataModel.find({});
    res.render('data', { allData }); // Use the data.ejs view and pass allData
});
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
