import _ from 'lodash';
import './css/styles.scss';
import './assets/img/logo.svg';

function alphaVantage(equityName, tagId) {
  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${equityName}&apikey=JQ1LE8WZCWJRAMXL`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      const showStock = document.getElementById(tagId);
      const dateToday = data["Meta Data"]["3. Last Refreshed"];
      showStock.innerHTML = data["Time Series (Daily)"][dateToday]["1. open"];
      //console.log(data["Time Series (Daily)"][formattedDate]["1. open"]);
      console.log(data);
    })
    .catch(err => {
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
    valid = false
  }
  if (checkInput("lastName")) {
    valid = false
  }
  if (checkInput("email")) {
    valid = false
  }
  if (checkInput("firstName")) {
    valid = false
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