var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    multer = require('multer'),
    storage = require('@google-cloud/storage'),
    firebase = require('firebase');
    admin = require("firebase-admin");
    app = express();

admin.initializeApp({
    databaseURL:"https://ism-firebase-3cf58.firebaseio.com"
});
var firebaseConfig = {
    apiKey: "AIzaSyDMaA5m-BciLucpGL5Ypugqm8izHFb-KNQ",
    authDomain: "ism-firebase-3cf58.firebaseapp.com",
    databaseURL: "https://ism-firebase-3cf58.firebaseio.com",
    projectId: "ism-firebase-3cf58",
    storageBucket: "ism-firebase-3cf58.appspot.com",
    messagingSenderId: "776971619952",
    appId: "1:776971619952:web:c62f86f396ede7da79eeb5"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



// var db = admin.database();
// var ref = db.ref("ism_data");
// ref.on("value", function(snapshot) {
//     console.log('entered')
//     console.log(snapshot.val());
//   }, function (errorObject) {
//     console.log('entered here')

//     console.log("The read failed: " + errorObject.code);
//   });


app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "views")));



mongoose.connect('mongodb+srv://thesdtiwari:Saurabh100@cluster0.laykv.mongodb.net/ism-data?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true});

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

app.get('/',function(req,res){
    res.redirect('/index');  
});

app.get('/index',function(req,res){
    data.find({}, function(err, allCampgrounds){
        res.render("index", {params :allCampgrounds});
    })  
});

app.get('/index/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    
     data.find({}, function(err, allCampgrounds){
    
         firebase.database().ref('ism_data').once('value').then(function(snapshot){
        
            //console.log(snapshot.val())
            //console.log(allCampgrounds);
            dataFire = snapshot.val();
            //console.log(dataFire)
            res.render('all', {params :allCampgrounds , id : id,firebase:dataFire}); 
    
        }) 
         
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
    // if(state == "Maharashtra"){
    //     data.find({}, function(err, allCampgrounds){
    //         console.log('Entered mh');
    //         res.render("maharashtra", {params :allCampgrounds});
    //     });
    // }
    // if(branch == "Mathmatics and Computing"){
    //     data.find({}, function(err, allCampgrounds){
    //         console.log('MnC');
    //         res.render("mnc", {params :allCampgrounds});
    //     });
    // }

});


// firebase.database().ref('ism_data').once('value').then(function(snapshot){
//     console.log('firebase data')
//     console.log(snapshot.val())
// })

var port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on:`, port));


  