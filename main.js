// activeMenu

// Debounce do Lodash
const debounce = function (func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

let targets = document.querySelectorAll("[data-active]");
let menus = document.querySelectorAll(".menu");
let className = "active-menu";
let containerTargets = document.querySelectorAll("[data-animate]");
let btnTop = document.querySelector("#btnUp");
let homeDiv = document.querySelector("#home");

function animationContainer() {
  containerTargets.forEach((target) => {
    let topTarget = target.getBoundingClientRect().top;
    if (topTarget < window.innerHeight / 1.1) {
      target.classList.add("animation");
    } else {
      target.classList.remove("animation");
    }
  });
}

function showButton() {
  let bottomDiv = homeDiv.getBoundingClientRect().bottom;
  let windowHeight = window.innerHeight;
  if (windowHeight - bottomDiv >= 360) {
    btnTop.classList.add("show-button");
  } else {
    btnTop.classList.remove("show-button");
  }
}

function activeMenu() {
  targets.forEach((target) => {
    let topTarget = target.getBoundingClientRect().top;
    if (topTarget < window.innerHeight / 2) {
      menus.forEach((menu) => {
        if (target.id == menu.dataset.menu) {
          menu.classList.add(className);
          menu.children[0].style.color = "var(--main-color)";
        } else {
          menu.classList.remove(className);
          menu.children[0].style.color = "";
        }
      });
    }
  });
}

activeMenu();
animationContainer();
showButton();

window.addEventListener(
  "scroll",
  debounce(() => {
    activeMenu();
    animationContainer();
    showButton();
  }, 100)
);

// changeButton
const buttons = document.querySelectorAll(".menuBtn");
const header = document.querySelector("#header");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    header.classList.toggle("active");
    menus.forEach(menu => {
      menu.addEventListener("click", () => {
        header.classList.remove("active")
        button.classList.remove("active");
      })
    })
  });
});

// darkMode
const toggleInput = document.querySelector("#dark-mode-toggle");
const body = document.querySelector("body");
const toggleMode = document.querySelector("#toggle-mode");
const labelToggle = document.querySelector("#labelToggle");
const mainPage = document.querySelector("#main");

function animationToggle() {
  toggleInput.addEventListener("input", () => {
    if (toggleInput.checked) {
      mainPage.classList.add("dark");
      body.classList.add("dark");
      body.classList.add("dark-mode");
      toggleMode.classList.add("turn-on");
      labelToggle.style.background = "#121212";
      labelToggle.children[0].style.color = "#495057";
      labelToggle.children[2].style.color = "#fff";
    } else {
      mainPage.classList.remove("dark");
      body.classList.remove("dark");
      body.classList.remove("dark-mode");
      toggleMode.classList.remove("turn-on");
      labelToggle.style.background = "";
      labelToggle.children[0].style.color = "";
      labelToggle.children[2].style.color = "";
    }
  });
}

animationToggle();

// nameAnimation
let description = document.querySelector("#description");
let descriptionArr = "Designer e Editora".split("");

function addDescription(array, element) {
  description.innerHTML = "";
  array.forEach((letter, index) => {
    setTimeout(() => {
      element.innerHTML += letter;
    }, 90 * index);
  });
}

addDescription(descriptionArr, description);

// progressBar
const habilitiesDiv = document.querySelector("#habilities");
let progressbarFilled = document.querySelectorAll(".filled");
let percentageFilled = document.querySelectorAll(".percentage-number");
let numberArr = [];
let filledDivs = [];

let observerHabilities = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) {
    animationProgressbar();
  }
});

observerHabilities.observe(habilitiesDiv);

progressbarFilled.forEach((filledDiv) => {
  filledDivs.push(filledDiv);
});

percentageFilled.forEach((percentage) => {
  numberArr.push(parseFloat(percentage.innerText));
});

function animationProgressbar() {
  for (let i = 0; i < numberArr.length; i++) {
    for (let j = 10; j < numberArr[i] + 1; j++) {
      filledDivs[i].style.width = j + "%";
    }
  }
}
