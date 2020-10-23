alert('xhgb')
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

// Reference messages collection
var data = firebase.database().ref('ism_data');

// Listen for form submit
document.getElementById('form').addEventListener('submit', submitForm);
 
// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Variables daclaration
var name,place,state,branch,intern,placed,year,imgUrl;

document.getElementById('image').addEventListener("change", function(e) {
  e.preventDefault();
  var name = getInputVal('name');
  var place = getInputVal('place');
  var branch = getInputVal('branch');
  var  imageFile = e.target.files[0];
  let storageRef = firebase.storage().ref(name + '_'+place + '_'+branch);
  storageRef.put(imageFile).then(function(snapshot){
    storageRef.getDownloadURL().then(function(url){
      imgUrl = url;
      console.log(imgUrl + ' is the url');
    })
  });  
})  

// Variables initialization
function submitForm(e){
    e.preventDefault();
   name   = getInputVal('name');
   place = getInputVal('place');
   state = getInputVal('state');
   branch = getInputVal('branch');
   intern  = getInputVal('intern');
   placed = getInputVal('placed');
   year = getInputVal('year');
    

    var newData = data.push()
    
    newData.set({
      name: name,
      place:place,
      state:state,
      branch:branch,
      club:club,
      intern:intern,
      placed:placed,
      year:year,
      url : imgUrl
    });
  }

 

  //console.log(imgUrl + ' checking')
  
 


var storageRef = firebase.storage().ref();
var spaceRef = storageRef.child();
