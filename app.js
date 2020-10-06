var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    multer = require('multer'),
    app = express();

app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "views")));

mongoose.connect('mongodb+srv://thesdtiwari:Saurabh100@cluster0.laykv.mongodb.net/ism-data?retryWrites=true&w=majority',{useNewUrlParser:true});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    }
});

var upload = multer({storage: storage}).single("image");

var dataSchema = mongoose.Schema({
    name : String,
    state : String,
    place : String,
    branch : String,
    club : String,
    intern : String,
    placed : String,
    year : String,
    image : String
});

var data = mongoose.model('ism_data',dataSchema);
  
data.find({},function(err,dats){
    console.log(dats);
})

app.get('/',function(req,res){
    res.redirect('/index');  
});

app.get('/index',function(req,res){
    data.find({}, function(err, allCampgrounds){
        res.render("index", {params :allCampgrounds});
    })  
});

app.get('/maharashtra',function(req,res){
    data.find({}, function(err, allCampgrounds){
        res.render("maharashtra", {params :allCampgrounds}); 
    });
})

app.get('/add',function(req,res){
    res.render("add");
})

app.post('/index', upload ,function(req,res){
    var name    = req.body.name,
        state   = req.body.state,
        place   = req.body.place,
        branch  = req.body.branch,
        year    = req.body.year ,
        intern  = req.body.intern,
        placed  = req.body.placed,
        image   = req.file.path;
    image = image.replace(/\\/g, "/");
    data.create({
        name : name,
        state : state,
        place : place,
        branch : branch,
        year : year,
        intern : intern,
        placed : placed,
        image : image
    });
    if(state == "Maharashtra"){
        data.find({}, function(err, allCampgrounds){
            console.log('Entered mh');
            res.render("maharashtra", {params :allCampgrounds});
        });
    }else{
        data.find({}, function(err, allCampgrounds){
            console.log('Entered up');

            res.render("index", {params :allCampgrounds});
        });
    }
});


app.listen(3000,  function(){
    console.log("SERVER IS RUNNING..");
});


  