
var events = function(params) {
    document.querySelector('#batches').classList.add("d-none") ;
    document.querySelector('#events').classList.remove("d-none") ;
    document.querySelector('#event-active').classList.add('active');
    document.querySelector('#member-active').classList.remove('active');
};
var members = function(params) {
    document.querySelector('#batches').classList.remove("d-none") ;
    document.querySelector('#events').classList.add("d-none") ;
    document.querySelector('#event-active').classList.remove('active');
    document.querySelector('#member-active').classList.add('active');
};


document.querySelector('#members').addEventListener('click',function(){
    members();
    
});

document.querySelector('#events-Btn').addEventListener('click',function(){

    events();
    
});
document.querySelector('#button').addEventListener('click',function(){
    events();    
});


document.querySelector('#batch2021').addEventListener('click',function(){
    document.querySelector('#batch-2021-vis').classList.toggle("d-none") ;   
});
document.querySelector('#batch-2021-nav').addEventListener('click',function(){
    document.querySelector('#batch-2021-vis').classList.remove("d-none") ;
    members();
    
});
document.querySelector('#batch2022').addEventListener('click',function(){
    document.querySelector('#batch-2022-vis').classList.toggle("d-none") ;
    
});
document.querySelector('#batch-2022-nav').addEventListener('click',function(){
    document.querySelector('#batch-2022-vis').classList.remove("d-none") ;
    members();
    
});
document.querySelector('#batch2023').addEventListener('click',function(){
    document.querySelector('#batch-2023-vis').classList.toggle("d-none") ;
    
});
document.querySelector('#batch-2023-nav').addEventListener('click',function(){
    document.querySelector('#batch-2023-vis').classList.remove("d-none") ;
    members();
    
});
document.querySelector('#batch2024').addEventListener('click',function(){
    document.querySelector('#batch-2024-vis').classList.toggle("d-none") ;
    
});
document.querySelector('#batch-2024-nav').addEventListener('click',function(){
    document.querySelector('#batch-2024-vis').classList.remove("d-none") ;
    members();
});

document.querySelector('#freshers-2018-nav').addEventListener('click',function(){
    events();
});
document.querySelector('#holi-2019-nav').addEventListener('click',function(){
    events();
});
document.querySelector('#ganesh-chaturthi-2019-nav').addEventListener('click',function(){
    events();
});
document.querySelector('#freshers-2019-nav').addEventListener('click',function(){
    events();
});
document.querySelector('#holi-2020-nav').addEventListener('click',function(){
    events();
});
document.querySelector('#others-nav').addEventListener('click',function(){
    events();
});



var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}




