const api = {
  key: "f905983e37bd4154b4d48255b9c2600e",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric"
}

let weather = {

  fetchWeather: function (city) {
    fetch(
      `${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)

      .then((response) => {
        if (!response.ok) {
          alert("Clima não encontrado.");
          throw new Error("Clima não encontrado.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Clima em " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.trunc(temp) + "°C";
    document.querySelector(".humidity").innerText =
      "Umidade: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Vento: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });


weather.fetchWeather("São Leopoldo");