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

      quotes.docs.forEach((quote) => {
        // console log result
        //console.log(quote.dialog);
      });
      // let randomQuote = math.Random to get random number under some number.length
      // console.log(quote.docs[randomQuote].dialog)
      let rand = Math.random();
      let totalQuotes = quotes.docs.length;
      let randIndex = Math.floor(rand * totalQuotes);
      let randomQuote = quotes.docs[randIndex];
      console.log(randomQuote);
      console.log(randomQuote.dialog);
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
  fetchDrink();
}

function fetchDrink() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
// need to add event listeners on buttons to generate ${choice}
  fetch(
    "https://thecocktaildb.com/api/json/v1/1/filter.php?i=vodka",
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
      console.log(randomCocktail);
      console.log(randomCocktail.strDrink);
      console.log(randomCocktail.idDrink);

      //printDrink(randomDrinks);
      fetchRecipe(cocktailID);
    })
    .catch((error) => console.log("error", error));
}

// function clean(obj) {
//   for (var propName in obj) {
//     if (obj[propName] === null || obj[propName] === undefined) {
//       delete obj[propName];
//     }
//   }
//   return obj;
// }

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
      console.log(cocktailRecipe);
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
    console.log(cocktailRecipe);
  let drink = cocktailRecipe.drinks[0];
  let ingredients = Object.entries(drink).filter(function(item){
    if (item[0].includes("strIngredient")&&item[1]!=null){
      console.log(item);
      return item;
    }
  }).map(function(item){
    return item[1];
  }) 
  let measurements = Object.entries(drink).filter(function(item){
    if (item[0].includes("strMeasure")&&item[1]!=null){
      console.log(item);
      return item;
    }
  }).map(function(item){
    return item[1];
  }) 
  console.log(measurements);
  
  // let measure1 = cocktailRecipe.drinks[0].strMeasure1;
  let table = document.querySelector("#ingr-table");
  for(i = 0; i<ingredients.length; i++) {
  let row = document.createElement("tr");
  let cellIngredient = document.createElement("td");
  let cellMeasure = document.createElement("td");
  let ingredient1Text = document.createTextNode(ingredients[i]);
  let measure1Text = document.createTextNode(measurements[i]);
  cellIngredient.appendChild(ingredient1Text);
  cellMeasure.appendChild(measure1Text);
  row.appendChild(cellMeasure);
  row.appendChild(cellIngredient);
  table.appendChild(row);}
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

function fetchCharacter() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer H3KSd8P2pM3yWhl2QLXi");

  var requestOptions = {
    let charName = 
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`https://the-one-api.dev/v2/character?race=${charName}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      let character = JSON.parse(result);
      console.log(character);
    })
    .catch(error => console.log('error', error));

  //button click race
  //pick from random character in Race Array
}

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
function tryAgain() {
  window.location.reload();
}

// event listeners for each button
choiceButtons.forEach((btn) => btn.addEventListener("click", loadScreen));

init();
