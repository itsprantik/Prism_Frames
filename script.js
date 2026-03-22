// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){
  const windowHeight = window.innerHeight;

  reveals.forEach((el)=>{
    const elementTop = el.getBoundingClientRect().top;

    if(elementTop < windowHeight - 100){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// LIGHTBOX
const images = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

images.forEach(img=>{
  img.addEventListener("click",()=>{
    lightbox.style.display="flex";
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener("click",()=>{
  lightbox.style.display="none";
});


// PRIVACY POPUP


// WAIT until page loads
window.addEventListener("load", function(){

  const popup = document.getElementById("privacy-popup");
  const acceptBtn = document.getElementById("accept-btn");

  if(!popup || !acceptBtn) return;

  // check if already accepted
  if(localStorage.getItem("privacyAccepted")){
    popup.style.display = "none";
  }

  acceptBtn.addEventListener("click", function(){
    localStorage.setItem("privacyAccepted", "true");
    popup.style.display = "none";
  });

});
const acceptBtn = document.getElementById("accept-btn");

if(localStorage.getItem("privacyAccepted")){
  popup.style.display = "none";
  document.body.classList.add("loaded");
}

acceptBtn.addEventListener("click", () => {
  localStorage.setItem("privacyAccepted", "true");
  popup.style.display = "none";
});