import _ from 'lodash';
import './css/styles.scss';
import './assets/img/logo.svg';

function getDateString(date) {
  const day = date.getDate();
  let month = date.getMonth() + 1;
  month = month.toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

const dateToday = new Date();
let dateYesterday = new Date(dateToday);
dateYesterday.setDate(dateYesterday.getDate() - 1);
let dateString = getDateString(dateToday);
let yesterdayDateString = getDateString(dateYesterday);

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

function checkInput(elementName) {
  if (document.getElementById(elementName).value.length < 1) {
    return true;
  }
  else { return false }
}

let submitButton = document.getElementById('submit')
submitButton.onclick = function (event) {
  let valid = true;
  if (checkInput("firstName")) {
    valid = false;
  }
  if (checkInput("lastName")) {
    valid = false;
  }
  if (checkInput("email")) {
    valid = false;
  }
  if (checkInput("firstName")) {
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