var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#search-for-city");
var searchHistoryContainerEl = document.querySelector(
  "#search-history-container"
);
var rootUrl = "https://api.openweathermap.org";
var weatherApiKey = "f106647a1a76ba0d309cf79f5bb351b7";
var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

var repoContainerEl = document.querySelector("#search-history-container"); 

var onSearchHistoryClick = function(event) {
  var indexId = event.target.id;  
  var result = searchHistory[indexId]; 
  if(result !== null) {
    getForecastData(result.lat, result.lon); 
  };
};


var getForecastData = function (lat, lon) {
  var forecastUrl = `${rootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;

  fetch(forecastUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      
    });
  });
};

var buildSearchHistoryItems = function () {
  console.log(searchHistoryContainerEl);
  
  if (searchHistory !== null) {
    for (var i = 0; i < searchHistory.length; i++) {
      var currentSearchHistoryItem = searchHistory[i];
      var buttonEl = document.createElement("button");
      buttonEl.setAttribute("id", i);
      buttonEl.setAttribute("class", "saved-search");
      buttonEl.innerHTML = currentSearchHistoryItem.city;
      buttonEl.addEventListener("click", onSearchHistoryClick);
      searchHistoryContainerEl.appendChild(buttonEl);
    }
  }
};

