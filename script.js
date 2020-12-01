// 
// api key
const appId = '9ecad6552d0a1f281a5c69633f0d9505';
const units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm){
  if(typeof searchTerm === 'number'){
      searchMethod = 'zip';
    }else{
      searchMethod = 'q';
  }
}

function searchWeather(searchTerm){
  getSearchMethod(searchTerm);
  // fetch function goes out to the API and returns a json
  fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
  //convert http response into a json that we can work with
  return result.json();
  }).then(result => {
    init(result);
  })
}

function init(resultFromServer){
  console.log(resultFromServer);
  if(resultFromServer.weather[0].main === 'Clouds'){
    document.body.style.backgroundImage = 'url("https://wallpaperplay.com/walls/full/0/0/c/180436.jpg")'
  }else if(resultFromServer.weather[0].main === 'Rain'){
    document.body.style.backgroundImage = 'url("https://i.pinimg.com/originals/56/ea/a5/56eaa5eeb54e9d2fa1aec2ed80bb13b3.jpg")'
  }else if(resultFromServer.weather[0].main === 'Drizzle'){
    document.body.style.backgroundImage = 'url("https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-024.jpg")'
  }else if(resultFromServer.weather[0].main === 'Mist'){
    document.body.style.backgroundImage = 'url("https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/rSpYilaDliykdxju6/videoblocks-loopable-clip-of-a-low-mist-swirling-against-a-black-background_hlumzhlql_thumbnail-full01.png")'
  }else if(resultFromServer.weather[0].main === 'Thunderstorm'){
    document.body.style.backgroundImage = 'url("https://wallpaperplay.com/walls/full/1/4/0/291459.jpg")'
  }else if(resultFromServer.weather[0].main === 'Snow'){
    document.body.style.backgroundImage = 'url("https://www.punmiris.com/himg/o.48493.jpg")'
  }else{
    document.body.style.backgroundImage = 'url("https://torange.biz/photofx/1/10/mirror-macro-blurring-top-bottom-sky-clear-1049.jpg")'
  }

  // get elements from HTML
  const weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  const temperatureElement = document.getElementById('temperature');
  const humidityElement = document.getElementById('humidity');
  const windSpeedElement = document.getElementById('windSpeed');
  const cityHeader = document.getElementById('cityHeader');
  const weatherIcon = document.getElementById('documentImg');

  // icon
  weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

  // description
  const resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  // temperature
  temperature.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
  windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
}

document.getElementById('searchBtn').addEventListener('click', () => {
  const searchTerm = document.getElementById('searchInput').value;
  if(searchTerm){
    searchWeather(searchTerm);
  }
})