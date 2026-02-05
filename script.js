const apiKey = "25957b5ea53dd9a14de638ede2d751f3";

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Please enter city name");
        return;
    }

    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(res => {
            console.log("STATUS:", res.status);
            if (res.status === 401) {
                throw new Error("Unauthorized - API key issue");
            }
            if (!res.ok) {
                throw new Error("City not found");
            }
            return res.json();
        })
        .then(data => {
            document.getElementById("city").innerText = data.name;
            document.getElementById("temp").innerText = `🌡 ${data.main.temp} °C`;
            document.getElementById("desc").innerText = data.weather[0].description;
            document.getElementById("humidity").innerText = `💧 ${data.main.humidity}%`;
            document.getElementById("wind").innerText = `🌬 ${data.wind.speed} m/s`;
            document.getElementById("icon").src =
              `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        })
        .catch(err => {
            console.error(err.message);
            alert(err.message);
        });
}
