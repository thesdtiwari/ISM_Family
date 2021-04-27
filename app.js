    var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    multer = require('multer'),
    storage = require('@google-cloud/storage'),
    firebase = require('firebase'),
    admin = require("firebase-admin"),
    mysql = require('mysql'),
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

var connection = mysql.createConnection({
    host : 'https://databases-auth.000webhost.com/index.php',
    user : 'id16271993_sdtuser',
    password : '!L\>/Djd$f2m7No#',
    database : 'id16271993_sdt',
    port : ''
})





connection.connect(function(err){
    // console.log('err hone wala')
    // if (err) throw err;
    // console.log("Connected!");
    // var sql = "CREATE TABLE ism_data (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),place VARCHAR(255),state VARCHAR(255),branch VARCHAR(255),club VARCHAR(255),intern VARCHAR(255),placed VARCHAR(255),year VARCHAR(255),image VARCHAR(255), )";
    // connection.query(sql, function (err, result) {
    // if (err) throw err;
    // console.log("Table created");
});
//   connection.query("SELECT * FROM ism_data", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result[3]);
//   });



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

app.get('/index.ejs',function(req,res){
    data.find({}, function(err, allCampgrounds){
        res.render("index", {params :allCampgrounds});
    })  
});

app.get('/index/:id',function(req,res){
    var id = req.params.id;
    
    data.find({}, function(err, allCampgrounds){

        firebase.database().ref('ism_data').once('value').then(function(snapshot){
            dataFire = snapshot.val();
            connection.connect(function(error){
                connection.query("SELECT * FROM ism_data", function (err, result, fields) {
                  
                    res.render('all', {params : allCampgrounds , id : id, firebase : dataFire, sql : result}); 

                });
            })
        }) 
        
    });
})
     
app.get('/add',function(req,res){
    res.render("add");
})

app.get('/mnc',function(req,res){
    data.find({}, function(err, allCampgrounds){
        res.render("mnc", {params :allCampgrounds});
    });
})

app.get('/maharashtra',function(req,res){
    res.render("maharashtra");
})


app.post('/index', upload ,function(req,res){


    console.log('added')
    var name    = req.body.name,
        state   = req.body.state,
        place   = req.body.place,
        branch  = req.body.branch,
        club    = req.body.club,
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
        club : club,
        year : year,
        intern : intern,
        placed : placed,
        image : image
    });

    connection.connect(function(error){
        // var sql = "INSERT INTO ism_data (name , place , state ,branch, club ,intern ,placed ,year ,image ) VALUES ?";
        // value = [[name,place,state,branch,club,intern,placed,year,image]]
        // connection.query(sql, [value],function (err, result) {
        //   if (err) throw err;
        //   console.log("New record inserted");
        // });
    })
    // if(state == "Maharashtra"){
    //     data.find({}, function(err, allCampgrounds){
    //         console.log('Entered mh');
    //         res.render("maharashtra", {params :allCampgrounds});
    //     });
    // }
});


var port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on:`, port));


  