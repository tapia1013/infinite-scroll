const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'hg-yYHdCEg2Vz18EuYq3ErE1c_5-BrQ7HcMMdQGOjhc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;




// Chec k if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  // console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // console.log('ready = ', ready);
  }
}





// Helper function to set Attr on DOM elements
function setAttributes(el, attr) {
  for (const key in attr) {
    el.setAttribute(key, attr[key])
  }
}



// Create Elements for Links and Photos and ADD to DOM
function displayPhotots() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // console.log('total images ', totalImages);

  // Run function for each object in property
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('targt', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })


    // Create image for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_decription);
    // img.setAttribute('title', photo.alt_decription);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });


    // Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded)


    // Put <img> inside <a>, then put both in image container element
    item.appendChild(img)
    imageContainer.appendChild(item);
  });
}






// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log(photosArray);

    displayPhotots();

  } catch (error) {
    console.error(error);
  }
}




// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos();
  }
})



// On Load
getPhotos();