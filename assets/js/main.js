// global variables
let intro = document.querySelector("#intro");
let loadingScreen = document.querySelector("#loading-screen");
let choiceButtons = document.querySelectorAll(".card");
let drinkPage = document.querySelector("#drink-page");
let historyPage = document.querySelector("#history-page");
let historyList = document.querySelector("#historyTable");
let viewHistory = document.querySelector("#view-history");
let toFinalPage = document.querySelector("#to-final-page");
let save = document.querySelector("#save-history");
let saved = document.querySelector("#saved");
let stars = document.querySelector("#stars");
let ingredientList = [];
let measureList = [];
let allHistory = JSON.parse(localStorage.getItem("history")) || [];
let ratingStars = [...document.getElementsByClassName("rating__star")];

// init function to load page and remove hide class from intro section
function init() {
  if (allHistory.length === 0) {
    viewHistory.classList.add("is-hidden");
  } else {
    viewHistory.classList.remove("is-hidden");
  }
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
      setTimeout(function () {
        loadingScreen.classList.add("is-hidden");
        drinkScreen();
      }, 3000);

      let quotes = JSON.parse(result);
      let rand = Math.random();
      let totalQuotes = quotes.docs.length;
      let randIndex = Math.floor(rand * totalQuotes);
      let randomQuote = quotes.docs[randIndex];
      printQuote(randomQuote);
    })

    .catch((error) => console.log("error", error));
}

// function to print quote to the screen
function printQuote(randomQuote) {
  let quote = document.querySelector("#quote");
  quote.textContent = randomQuote.dialog;
  quote.classList.add("fade-in");
}

// function to surface final screen (add hide to loading screen, remove hide from final screen)
function drinkScreen() {
  loadingScreen.classList.add("is-hidden");
  drinkPage.classList.remove("is-hidden");
}

// function for go back button from history screen
function backToDrinkScreen() {
  historyPage.classList.add("is-hidden");
  drinkPage.classList.remove("is-hidden");
}

// function to fetch drink from cocktail API
function fetchDrink(e) {
  let choice = e.currentTarget.id;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(
    `https://thecocktaildb.com/api/json/v1/1/filter.php?i=${choice}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let cocktails = JSON.parse(result);

      cocktails.drinks.forEach((drink) => {});
      let rand = Math.random();
      let totalCocktail = cocktails.drinks.length;
      let randIndex = Math.floor(rand * totalCocktail);
      let randomCocktail = cocktails.drinks[randIndex];
      let cocktailID = randomCocktail.idDrink;
      fetchRecipe(cocktailID);
    })
    .catch((error) => console.log("error", error));
}

// function to get recipe from cocktail API based on cocktail ID
function fetchRecipe(cocktailID) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailID}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let cocktailRecipe = JSON.parse(result);
      incrementIngredients(cocktailRecipe);
      incrementMeasure(cocktailRecipe);
      printInstructions(cocktailRecipe);
      printRecipeTable(cocktailRecipe);
    })
    .catch((error) => console.log("error", error));
}

// function to print drink instructions to screen
function printInstructions(cocktailRecipe) {
  let recipe = document.querySelector("#recipe");
  let drinkName = document.querySelector("#drink-name");
  let firstLine = cocktailRecipe.drinks[0];
  recipe.textContent = firstLine.strInstructions;
  drinkName.textContent = firstLine.strDrink;
  let drinkString = firstLine.strDrink;
  localStorage.setItem("drinkName", drinkString);
}

// function to create table using <tr> <td> <td>
function printRecipeTable(cocktailRecipe) {
  let drink = cocktailRecipe.drinks[0];
  let ingredients = Object.entries(drink)
    .filter(function (item) {
      if (item[0].includes("strIngredient") && item[1] != null) {
        return item;
      }
    })
    .map(function (item) {
      return item[1];
    });
  let measurements = Object.entries(drink)
    .filter(function (item) {
      if (item[0].includes("strMeasure") && item[1] != null) {
        return item;
      }
    })
    .map(function (item) {
      return item[1];
    });
  // create table
  let table = document.querySelector("#ingr-table");
  for (i = 0; i < ingredients.length; i++) {
    let row = document.createElement("tr");
    let cellIngredient = document.createElement("td");
    let cellMeasure = document.createElement("td");
    let ingredient1Text = document.createTextNode(ingredients[i]);
    let measure1Text = document.createTextNode(measurements[i]);
    cellIngredient.appendChild(ingredient1Text);
    cellMeasure.appendChild(measure1Text);
    row.appendChild(cellMeasure);
    row.appendChild(cellIngredient);
    table.appendChild(row);
  }
}

// function to loop through ingredient response
function incrementIngredients(cocktailRecipe) {
  for (let num = 1; num < 15; num++) {
    if (!cocktailRecipe.drinks[0]["strIngredient" + num]) {
      break;
    }
    ingredientList.push(cocktailRecipe.drinks[0]["strIngredient" + num]);
  }
  return ingredientList;
}

// function to loop through measurements response
function incrementMeasure(cocktailRecipe) {
  for (let num = 1; num < 15; num++) {
    if (!cocktailRecipe.drinks[0]["strMeasure" + num]) {
      break;
    }
    measureList.push(cocktailRecipe.drinks[0]["strMeasure" + num]);
  }
  return measureList;
}

// function to get character based on race selection
function fetchCharacter(e) {
  let charRace = e.path[1].childNodes[1].innerHTML;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer H3KSd8P2pM3yWhl2QLXi");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(`https://the-one-api.dev/v2/character?race=${charRace}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      let chars = JSON.parse(result);
      let rand = Math.random();
      let totalChars = chars.docs.length;
      let randIndex = Math.floor(rand * totalChars);
      let randomChar = chars.docs[randIndex];
      printCharName(randomChar);
    })
    .catch((error) => console.log("error", error));
}

