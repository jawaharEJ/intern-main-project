function login(){

    let username =
    document.getElementById("username").value;

    let password =
    document.getElementById("password").value;

    if(username === "" || password === ""){

        document.getElementById("message").innerHTML =
        "Please fill all fields";

    }

    else{

        document.getElementById("message").innerHTML =
        "Login Successful";

        setTimeout(()=>{
            window.location.href = "locations.html";
        },1500);

    }

}

const OPENWEATHER_API_KEY = "YOUR_API_KEY"; // Replace with your API key from https://openweathermap.org/api

async function getWeather(){

    const cityInput = document.getElementById("city");
    let city = cityInput.value.trim();

    if(city === ""){
        alert("Please enter city name");
        return;
    }

    const cityName = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

    // If user has provided a real API key, use OpenWeatherMap for accurate data.
    if(OPENWEATHER_API_KEY && OPENWEATHER_API_KEY !== "YOUR_API_KEY"){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        try{
            const response = await fetch(url);
            if(!response.ok){
                const err = await response.json().catch(()=>null);
                const msg = err && err.message ? err.message : response.statusText || 'Request failed';
                document.getElementById("result").innerHTML = `<h3>❌ ${msg}</h3>`;
                return;
            }
            const data = await response.json();
            document.getElementById("result").innerHTML = `
                <h2>📍 ${data.name}</h2>
                <p>🌡️ Temperature: ${Math.round(data.main.temp)}°C</p>
                <p>☁️ Weather: ${data.weather[0].description}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
            `;
        } catch(err){
            document.getElementById("result").innerHTML = `<h3>❌ Network Error</h3><p>${err.message}</p>`;
        }

        return;
    }

    // Fallback: mock data (useful when no API key available)
    try{
        const weatherData = {
            "Erode": { temp: 28, condition: "Sunny", humidity: 65 },
            "Salem": { temp: 26, condition: "Partly Cloudy", humidity: 70 },
            "Coimbatore": { temp: 24, condition: "Rainy", humidity: 85 },
            "Chennai": { temp: 32, condition: "Hot & Sunny", humidity: 60 },
            "Bangalore": { temp: 22, condition: "Cool", humidity: 55 },
            "Hyderabad": { temp: 30, condition: "Sunny", humidity: 62 }
        };

        const data = weatherData[cityName];

        if(!data){
            document.getElementById("result").innerHTML =
            "<h3>🔍 City Not Found</h3><p>Try: Erode, Salem, Coimbatore, Chennai, Bangalore, or Hyderabad</p>";
            return;
        }

        document.getElementById("result").innerHTML = `
            <h2>📍 ${cityName}</h2>
            <p>🌡️ Temperature: ${data.temp}°C</p>
            <p>☁️ Weather: ${data.condition}</p>
            <p>💧 Humidity: ${data.humidity}%</p>
        `;

    } catch(error){
        document.getElementById("result").innerHTML = `<h3>❌ Error Fetching Weather Data</h3><p>${error.message}</p>`;
    }

}
