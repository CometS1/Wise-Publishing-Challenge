import _ from 'lodash';
import './css/styles.scss';
import './assets/img/logo.svg';

function alphaVantage(equityName, tagId) {
  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${equityName}&apikey=JQ1LE8WZCWJRAMXL`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      // Work with JSON data here
      const showStock = document.getElementById(tagId);
      const dateToday = Date.now();
      const year = dateToday.getFullYear();
      const day = dateToday.getDate();
      const month = dateToday.getMonth();
      const formattedDate = `${year}-${month}-${day}`;
      showStock.innerHTML = data["Time Series (Daily)"][formattedDate]["1. open"];
      //console.log(data["Time Series (Daily)"][formattedDate]["1. open"]);
      console.log(dateToday);
    })
    .catch(err => {
      console.log(err);
    })
}



function validateForm(event){
  let valid = false;
  if (!valid) {
    console.log("test");
    event.preventDefault();
  }
}

const submitButton = document.getElementById('submit');
submitButton.addEventListener('submit', validateForm);

alphaVantage("GOOGL", "googleStock");
alphaVantage("MSFT", "microsoftStock")
alphaVantage("BTCUSD", "bitcoinStock")