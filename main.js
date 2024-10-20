// toggle
document.querySelector(".toggle").onclick = function () {
  document.querySelector(".toggle i").classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

//switch color
let mainColorsStorage = localStorage.getItem("color_option");
if (mainColorsStorage !== null) {
  document.documentElement.style.setProperty("--main-color", mainColorsStorage);
  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === mainColorsStorage) {
      el.classList.add("active");
    }
  });
}
document.querySelectorAll(".colors-list li").forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActiveState(e);
  });
});

// switch background
document.querySelectorAll(".random-background span").forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActiveState(e);
    if (e.target.dataset.background == "yes") {
      backgroundOption = true;
      localStorage.setItem("background_option", true);
      randomizeImgs();
    } else {
      backgroundOption = false;
      localStorage.setItem("background_option", false);
      clearInterval(backgroundInterval);
    }
  });
});
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    backgroundOption = false;
    clearInterval(backgroundInterval);
    document.querySelector(".random-background .no").classList.add("active");
  }
}

// Random Background -> imgs Array
let ladingPage = document.querySelector(".landing-page");
let imgsArray = [
  "./imgs/1.jpg",
  "./imgs/2.jpg",
  "./imgs/3.jpg",
  "./imgs/4.jpg",
  "./imgs/5.jpg",
];
var backgroundOption;
var backgroundInterval;
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      ladingPage.style.backgroundImage = `url(${imgsArray[randomNumber]}`;
    }, 6000);
  }
}
randomizeImgs();

// Our skills
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  if (
    window.pageYOffset >
    ourSkills.offsetTop + ourSkills.offsetHeight - window.innerHeight
  ) {
    let allSkills = document.querySelectorAll(".skill-progress span");
    allSkills.forEach(function (skill) {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Our Gallery
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    let closeButton = document.createElement("span");
    closeButton.innerHTML = "x";
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

// close Gallery img
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Scroll Bullets and links header
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".header-area a");
function scrollLinks(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
scrollLinks(allBullets);
scrollLinks(allLinks);

// Handel Active State
function handleActiveState(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// Bullets
const bulletsSpan = document.querySelectorAll(".bullets-option span");
const bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
    if (bulletLocalItem === "block") {
      bulletsContainer.style.display = "block";
      document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
      bulletsContainer.style.display = "none";
      document.querySelector(".bullets-option .no").classList.add("active");
    }
  });
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handleActiveState(e);
  });
});

// Reset Buttons
document.querySelector(".reset-option").addEventListener("click", (e) => {
  localStorage.removeItem("bullets-option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");
  window.location.reload();
});