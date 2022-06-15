var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#search-for-city");
var searchHistoryContainerEl = document.querySelector(
  "#search-history-container"
);
var rootUrl = "https://api.openweathermap.org";
var weatherApiKey = "05de828319fc1cf4cf97ed816ea2b0fc";
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

var updateSearchHistory = function (searchData) {
  var newSearchHistoryItem = {
    city: searchData.name,
    lat: searchData.lat,
    lon: searchData.lon, 
  };

  if (searchHistory === null) {
    searchHistory = [];
  }

  searchHistory.push(newSearchHistoryItem);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

};

var getCoordinatesByCityName = function (cityName) {

  var limit = 5;
  var lat = null;
  var lon = null;
  var geoUrl = `${rootUrl}/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${weatherApiKey}`;

  // make a request to the url
  fetch(geoUrl).then(function (response) {
    response.json().then(function (data) {
      
      console.log(data[0]); 
      lat = data[0].lat;
      lon = data[0].lon;
      getForecastData(lat, lon);
      updateSearchHistory(data[0]);
    });
  });
}; 

var formSubmitHandler = function (event) {
  event.preventDefault();
 
  var cityName = nameInputEl.value.trim();
  if (cityName) {
    getCoordinatesByCityName(cityName); 
    nameInputEl.value = ""; 
  } else {
    alert("Please enter a city"); 
  }
  console.log(event);
};

var displayRepos = function (repos) {
  console.log(repos);

  repoContainerEl.textContent = ""; 

  for (var i = 0; i < repos.length; i++) {
   

    var repoName = repos[i].owner.login + "/" + repos[i].name;
    var repoEl = document.createElement("div");                      
    repoEl.classList = "list-item flex-row justify-space-between align-center"; 

    var titleEl = document.createElement("span"); 
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl); 

    repoContainerEl.appendChild(repoEl);
};

userFormEl.addEventListener("submit", formSubmitHandler);

var pageLoad = function () {
  buildSearchHistoryItems();
};

pageLoad()};