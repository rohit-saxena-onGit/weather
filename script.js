

let temp = document.querySelector("#temp h1");
let wind = document.querySelector("#windspeed");
let moisture = document.querySelector("#humidity-air");
let sight = document.querySelector("#vision");
let pascal = document.querySelector("#compulsion");
let pres = document.querySelector("#barometer");
let air = document.querySelector("#air-standard");
let btn = document.querySelector("#btn");
let img = document.querySelector("#image");
let condition = document.querySelector("#cond p");


let input = document.querySelector("input");

if(input.value == ""){
    input.value="patna";
    setTime();
}



async function getInfo(){
    let city = input.value.trim();
    const url = `http://api.weatherapi.com/v1/current.json?key=b4e9215fbd07438a829123352251403&q=${city}&aqi=yes`;
    try{
        let res = await axios.get(url);
        let data = res.data.current;
        
        //extraction of information

        let temperature = data.temp_c;
        let windspeed = data.wind_kph;
        let humid = data.humidity;
        let visiblity = data.vis_km;
        let pressure = data.pressure_in;
        let force = data.pressure_mb;
        let air_qual = data.air_quality.co;
        let pic = data.condition.icon;
        let condd = data.condition.text;
        return {temperature,windspeed,humid,visiblity,pressure,force,air_qual,pic,condd};

    } catch(e){
        console.log("error",e);
        return "no image found";
    }
}

async function setTime(){

    let inp = await getInfo();
    temp.innerText = `${inp.temperature} ℃`;
    wind.innerText = `${inp.windspeed} kph`;
    moisture.innerText = `${inp.humid} %`;
    sight.innerText = `${inp.visiblity} km`;
    pascal.innerText = `${inp.pressure} in`;
    pres.innerText = `${inp.force} mb`;
    air.innerText = `${inp.air_qual}`;
    let logo = inp.pic;
    img.setAttribute('src', logo);
    condition.innerText = inp.condd;
}

btn.addEventListener("click", ()=>{
    setTime();
})