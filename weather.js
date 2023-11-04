
let weatherapi = async (city) => {

    let api = await fetch(`http://api.weatherapi.com/v1/current.json?key=23d182faeb3844f593b161013230311&q=${city}&aqi=yes`)
    let apidata = await api.json()
    let arr = [];
    arr.push(apidata)
    
    if (api.ok) {
        return arr;
    }
    return null;
}
let getdata = async (city) => {

    let data = await weatherapi(city);
    if(data){
    let details = [{
        city: data[0].location.name, region: data[0].location.region, country: data[0].location.country,
        localtime: data[0].location.localtime, last_updated: data[0].current.last_updated, temp_c: data[0].current.temp_c,
        wind_mph: data[0].current.wind_mph, wind_kph: data[0].current.wind_kph, humidity: data[0].current.humidity,
        cloud: data[0].current.cloud
    }];

    return details;
}

    return null;

}


let btn = document.querySelector('button');
let input = document.querySelector('input');
let city = document.querySelector('#city')
let temp_c = document.querySelector('#temp_c')
let cloud = document.querySelector('#cloud')
let humidity = document.querySelector('#humidity')
let wind_kph = document.querySelector('#wind-kph')
let wind_mph = document.querySelector('#wind-mph')
let last_update = document.querySelector('#last_update')
let localtime = document.querySelector('#localtime')


btn.addEventListener('click', async () => {
    let value = input.value;
    let data = await getdata(value)
    if(data){
    localStorage.setItem('city', value)

    input.value = ''
    
    city.textContent = `${data[0].city}, ${data[0].region}, ${data[0].country}`;
    temp_c.innerHTML = `${data[0].temp_c}` + '<sup>o</sup>C';
    cloud.textContent = ` cloud : ${data[0].cloud}`;
    humidity.textContent = `Humidity : ${data[0].humidity}%  `;
    wind_kph.textContent = `wind-kph: ${data[0].wind_kph}`;
    wind_mph.textContent = `Wind Speed : ${data[0].wind_mph} mph`;
    last_update.textContent = `Last Update : ${data[0].last_updated}`;
    localtime.textContent = `Local Time : ${data[0].localtime}`;
}
else{
    
alert("enter valid city name")

}
})

async function autocall() {


    let past = localStorage.getItem('city');
    if (!past) {
        var data = await getdata('delhi')
    }
    else {
        var data = await getdata(past)
    }
    city.textContent = `${data[0].city}, ${data[0].region}, ${data[0].country}`;
    temp_c.innerHTML = `${data[0].temp_c}` + '<sup>o</sup>C';
    cloud.textContent = `cloud : ${data[0].cloud}`;
    humidity.textContent = `Humidity : ${data[0].humidity}%`;
    wind_kph.textContent = `wind-kph: ${data[0].wind_kph}`;
    wind_mph.textContent = `Wind Speed : ${data[0].wind_mph} mph`;
    last_update.textContent = `Last Update : ${data[0].last_updated}`;
    localtime.textContent = `Local Time : ${data[0].localtime}`;

}
autocall();