import _ from 'lodash';
import './css/styles.scss';
import './assets/img/logo.svg';

const dateToday = new Date();
let dateYesterday = new Date(dateToday);
dateYesterday.setDate(dateYesterday.getDate() - 1);
let dateString = getDateString(dateToday);
let yesterdayDateString = getDateString(dateYesterday);

function getDateString(date) {
  const day = date.getDate();
  let month = date.getMonth() + 1;
  month = month.toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

//Retrieves data from the Alpha Vantage API and places it into the stockData element
function alphaVantage(equityName, tagId) {
  const showStock = document.getElementById(tagId);
  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${equityName}&apikey=JQ1LE8WZCWJRAMXL`)
    .then(response => {
      return response.json()
    })
    .then(data => {

      let stockData = data["Time Series (Daily)"][dateString]["1. open"];
      let yesterdayStockData = data["Time Series (Daily)"][yesterdayDateString]["1. open"];

      console.log(yesterdayStockData);

      showStock.insertAdjacentHTML("beforeend", stockData);

      if (stockData > yesterdayStockData) showStock.style.color = "green";
      else if (stockData < yesterdayStockData) showStock.style.color = "red";

    })
    .catch(err => {
      showStock.insertAdjacentHTML("beforeend", "Error");
      console.log(err);
    })
}

//Checks for the length of input fields
function checkInput(elementName) {
  if (document.getElementById(elementName).value.length < 1) {
    return `Error, ${elementName} does not meet the proper criteria.`;
  }
  else { return "" }
}

let submitButton = document.getElementById('submit')

submitButton.onclick = function (event) {
  let valid = true;
  let errorMessage = "";
  if (checkInput("firstName")) {
    errorMessage = errorMessage + "Your first name cannot be empty. \n";
  }
  if (checkInput("lastName")) {
    errorMessage = errorMessage + "Your last name cannot be empty. \n";
  }
  if (checkInput("email")) {
    errorMessage = errorMessage + "Your email cannot be empty. \n";
  }

  console.log(errorMessage);

  if (errorMessage) {
    alert(errorMessage);
    valid = false;
  }

  return valid;
};

submitButton.onsubmit = function (event) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () { };
  xhr.open('POST', 'http://www.dummyaddress.com');
  xhr.send()
}

alphaVantage("GOOGL", "googleStock");
alphaVantage("MSFT", "microsoftStock")
alphaVantage("BTCUSD", "bitcoinStock")