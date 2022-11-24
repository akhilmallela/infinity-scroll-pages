const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
//  Unsplash API
let count = 10;
const apikey = "ObSshfRHGffM7Hng-NcmfquEx2mk27II34XRJAIuO6o";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    count = 30;
    loader.setAttribute('hidden',true);
    console.log("Inside image loaded"+imagesLoaded);
  }
}
// display photos
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target','_blank');
    setAttributes(item, { href: photo.links.html, target: "_blank" });
    const img = document.createElement("img");
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// get photos from api

async function getImages() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getImages();
  }
});

// on Load
getImages();