function getWeather() {
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const apiKey = '797380b6f44db357544564eeaada0f80';
    const loadingSpinner = document.getElementById('loadingSpinner');

    
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }

    weatherInfo.innerHTML = '';

    const location = locationInput.value;

    if (!location) {
        alert('Please enter a location');
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiURL, true);

   
    setTimeout(() => {
      
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const response = JSON.parse(xhr.responseText);
                displayWeather(response);
            } else {
                console.error('Failed to fetch weather data');
            }
        };

        xhr.onerror = function () {
            console.error('Failed to connect to the server');
        };

        xhr.send();
    }, 2000);
}


function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');

    if (data.cod === '404') {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const description = data.weather[0].description;
        const temperature = data.main.temp;
        const city = data.name;

        weatherInfo.innerHTML = '';

        weatherInfo.innerHTML += `<p>Weather in ${city}: ${description}</p><p>Temperature: ${temperature}°C</p>`;
    }
}

