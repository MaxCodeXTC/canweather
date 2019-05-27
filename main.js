window.addEventListener('load', () => {
    let long;
    let lat;
    let timeZone = document.querySelector('.weather-city h3');
    let weathersummary = document.querySelector('.icon p');
    let weatherTemperature = document.querySelector('.temperature');
    let day = document.querySelector('.day h4')
    let date = document.querySelector('.date');


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/c0707cc5cc9b4b50898db755baf68948/${lat},${long}`;

            fetch(api)
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    const {summary, temperature, icon} = data.currently;
                    const timeZoneAPI = data.timezone;
                    const daily = data.daily.data;             

                    daily.forEach((data) => {
                        let icons = data.icon;
                    
                    });

                    // Set DOM Element from the API
                    timeZone.textContent = timeZoneAPI;
                    weathersummary.textContent = summary;
                    weatherTemperature.textContent = Math.floor(temperature);

                    // set Icon
                    setIcons(icon, document.querySelector('.icon1'));

                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "#F8EB54"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    
    let weekDay = ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let days = weekDay[today.getDay()];

    today = mm + '/' + dd + '/' + yyyy;
    
    day.textContent = days;
    date.textContent = today;
});

