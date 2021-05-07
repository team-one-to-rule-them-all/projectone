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
    .then((result) => {
      let quotes = JSON.parse(result);

      quotes.docs.forEach((quote) => {
        // console log result
        //console.log(quote.dialog);
      });
      // let randomQuote = math.Random to get random number under some number.length
      // console.log(quote.docs[randomQuote].dialog)
      console.log(quotes.docs[15].dialog);
    })

    .catch((error) => console.log("error", error));
}

// function to surface final screen (add hide to loading screen, remove hide from final screen)

// function to fetch cocktail name and ID e.g. i=gin by character selection
// let race = elf
// if this.value="elf" or data-name then append "gin" i=${`value`}
// if this.value="orc" or data-name then append "vodka" i=${`value`}
// call fetch recipe function within the same then of the booze fetch

// function to surface above data

// function to fetch recipe using called ID from previous function

// function to surface above data

// function to rate drink and save drink name and rating to localStorage

// function to reset

// event listeners for each button
choiceButtons.forEach((btn) => btn.addEventListener("click", loadScreen));

init();
