
document.getElementById('states-btn').addEventListener('click',function(){
    document.querySelector('#branches').classList.add("d-none") ;
    document.querySelector('#clubs').classList.add("d-none") ;
    document.querySelector('#states').classList.remove("d-none") ;
});

document.getElementById('branches-btn').addEventListener('click',function(){
    document.querySelector('#branches').classList.remove("d-none") ;
    document.querySelector('#clubs').classList.add("d-none") ;
    document.querySelector('#states').classList.add("d-none") ;
});

document.getElementById('clubs-btn').addEventListener('click',function(){
    document.querySelector('#branches').classList.add("d-none") ;
    document.querySelector('#clubs').classList.remove("d-none") ;
    document.querySelector('#states').classList.add("d-none") ;
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