// function to print character name to final page
function printCharName(randomChar) {
  let char = document.querySelector("#charName");
  let charInfo = document.querySelector("#charInfo");
  let cName = randomChar.name;
  if (cName != null) {
    char.textContent = cName;
    localStorage.setItem("randomChar", cName);
    charInfo.href = randomChar.wikiUrl;
  } else fetchCharacter(e);
}

// function for save history button
function saveHistory() {
  let star1 = document.querySelector("#star1");
  let star2 = document.querySelector("#star2");
  let star3 = document.querySelector("#star3");
  let star4 = document.querySelector("#star4");
  let star5 = document.querySelector("#star5");
  if (star5.classList.contains("fas")) {
    localStorage.setItem("rating", "🌟🌟🌟🌟🌟 🤤");
  } else if (star4.classList.contains("fas")) {
    localStorage.setItem("rating", "⭐⭐⭐⭐ 🙂");
  } else if (star3.classList.contains("fas")) {
    localStorage.setItem("rating", "⭐⭐⭐ 😐");
  } else if (star2.classList.contains("fas")) {
    localStorage.setItem("rating", "⭐⭐ 😕");
  } else if (star1.classList.contains("fas")) {
    localStorage.setItem("rating", "⭐ 🤢");
  } else {
    localStorage.setItem("rating", "unrated 🤔");
  }
  // saves rating to local storage
  // adds drink, companion, and rating to history array
  let drinkRecord = localStorage.getItem("drinkName");
  let companionRecord = localStorage.getItem("randomChar");
  let ratingRecord = localStorage.getItem("rating");
  let history = {
    drink: drinkRecord,
    companion: companionRecord,
    rating: ratingRecord,
  };
  allHistory.push(history);
  // convert the data in the array to a string so it will look nice on the screen
  localStorage.setItem("history", JSON.stringify(allHistory));
  save.classList.add("is-hidden");
  stars.classList.add("is-hidden");
  saved.classList.remove("is-hidden");
}

// function to rate drink and save drink name and rating to localStorage
function printHistory() {
  allHistory.map((history) => {
    let row = document.createElement("tr");
    let column1 = document.createElement("td");
    let column2 = document.createElement("td");
    let column3 = document.createElement("td");
    column1.innerHTML = history.drink;
    column2.innerHTML = history.companion;
    column3.innerHTML = history.rating;
    row.append(column1, column2, column3);
    historyList.appendChild(row);
  });
}

// function for drink rating
function rateDrink(stars) {
  let starClassActive = "rating__star fas fa-star";
  let starClassInactive = "rating__star far fa-star";
  let starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);
      if (star.className === starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}
rateDrink(ratingStars);

// function to reset
function tryAgain() {
  window.location.reload();
}

// function to go to history page from final page
function goToHistory() {
  drinkPage.classList.add("is-hidden");
  historyPage.classList.remove("is-hidden");
  toFinalPage.classList.remove("is-hidden");
  printHistory();
}

// function to go to history page from home page
function viewHistoryFromHome() {
  intro.classList.add("is-hidden");
  historyPage.classList.remove("is-hidden");
  printHistory();
}

// function to clear history
function clearHistory() {
  localStorage.removeItem("history");
  while (historyList.lastElementChild) {
    historyList.removeChild(historyList.lastElementChild);
  }
}

// event listeners for each button
choiceButtons.forEach((btn) => btn.addEventListener("click", loadScreen));
choiceButtons.forEach((btn) => btn.addEventListener("click", fetchDrink));
choiceButtons.forEach((btn) => btn.addEventListener("click", fetchCharacter));
// save score button
document.querySelector("#save-history").onclick = saveHistory;
// try again button
document.querySelector("#try-again").onclick = tryAgain;
// go back button
document.querySelector("#go-back").onclick = tryAgain;
// start over button
document.querySelector("#start-over").onclick = tryAgain;
// view history buttons
document.querySelector("#view-history").onclick = viewHistoryFromHome;
document.querySelector("#go-to-history").onclick = goToHistory;
// clear history button
document.querySelector("#clear-history").onclick = clearHistory;
// go back to final page
document.querySelector("#to-final-page").onclick = backToDrinkScreen;

init();
