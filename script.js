let images = document.querySelectorAll(".gallery img");
let lightbox = document.querySelector(" #lightbox");
let lightboxImg = document.querySelector(" #lightbox-img")
let lightboxButton = document.querySelector("#lightboxButton");

let currentIndex = 0;

// image click 

images.forEach(function(image , index){
    image.addEventListener("click", function(){
        currentIndex = index;
        lightboxImg .src = image.src;
        lightbox.style.display = "flex";

    });
});

// NEXT IMAGE

next.addEventListener("click", function(){
    currentIndex++;

    if(currentIndex >= image.length){
       currentIndex = 0;
    };

    lightbox.src =  images[currentIndex].src;
});

// PREVIOUS IMAGE 

next.addEventListener("click", function(){
    currentIndex--;

    if(currentIndex<=0){
        currentIndex = image.length-1;
    };
});

// CLOSE IMAGE

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

        lightbox.style.display = "none";

    }

});


