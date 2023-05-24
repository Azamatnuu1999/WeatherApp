/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=5e374c13723e9ef19f39ab27569b9dee&units=imperial'

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
async function performAction(e) {
    const newData = document.getElementById('zip').value;
    if(zip.value) {
      let data = await getData(baseURL, newData, apiKey);
      if(data.cod !== '404') {
        postData('http://127.0.0.1:5050/postdata', data);
        retrieveData();
      }
    }
}

/* Function to GET Web API Data*/
const getData = async(baseURL, city, key) => {
  const res = await fetch(baseURL + city + key)
  try {
        const data = await res.json();
        return data;
      } catch(error) {
        console.log("error", error);
      }
}

/* Function to POST data */
// Async POST
const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});
  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};

/* Function to GET Project Data */
const retrieveData = async () =>{
  const request = await fetch('http://127.0.0.1:5050/getdata');
  try {
  // Transform into JSON
  const all = await request.json()
  let allData = all[all.length - 1]
  console.log(allData)
  let date = new Date()
  date = date.toString().slice(0,24)
  // Write updated data to DOM elements
  const fragment = document.createElement('div')
  fragment.classList.add('card')
  fragment.innerHTML = `${zip.value} city - ${Math.round(allData.main.temp)+ 'degrees'},<br> ${feelings.value}<br> ${innerHTML = date} <br>
  `
  let div = document.getElementById('entryHolder')
  div.appendChild(fragment)
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
 }