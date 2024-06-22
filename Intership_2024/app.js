document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    const apiKey = '5a962a6418d6602302d6e39f3712b8ce';  // Your actual OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            console.log('Response Status:', response.status); // Log the response status
            return response.json();
        })
        .then(data => {
            console.log('Data:', data); // Log the data for debugging
            const weatherResult = document.getElementById('weather-result');
            if (data.cod === 200) {
                const weatherIcon = getWeatherIcon(data.weather[0].icon);
                const weatherInfo = `
                    <h2 class="text-xl font-semibold">${data.name}</h2>
                    <i class="weather-icon ${weatherIcon}"></i>
                    <p class="text-lg">Temperature: ${data.main.temp} °C</p>
                    <p class="text-lg">Weather: ${data.weather[0].description}</p>
                `;
                weatherResult.innerHTML = weatherInfo;
            } else {
                weatherResult.innerHTML = `<p class="text-red-500">City not found!</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error); // Log the error for debugging
            document.getElementById('weather-result').innerHTML = `<p class="text-red-500">Failed to fetch weather data. Please try again.</p>`;
        });
});

function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'fas fa-sun',
        '01n': 'fas fa-moon',
        '02d': 'fas fa-cloud-sun',
        '02n': 'fas fa-cloud-moon',
        '03d': 'fas fa-cloud',
        '03n': 'fas fa-cloud',
        '04d': 'fas fa-cloud-meatball',
        '04n': 'fas fa-cloud-meatball',
        '09d': 'fas fa-cloud-showers-heavy',
        '09n': 'fas fa-cloud-showers-heavy',
        '10d': 'fas fa-cloud-sun-rain',
        '10n': 'fas fa-cloud-moon-rain',
        '11d': 'fas fa-bolt',
        '11n': 'fas fa-bolt',
        '13d': 'fas fa-snowflake',
        '13n': 'fas fa-snowflake',
        '50d': 'fas fa-smog',
        '50n': 'fas fa-smog'
    };
    return iconMap[iconCode] || 'fas fa-question';
}
