// global variables
let intro = document.querySelector("#intro");
let loadingScreen = document.querySelector("#loading-screen");
let choiceButtons = document.querySelectorAll(".card");
let drinkPage = document.querySelector("#drink-page");
let ingredientList = [];
let measureList = [];

// try again button
document.getElementById("try-again").onclick = tryAgain;

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
      setTimeout(function () {
        loadingScreen.classList.add("is-hidden");
        drinkScreen();
      }, 1000);

      let quotes = JSON.parse(result);
      let rand = Math.random();
      let totalQuotes = quotes.docs.length;
      let randIndex = Math.floor(rand * totalQuotes);
      let randomQuote = quotes.docs[randIndex];
      printQuote(randomQuote);
    })

    .catch((error) => console.log("error", error));
}

function printQuote(randomQuote) {
  let quote = document.querySelector("#quote");
  quote.textContent = randomQuote.dialog;
}

// function to surface final screen (add hide to loading screen, remove hide from final screen)

function drinkScreen() {
  loadingScreen.classList.add("is-hidden");
  drinkPage.classList.remove("is-hidden");
}

function fetchDrink(e) {
  let choice = e.currentTarget.id;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  // need to add event listeners on buttons to generate ${choice}
  fetch(
    `https://thecocktaildb.com/api/json/v1/1/filter.php?i=${choice}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let cocktails = JSON.parse(result);

      cocktails.drinks.forEach((drink) => {
        // console log result
        //console.log(quote.dialog);
      });
      // let randomQuote = math.Random to get random number under some number.length
      // console.log(quote.docs[randomQuote].dialog)
      let rand = Math.random();
      let totalCocktail = cocktails.drinks.length;
      let randIndex = Math.floor(rand * totalCocktail);
      let randomCocktail = cocktails.drinks[randIndex];
      let cocktailID = randomCocktail.idDrink;
      // console.log(randomCocktail);
      // console.log(randomCocktail.strDrink);
      // console.log(randomCocktail.idDrink);

      //printDrink(randomDrinks);
      fetchRecipe(cocktailID);
    })
    .catch((error) => console.log("error", error));
}

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
      // console.log(cocktailRecipe);
      // clean(cocktailRecipe);
      // console.log(cocktailRecipe);
      incrementIngredients(cocktailRecipe);
      incrementMeasure(cocktailRecipe);
      printInstructions(cocktailRecipe);
      printRecipeTable(cocktailRecipe);
    })
    .catch((error) => console.log("error", error));
}

function printInstructions(cocktailRecipe) {
  let recipe = document.querySelector("#recipe");
  let drinkName = document.querySelector("#drink-name");
  recipe.textContent = cocktailRecipe.drinks[0].strInstructions;
  drinkName.textContent = cocktailRecipe.drinks[0].strDrink;
}

// function to create table using <tr> <td> <td>
// Come back to this function to print ingredients and measures to table because it doesn't work right now :(
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

  // let measure1 = cocktailRecipe.drinks[0].strMeasure1;
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

function incrementIngredients(cocktailRecipe) {
  for (let num = 1; num < 15; num++) {
    if (!cocktailRecipe.drinks[0]["strIngredient" + num]) {
      break;
    }
    ingredientList.push(cocktailRecipe.drinks[0]["strIngredient" + num]);
  }
  return ingredientList;
}

function incrementMeasure(cocktailRecipe) {
  for (let num = 1; num < 15; num++) {
    if (!cocktailRecipe.drinks[0]["strMeasure" + num]) {
      break;
    }
    measureList.push(cocktailRecipe.drinks[0]["strMeasure" + num]);
  }
  return measureList;
}

function fetchCharacter(e) {
  let charRace = e.path[2].childNodes[1].innerHTML;
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

function printCharName(randomChar) {
  let char = document.querySelector("#charName");
  let charInfo = document.querySelector("#charInfo");
  if (randomChar.name != null) {
    char.textContent = randomChar.name;
    charInfo.href = randomChar.wikiUrl;
  } else fetchCharacter(e);
}

// function to rate drink and save drink name and rating to localStorage

// function to reset
function tryAgain() {
  window.location.reload();
}

// event listeners for each button
choiceButtons.forEach((btn) => btn.addEventListener("click", loadScreen));
choiceButtons.forEach((btn) => btn.addEventListener("click", fetchDrink));
choiceButtons.forEach((btn) => btn.addEventListener("click", fetchCharacter));

init();
