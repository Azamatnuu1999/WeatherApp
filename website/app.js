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
        let date = new Date()
        date = date.toString().slice(0,24) + ` ${zip.value} city`
        let iD = await fetch('http://127.0.0.1:5050/getId');
        iD = await iD.json();
        postData('http://127.0.0.1:5050/postdata', [data,date,feelings.value, iD[0]]);
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

// Put all data to DOM from server.js
const rewriteAllData = async () =>{
  const request = await fetch('http://127.0.0.1:5050/getdata');
  try {
  // Transform into JSON
  const allData = await request.json()
  // Write updated data to DOM elements
  let div = document.getElementById('entryHolder');
  let length = allData.length;
  let temp = allData[length - 1]?.[0]?.main?.temp
  temp = (temp - 32) / 1.8
  div.innerHTML = ''
  allData.forEach((el,i,arr) => {
    div.innerHTML += `
    <div class="card">
    <h3>${Math.round(temp)}° degrees</h3>
    <p><b>Date:</b> ${arr[i][1]}</p>
    <p><b>Content:</b> ${innerHTML = arr[i][2] ? innerHTML = arr[i][2] : 'No content'}</p>
      <button onclick="deleteData(${arr[i][3]})">Delete</button>
    </div>
    `
  })
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// Delete data from server and DOM
async function deleteData(iD){
  let allData = await fetch('http://127.0.0.1:5050/getdata');
  try {
    let res = await allData.json()
    res = res.filter((el) => {
      return el[3] !== iD
    })
    const post = async ( url = '', data = {})=>{
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
    post('http://127.0.0.1:5050/post', res)
    rewriteAllData()
  } catch (error) {
    console.log(error)
  }
}

// making old data to document
body.onload = () => {
  rewriteAllData()
}
/* Function to GET Project Data */
const retrieveData = async () =>{ 
const request = await fetch('http://127.0.0.1:5050/getdata');
try {
// Transform into JSON
const allData = await request.json()
console.log(allData,'all')
// Write updated data to DOM elements
let length = allData.length;
let temp = allData[length - 1][0].main.temp
temp = (temp - 32) / 1.8
let div = document.getElementById('entryHolder');
div.innerHTML += `
  <div class="card">
    <h3>${Math.round(temp)}° degrees</h3>
    <p><b>Date:</b> ${allData[length - 1][1]}</p>
    <p><b>Content:</b> ${innerHTML = allData[length - 1][2] ? innerHTML = allData[length - 1][2] : 'No content'}</p>
    <button onclick="deleteData(${allData[length - 1][3]})">Delete</button>
  </div>
`
}
catch(error) {
  console.log("error", error);
  // appropriately handle the error
}
};