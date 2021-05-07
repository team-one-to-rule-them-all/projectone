// global variables
let intro = document.querySelector("#intro");
let loadingScreen = document.querySelector("#loading-screen");
let choiceButtons = document.querySelectorAll(".card");

// init function to load page and remove hide class from intro section
function init() {
  intro.classList.remove("is-hidden");
}

// function to surface loading screen (setInterval 3s, add hide to intro, remove hide from loading screen)
function loadScreen() {
  intro.classList.add("is-hidden");
  loadingScreen.classList.remove("is-hidden");
  fetchQuote();
}

// // function to fetch LOTR quote
function fetchQuote() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer H3KSd8P2pM3yWhl2QLXi");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch("https://the-one-api.dev/v2/quote", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// function to surface final screen (add hide to loading screen, remove hide from final screen)

// function to fetch cocktail name and ID e.g. i=gin by character selection

// function to surface above data

// function to fetch recipe using called ID from previous function

// function to surface above data

// function to reset

// event listeners for each button
choiceButtons.forEach((btn) => btn.addEventListener("click", loadScreen));

init();
